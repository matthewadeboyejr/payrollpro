import React from "react";
import { CgClose } from "react-icons/cg";
import { ModalProps } from "../types/modal";

const Modal = ({
  size,
  heading,
  desc,
  children,
  onClose,
  secondaryBtnText,
  submitBtnText = "Submit",
  secondaryBtnColor = "bg-red-500 hover:bg-red-600",
}: ModalProps) => {
  return (
    <div className="bg-black/20 fixed inset-0 z-50 justify-center items-center w-screen h-screen  flex">
      <div className={`bg-white w-${size}  w-3xl rounded-sm  p-5 `}>
        <div className="flex justify-between items-start border-b border-gray-200">
          <div className="pb-3">
            {heading && <h2 className="text-sm font-semibold">{heading}</h2>}
            {desc && <p className="text-sm font-normal">{desc}</p>}
          </div>
          <button onClick={onClose}>
            <CgClose />
          </button>
        </div>
        <div className="my-5">{children}</div>
        <div className="flex justify-end border-t border-gray-200 pt-5">
          <div className="flex gap-3 ">
            <button className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            {secondaryBtnText && (
              <button
                type="button"
                className={`${secondaryBtnColor} transition-all duration-300 rounded-sm px-3 font-semibold text-white`}
              >
                {secondaryBtnText}
              </button>
            )}
            {submitBtnText && (
              <button type="submit" className="primary-btn ">
                {submitBtnText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
