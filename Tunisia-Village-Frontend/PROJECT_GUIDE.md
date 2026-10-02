# Tunisia Village Frontend — AI Contributor Guide

This guide describes the repository as it exists today. It is intended to help a new developer or AI agent find the right code, follow the project's conventions, and distinguish working features from UI scaffolding. When this guide and the code disagree, verify the code and update this document as part of the change.

## Project at a glance

- Private Next.js frontend package: `manasa-client` version `0.1.0`.
- Next.js App Router, React 19, TypeScript, Tailwind CSS 3, TanStack Query 5, Zustand 5, Axios, and `next-themes`.
- Arabic-first interface: the root document uses `lang="ar"` and `dir="rtl"`; IBM Plex Sans Arabic is loaded with `next/font`.
- The product has a public visitor site, authentication and account flows, and a service-provider dashboard.
- The frontend calls an external API. There is no `src/app/api` implementation in this repository.
- The package currently defines `dev`, `build`, `start`, and `lint` scripts. It does not define a test script or include a configured unit/e2e test runner.

## Getting started

Requirements: Node.js compatible with the installed Next.js version and npm (the repository includes `package-lock.json`).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Useful package commands:

```bash
npm run lint
npm run build
npm run start
```

`start` serves a prior production build. Configure local environment variables in an ignored `.env.local` file; never commit credentials. The code reads:

- `NEXT_PUBLIC_API_URL` — API base URL; falls back to `http://localhost:8000`.
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` — Google OAuth client ID; falls back to a literal client ID in `LoginForm.tsx` if unset.

The Google login form currently hardcodes the callback URI to `http://localhost:3000/auth/google/callback`. This needs environment-specific configuration before using a non-local deployment. No `.env.example` is currently present.

## Repository map

