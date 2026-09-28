
import BePartner from "@/src/shared/components/icons/BePartner/BePartner";
import Favouriate from "@/src/shared/components/icons/favouriateIcon/Favouriate";
import LoginBtn from "@/src/shared/components/icons/loginBtn/LoginBtn";
import Logo from "@/src/shared/components/icons/logo/Logo";
import WorldIcon from "@/src/shared/components/icons/WorldIcon/WorldIcon";
import NavItem from "@/src/modules/Navbar/components/NavItem";
import { navItems } from "@/src/shared/lib/consts/navigation";

export default function NavBarFeature() {
  return (
    <div className="px-6 py-1.5 bg-card/90 backdrop-blur-md border-b border-border/40 sticky top-0 z-50 transition-all">
      <div className="flex justify-between items-center ">
        <Logo />
        <div className="flex gap-2 items-center">
          {navItems.map((item) => (
            <NavItem key={item.label} label={item.label} href={item.href} 
            selectIcon={item.selectIcon}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center">
            <Favouriate />
            <WorldIcon />
            <BePartner />
            <LoginBtn />
        </div>

      </div>
    </div>
  );
}
