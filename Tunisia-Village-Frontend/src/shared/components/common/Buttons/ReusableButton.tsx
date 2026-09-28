import React from 'react';

interface ReusableButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function ReusableButton({
  children,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}: ReusableButtonProps) {
  const baseStyle = "font-extrabold py-3.5 px-8 rounded-2xl shadow-sm transition-all duration-200 active:scale-95 text-sm cursor-pointer flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md hover:shadow-primary/10",
    secondary: "bg-accent hover:bg-accent/90 text-accent-foreground hover:shadow-md hover:shadow-accent/10",
    outline: "bg-card border border-border text-foreground hover:bg-muted"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'right' && icon}
      {children}
      {icon && iconPosition === 'left' && icon}
    </button>
  );
}