```text
.
|-- public/                         Static images, icons, and other public assets
|-- src/
|   |-- app/                        Next.js App Router route files and layouts
|   |   |-- (root)/                 Public site route group
|   |   |-- (auth)/                 Login/register/password routes (URL group omitted)
|   |   |-- (dashboard)/            Dashboard route group and layouts
|   |   `-- auth/google/callback/   Google OAuth callback route
|   |-- components/                 Some legacy/alternate UI, including auth login
|   |-- config/                     Brand, theme, color, typography tokens
|   |-- layout/                     Public-site page sections and navigation/footer
|   |-- modules/                    Domain and feature-oriented React modules
|   |   |-- auth/                   Auth UI, hooks, services, store, types, config
|   |   |-- dashboard/serviceProvider/
|   |   |                             Provider dashboard shell, pages, route maps
|   |   |-- Accommodation/          Visitor accommodation browsing
|   |   |-- AboutUs/, ContactUs/, FAQ/, Hero*, Navbar, RoadMap, Slider, etc.
|   |   `-- User/                    Current-user service, API config, types
|   |-- providers/                  Root theme and React Query providers
|   |-- shared/
|   |   |-- api/                    Axios client and environment config
|   |   |-- components/             Reusable UI, icons, buttons, inputs, wrappers
|   |   |-- lib/                    Query client, utility functions/constants
|   |   `-- types/                  Shared API types
|   `-- styles/                     Theme variables, typography, animation styles
|-- DESIGN_SYSTEM.md                Existing design-system notes (some claims are aspirational)
|-- PROJECT_GUIDE.md                This contributor and architecture guide
|-- middleware.ts                  Cookie-presence route gate
|-- tailwind.config.js             Tailwind theme mappings and plugins
|-- next.config.ts                 Next.js config
|-- package.json                   Scripts and dependencies
`-- tsconfig.json                  TypeScript settings and `@/*` alias
```

### App Router paths

Route groups in parentheses do not appear in URLs. Current route files include:

- Public: `/`, `/about`, `/contact-us`, `/profile` and legacy auth pages under `/auth/*`.
- Auth group: `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-otp`.
- Google callback: `/auth/google/callback`.
- Dashboard shell and pages: `/dashboard`, plus nested dashboard routes for overview, activities, hotels, reservations, products, availability, performance, reviews, financials, and profile settings.

The concrete dashboard route files currently cover `/dashboard/overview`, `/dashboard/activities`, `/dashboard/hotels/all`, `/dashboard/hotels/new`, `/dashboard/reservations/all`, `/dashboard/reservations/requests`, `/dashboard/products/*`, `/dashboard/availability/dates`, `/dashboard/performance/analytics`, `/dashboard/reviews/ratings`, `/dashboard/financials/payouts`, and `/dashboard/profile/settings`. Product route slugs are listed by the page files in `src/app/(dashboard)/dashboard/products/`; the dynamic `[tab]/[subtab]` route is also available as a resolver path.

There are duplicate/legacy auth entry points: for example, both `src/app/(auth)/login/page.tsx` (URL `/login`) and `src/app/(root)/auth/login/page.tsx` (URL `/auth/login`) exist. Check which one the active navigation should use before editing auth routing. The middleware redirects protected visitors to `/login`.

## Architecture and request flow

### Rendering and providers

`src/app/layout.tsx` is the root layout. It sets Arabic/RTL document defaults, imports global CSS, loads IBM Plex Sans Arabic, and wraps all routes in `ThemeProvider` and `QueryProvider`.

Route-group layouts add shells:

- `(root)/layout.tsx` wraps public pages with the public `NavBar` and `Footer`.
- `(dashboard)/layout.tsx` wraps dashboard pages in `DashboardLayoutWrapper`, which renders the provider dashboard navbar, sidebar, and content surface.
- `(auth)` currently has no shared layout; each auth route provides its own page composition.

The query provider uses the singleton in `src/shared/lib/react-query/query-client.ts`: query retry is `1` and stale time is `60,000 ms` by default.

### Data flow

The typical API-backed flow is:

1. A page in `src/app` renders a feature component from `src/modules`.
2. A client component calls a feature hook (often a TanStack Query mutation).
3. The hook calls a service in the same feature module.
4. The service calls `apiClient` from `src/shared/api/api-client.ts`.
5. `apiClient` uses `NEXT_PUBLIC_API_URL`, sends credentials (`withCredentials: true`), and retries one failed request after a `401` by calling `/auth/refresh-token`.

Keep backend request/response types near the feature service or in its `types/` folder. Shared API transport and cross-feature utilities belong under `src/shared`.

### Dashboard route composition

`src/modules/dashboard/serviceProvider/config/navigation.config.ts` is the dashboard navigation source of truth. It groups dashboard tabs, sections, paths, labels, and page components. Feature component maps under `config/maps/` lazy-load the screens. `src/modules/dashboard/serviceProvider/utils/navigation.utils.ts` validates dynamic `[tab]` and `[subtab]` route segments and resolves a component. Update navigation config, the component map, and/or the route page together when adding a dashboard screen.

Dashboard areas represented in navigation:

- Dashboard overview and activity feed.
- Hotel management.
- Reservation operations.
- Product creation: basics, content, schedules/prices, booking and tickets, completion.
- Availability calendar.
- Performance analytics.
- Customer ratings and reviews.
- Financial payouts.
- Profile settings.

Some screens are complete interactive client-side forms, while several destinations are explicit placeholder content. Confirm that a destination is implemented before treating its menu presence as proof of backend integration.

The product creation flow is divided into these feature folders:

- `products/basics/`: language/title, classification, product attributes, images.
- `products/content/`: meeting/pickup, tour details, language, inclusions/exclusions, uniqueness, traveler information.
- `products/timingtables-prices/`: traveler data and pricing schedules.
- `products/tickets/`: booking process, cancellation policy, traveler requirements, ticket builder/refund, preview.
- `products/finishing/`: demo offer, lodge linking (marked coming soon), and submit for review.

Product pages currently collect much of their state locally in React components. No dashboard product API service was found during this documentation pass, so do not assume these screens persist a product to the backend.

## Feature and module inventory

### Public-facing modules

- `Accommodation`: accommodation listing/cards and filtering.
- `AboutUs`: about page, civilization features, hero and details.
- `ContactUs`: contact form UI.
- `FAQ`: frequently asked questions UI and types.
- `Hero`, `HeroSection`, `Categorysection`, `Impactsection`, `HowToEffect`, `FeatureEffect`, `RoadMap`: landing page sections and destination/story content.
- `CommunityPost`, `Communitypostcard`, `Slider`, `Testmonials`: visitor stories and testimonial displays.
- `Navbar`: public navigation feature.
- `User`: current-user API service and types.

Public content is a mix of static/local data and interactive UI. Verify data source behavior in the specific module; there is no global CMS abstraction visible in this repository.

### Authentication module

`src/modules/auth/` is organized into `components/`, `hooks/`, `services/`, `store/`, `types/`, and `config/`.

- Forms/components: login, multi-step register, role selection, account details, success screen, OTP verify, forgotten password, reset password.
- Hooks: `useLogin`, `useRegister`, `useForgetPassword`, `useVerifyOtp`, `useResetPassword`, `useGoogleLogin`, `useUploadCard`, `useDownloadCard`.
- Services: login/register/logout, Google login, OTP verification, password reset/forgot, card upload/download.
- DTOs and role values: `src/modules/auth/types/auth.types.ts`.
- Endpoint strings: `src/modules/auth/config/api.config.ts`.
- In-memory auth store: `src/modules/auth/store/auth.store.ts`.

The current registration form posts a `RegisterDTO` with `name`, `email`, `phone`, `password`, `confirmPassword`, and a `SystemRole`. Values in the type are `user`, `ambassedor`, `service_provider`, and `system_admin` (the spelling `ambassedor` is the existing API contract; do not silently correct it without coordinating with the backend). The UI currently maps role values to backend roles itself. `StepServiceSelection` exists but is not part of the current `RegisterForm` render path.

### Shared UI and utilities

- `src/shared/components/common/`: buttons, inputs, select, cards, ratings, badges, theme selector, spinner, search and partner components.
- `src/shared/components/icons/`: icon components, including domain-specific icons.
- `src/shared/lib/utils/`: class helpers, formatting, auth session clearing, API error display.
- `src/shared/types/`: shared response/error types.
- `src/components/` and `src/layout/` also contain UI. Some are older or alternate implementations; search for active imports before creating a second copy of a component.

## Authentication, sessions, and authorization

### Current authentication mechanics

- Login and Google login call the backend and place `data.user` into Zustand. On success, both route to `/dashboard`.
- Auth state contains `user`, `isAuthenticated`, `setUser`, and `logout`; it is in-memory and has no persistence middleware.
- Axios sends cookies cross-origin when permitted by the API (`withCredentials: true`). The frontend does not directly write the access cookie in the shown login hook.
- On `401`, the Axios response interceptor calls `/auth/refresh-token` once and retries the original request. A refresh failure clears Zustand and React Query state and navigates to `/login?reason=session-expired`.
- Logout service exists, but the dashboard navbar's current logout handler only navigates to `/login`; it does not call the logout service or clear the client store in that handler.
- Google callback reads the OAuth `code`, guards against duplicate mutation with a ref, then calls the Google login mutation.

### Authorization and security boundaries

The current `middleware.ts` checks whether an `accessToken` cookie exists for paths beginning `/dashboard`, `/profile`, or `/settings`; if absent it redirects to `/login`. This is a navigation gate only. It does **not** validate token signatures/expiry, resolve user roles, or perform resource-level authorization. Role-based route and action protection is not implemented in this frontend. The backend must enforce authentication, roles, ownership, and permissions for every protected API action.

Observed implications for future agents:

- Do not treat a client-side Zustand `isAuthenticated` flag or the presence of a cookie as proof of authorization.
- Avoid exposing tokens or secrets to browser JavaScript. Keep credential validation and authorization on the backend.
- If changing auth flow, coordinate cookie name, cookie attributes, API CORS policy, refresh endpoint, and deployment origins with the backend.
- Verify the actual route prefix behavior before expanding `middleware.ts`; it uses `pathname.startsWith`, so matching is broader than exact route equality.
- The callback and fallback Google client ID are development-specific in `LoginForm.tsx`; replace with deployment config before production OAuth use.

## Brand identity and design system

The design system is implemented through primitives, CSS custom properties, and Tailwind semantic colors:

- `src/config/tokens.ts`: primitive palettes, typography, radii, shadows, and motion.
- `src/config/colors.ts`: semantic JS color mappings.
- `src/config/theme.ts`: brand metadata and theme list.
- `src/styles/themes.css`: runtime HSL CSS variables for light/dark regional themes.
- `tailwind.config.js`: maps semantic Tailwind names (`bg-primary`, `text-foreground`, `border-border`, etc.) to CSS variables.
- `src/providers/theme-provider.tsx` and `src/shared/components/common/ThemeSelector.tsx`: theme class handling and selector.

### Brand palettes

- **Tunisia Village (default):** olive Tunisian green `#1A7D5A`, terracotta/sunset accent `#FF9149`, sand and clay neutrals.
- **Sidi Bou Said:** Mediterranean blue `#2885AC`, jasmine terracotta `#E2725B`, limestone/cool neutrals.
- **Carthage:** Tyrian purple `#7C3AED`, gold `#D4AF37`, parchment neutrals.
- Light and dark variables are defined for all three themes. The root layout defaults to `theme-village`; the theme provider disables system-based switching.

Use semantic CSS-variable-backed classes for new shared UI: `bg-background`, `bg-card`, `bg-primary`, `text-primary-foreground`, `text-foreground`, `text-muted-foreground`, `border-border`, `ring-primary`, `bg-accent`. This allows all supported themes to remain coherent. Avoid hardcoded hex values and unrelated palettes in reusable components. Existing older screens do contain direct color literals; follow the semantic system for new work and change older colors only when in scope.

### RTL and typography

- The root HTML is Arabic and RTL; global CSS also sets document direction.
- IBM Plex Sans Arabic is loaded from `next/font/google` and exposed as `--font-ibmArabic`.
- `src/styles/typography.css` establishes heading/body font variables, Arabic letter spacing, and readable line-height.
- Prefer logical layout and spacing that behaves in RTL. Set `dir="ltr"` only for values that need it (email, codes, phone numbers) and scope it narrowly.
- Arabic text has been found mojibaked in some source files. Preserve source files as UTF-8; if terminal output looks corrupt, check bytes/encoding before rewriting text. Do not copy visibly garbled strings forward.

### Motion and components

Shared motion definitions live in `src/styles/animations.css`; use existing `animate-*`, `hover-card-trigger`, and delay helpers before creating new global animation names. Reusable primitives are in `src/shared/components/common/`. `src/shared/lib/utils/Data/Utils.ts` exports `cn`, `formatPrice`, and `formatDate`; note that formatting currently uses the `ar-EG` locale.

`DESIGN_SYSTEM.md` contains additional design-system intentions. It describes some conventions such as avoiding hardcoded colors and describes a folder layout that does not exactly match the actual repository. Treat actual source/configuration as authoritative and correct that document when it is next revised.

## React hooks and state conventions

Hooks are currently organized by feature rather than in a single global hooks folder.

- Use React hooks (`useState`, `useEffect`, `useRef`) only inside client components or custom hooks. A file using browser APIs, event handlers, state, or effects needs the Next.js client boundary (`"use client"`) at the top of the module.
- Put reusable domain hooks beside their module, e.g. `src/modules/auth/hooks/`.
- API mutations use TanStack Query's `useMutation`; query behavior uses the shared `queryClient` defaults. Keep request calls in services instead of embedding Axios calls in view components.
- Use Zustand for small cross-route client state such as the current in-memory auth user. Avoid duplicating server data there when it belongs in React Query.
- Clean up effects that subscribe to external resources. Guard callback effects that must only run once (the Google callback currently uses `useRef`).
- Do not access `window`, `document`, or browser-only state during server render. For theme-dependent output, wait until mounted where required.

### Git hooks and automation

No Husky, lint-staged, pre-commit, or other Git hook configuration was found. There are no Codex/agent hook definitions in the repository discovered during this review. Do not assume commits automatically run lint or tests. The `hooks/` folder under `src/modules/auth/` contains React hooks, not Git hooks.

## API and environment conventions

- Shared Axios instance: `src/shared/api/api-client.ts`.
- Environment mapping: `src/shared/api/env.ts`.
- Feature endpoint paths should live in that feature's `config/api.config.ts`.
- Auth endpoint paths use `/api/auth/...`; the current user endpoint is `/api/user/me`.
- The API base URL default is `http://localhost:8000`; backend endpoints and cookie policy must be available at that origin in local development.
- The shared client uses `withCredentials: true` and a response interceptor for refresh. When adding interceptors, prevent recursive refresh loops and duplicate retry behavior.
- `src/app/api` is currently absent; do not describe these external backend calls as Next.js route handlers.
- `next.config.ts` allows `next/image` remote hosts `encrypted-tbn0.gstatic.com` and `res.cloudinary.com`. Add hosts deliberately if remote image sources change.
- `.env.local` is gitignored. Never read out, paste, or commit its values. Introduce safe placeholder variable names in a future `.env.example` if the team wants a reproducible setup guide.

## Testing and quality checks

### What exists now

- `npm run lint` executes ESLint using `eslint-config-next/core-web-vitals` and Next TypeScript rules.
- `npm run build` creates a production build.
- No `test`, `test:unit`, or `test:e2e` script is configured in `package.json`; no Jest, Vitest, Playwright, or Cypress configuration/dependencies were found in the project manifests.
- `.gitignore` ignores `/coverage`, but that does not mean coverage is currently collected.
- `next.config.ts` sets `typescript.ignoreBuildErrors: true`; a successful Next production build therefore must not be treated as proof that TypeScript has no errors. Run an explicit type check (`npx tsc --noEmit`) when validating type safety.

### Recommended verification for changes

1. Run `npm run lint` for all changed code.
2. Run `npx tsc --noEmit` when changing TypeScript, route types, or shared interfaces.
3. Run `npm run build` for route, server/client boundary, Tailwind, or production integration changes.
4. Manually check affected screens at desktop and mobile widths, in RTL, and in each supported theme if the change touches UI/theme behavior.
5. For auth/API changes, verify success, validation errors, API failures, expired-session refresh, redirect paths, and cookie/CORS behavior against a safe backend environment.

These are available/recommended checks, not evidence that automated tests currently exist. For new critical behavior, add an appropriate test framework and scripts as a separate, deliberate project change.

## Restrictions and implementation guardrails

- Do not change backend endpoint paths, DTO field names, cookie names, or role strings without checking backend compatibility.
- Do not rely on frontend checks for authorization or security-sensitive validation.
- Do not add credentials, `.env.local`, OAuth secrets, or user data to source control or documentation.
- Preserve the App Router route-group behavior and existing public URL paths when moving pages.
- Respect the `@/*` alias, which resolves from the repository root (`./*`), and prefer existing aliases for imports.
- Keep feature code within its module; share UI/transport through `src/shared` only when it is genuinely cross-feature.
- Components that use state/effects/browser APIs must be client components; server components should remain server-renderable.
- Keep styles responsive and RTL-aware; use theme tokens for new work.
- Avoid claiming a dashboard destination is API-backed until you find its service/hook and a real endpoint. Many dashboard screens are currently placeholder demos.
- `next.config.ts` ignores TypeScript errors during Next builds. Do not weaken type safety further; run an explicit compiler check when relevant.
- Respect repository `.gitignore`, especially `.env.local`, `.next`, `node_modules`, build output, and TypeScript build info.

## Adding a dashboard feature

1. Build the screen under the appropriate `src/modules/dashboard/serviceProvider/features/<area>/` folder.
2. If it needs data, define types/config/service/hook in the module. Call the API through `apiClient`.
3. Export or register the page component in the matching `config/maps/*.map.tsx` file; use dynamic imports where the neighboring map does.
4. Add the tab/section/item and URL in `config/navigation.config.ts` with a stable `id`.
5. Ensure the matching `src/app/(dashboard)/dashboard/.../page.tsx` exists or that the dynamic `[tab]/[subtab]` route resolves it correctly.
6. Consider active nav state, mobile sidebar behavior, loading/error/empty states, RTL, themes, and authorization enforcement on the backend.
7. Run lint, type check, build, and a manual route check appropriate to the change.

## Known gaps to keep in mind

- Several dashboard destinations explicitly render placeholder/demo content; see `src/modules/dashboard/serviceProvider/features/` for current state.
- The provider dashboard currently uses navigation configuration to render routes but frontend role enforcement is not present.
- Auth state is not persisted by Zustand; cookie and in-memory state can diverge across reloads until user/session bootstrap is implemented.
- Dashboard logout currently redirects without invoking the logout endpoint or clearing the store.
- Two login routes exist (`/login` and `/auth/login`); preserve intent when adjusting links/redirects.
- Google OAuth currently assumes localhost in its redirect URI and includes a client-ID fallback in the login component.
- Source text encoding is inconsistent: multiple Arabic UI strings were observed as mojibake. Verify encoding when editing legacy files.
- The repository has no automated test runner, test scripts, or Git hook automation at this time.
- Some architecture descriptions in `DESIGN_SYSTEM.md` describe planned organization rather than the current `src/` tree.

## Important files

- App providers/layout: `src/app/layout.tsx`, `src/providers/`
- Public/dashboard/auth route shells: `src/app/(root)/layout.tsx`, `src/app/(dashboard)/layout.tsx`, `src/modules/dashboard/serviceProvider/features/DashboardLayoutWrapper.tsx`
- Route gate: `middleware.ts`
- Dashboard navigation and dynamic page resolution: `src/modules/dashboard/serviceProvider/config/navigation.config.ts`, `src/modules/dashboard/serviceProvider/config/maps/`, `src/modules/dashboard/serviceProvider/utils/navigation.utils.ts`
- Auth: `src/modules/auth/`
- API client and env: `src/shared/api/`
- Theme/brand: `src/config/`, `src/styles/themes.css`, `tailwind.config.js`, `src/providers/theme-provider.tsx`
- Shared React Query defaults: `src/shared/lib/react-query/query-client.ts`
- Scripts/dependencies: `package.json`
