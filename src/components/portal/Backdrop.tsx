import ReactDOM from "react-dom";

interface IBackdropProps {
    children: React.ReactNode;
    closeModel: () => void;
}

const Backdrop = ({ children, closeModel }: IBackdropProps) => {
  return ReactDOM.createPortal(
    <div className="fixed z-10 top-0 left-0 bg-black/60 w-screen h-screen" onClick={closeModel}>
        {children}
    </div>,
    document.getElementById("portal") as HTMLElement
  );
}

export default Backdrop