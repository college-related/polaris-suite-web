import { PropsWithChildren } from "react";
import { Hexagon, Loader } from "react-feather";

interface IButtonProps {
  onClick: () => void;
  variant: "default" | "primary" | "warning" | "success" | "clear" | "danger" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  classes?: string;
  isLoading?: boolean;
  loadingText?: string;
  [key: string]: any;
}

// button component, consuming props
const Button = ({
  children,
  onClick,
  variant = 'default',
  size = 'md',
  disabled = false,
  classes = '',
  isLoading = false,
  loadingText = '',
  ...rest
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`btn ${variant} ${size} ${classes}` 
        + ((disabled && variant==='default') ? 'disabled' : '')
        + (disabled ? 'cursor-not-allowed' : '')}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <Loader className="animate-[spin_2s_ease-in-out_infinite]" />
          {loadingText}
        </span>
      ) : children}
    </button>
  );
};

export default Button;
