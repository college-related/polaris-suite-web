import Button from "../Button"
import Backdrop from "./Backdrop"

interface IAlertModel {
  closeModel: () => void;
  title: string;
  message: string;
  handleConfirm: () => void;
}

const AlertModel = ({ closeModel, title, message, handleConfirm }: IAlertModel) => {
  return (
    <Backdrop closeModel={closeModel}>
        <div className="bg-white fixed top-20 left-1/2 -translate-x-1/2 p-4 rounded-md" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="mt-4 flex gap-2 items-center justify-end">
                <Button variant="default" classes="bg-red-500 text-white" onClick={closeModel}>Cancel</Button>
                <Button variant="default" classes="bg-green-500 text-white" onClick={handleConfirm}>Confirm</Button>
            </div>
        </div>
    </Backdrop>
  )
}

export default AlertModel