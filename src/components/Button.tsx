import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: "default" | "primary" | "info" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  classes?: string;
}

// button component, consuming props
const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  classes = '',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`btn ${variant} ${size} ${classes}` + (disabled ? ' disabled' : '')}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
