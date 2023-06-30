import { PropsWithChildren } from "react";
import { Circle, Hexagon, RotateCcw } from "react-feather";

interface IButtonProps {
  onClick: () => void;
  variant: "default" | "primary" | "info" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  classes?: string;
  isLoading?: boolean;
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
  ...rest
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`btn ${variant} ${size} ${classes}` 
        + ((disabled || isLoading) ? ' disabled' : '')
        + (isLoading ? ' bg-primary/50 hover:bg-primary/50' : '')}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <span className="flex items-center justify-center animate-[spin_2s_ease-in-out_infinite]">
          <Hexagon />
        </span>
      ) : children}
    </button>
  );
};

export default Button;
