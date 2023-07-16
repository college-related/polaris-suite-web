
interface IconButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  variant?: "default" | "primary" | "success" | "danger" | "warning" | "clear";
  disabled?: boolean;
  [key: string]: any;
}

const IconButton = ({ icon, onClick, variant="default", disabled=false, ...rest }: IconButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`btn ${variant} flex items-center justify-center ${disabled && 'cursor-not-allowed disabled' }`}
      disabled={disabled}
      {...rest}
    >
      {icon}
    </button>
  )
}

export default IconButton