import { useState } from "react"

export const useModel = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    const openModel = () => setIsModelOpen(true);
    const closeModel = () => setIsModelOpen(false);

    return {
        isModelOpen,
        openModel,
        closeModel
    }
}