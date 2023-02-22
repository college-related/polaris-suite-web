import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  variant: string;
  size?: string;
  disabled?: boolean;
}

// button component, consuming props
const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`btn ${variant} ${size}` + (disabled ? ' disabled' : '')}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
