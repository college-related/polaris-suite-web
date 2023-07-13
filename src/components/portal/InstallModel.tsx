import { useState } from "react";
import { Copy } from "react-feather";

import Backdrop from "./Backdrop";
import IconButton from "../IconButton";

interface IInstallModelProps {
  closeModel: () => void;
}

const InstallModel = ({ closeModel }: IInstallModelProps) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Backdrop closeModel={closeModel}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4"
      >
        <p className="flex gap-4 items-center relative">
          {isCopied && (
            <span className="bg-green-400 text-white rounded-md p-2 absolute -top-12 -right-10 w-32 text-center">
              Copied
            </span>
          )}
          <span className="text-2xl font-bold">&gt; npm i polaris-suite</span>
          <IconButton
            variant="primary"
            onClick={() => {
              navigator.clipboard.writeText("npm i polaris-suite");
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
            icon={<Copy />}
          />
        </p>
      </div>
    </Backdrop>
  );
};

export default InstallModel;
