"use client";

import React, { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: null as string | null,
  setIsModalOpen: (value: string | null) => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState<string | null>(null);
  return (
    <div>
      <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
        {children}
      </ModalContext.Provider>
    </div>
  );
};

export default ModalContext;

export const useModal = () => {
  return useContext(ModalContext);
};
