import React from "react";
import { CgClose } from "react-icons/cg";
import { ModalProps } from "../types/modal";

const NoBtnModal = ({ size, heading, desc, children, onClose }: ModalProps) => {
  return (
    <div className="bg-black/20 fixed inset-0 z-50 justify-center items-center w-screen h-screen  flex">
      <div
        className={`bg-white border-b-4 border-[#2663eb] w-${size}  w-3xl rounded-sm  p-5 dark:bg-gray-800 dark:border-[#2663eb]`}
      >
        <div className="flex justify-between items-start border-b border-gray-200 dark:border-gray-700">
          <div className="pb-3">
            {heading && <h2 className="text-sm font-semibold dark:text-white">{heading}</h2>}
            {desc && <p className="text-sm font-normal dark:text-gray-400">{desc}</p>}
          </div>
          <button onClick={onClose} className="dark:text-white">
            <CgClose />
          </button>
        </div>
        <div className="my-5">{children}</div>
      </div>
    </div>
  );
};

export default NoBtnModal;
