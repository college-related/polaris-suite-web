
interface IconButtonProps {
  icon: JSX.Element;
  onClick: () => void;
  variant?: "default" | "primary" | "success" | "danger" | "warning" | "clear";
  [key: string]: any;
}

const IconButton = ({ icon, onClick, variant="default", ...rest }: IconButtonProps) => {
  return (
    <button 
      onClick={onClick}
      className={`btn ${variant} flex items-center justify-center`}
      {...rest}
    >
      {icon}
    </button>
  )
}

export default IconButton