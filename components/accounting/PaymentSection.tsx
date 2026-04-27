import { useState } from "react";
import PaymentTab from "./sales/PaymentTab";
import { FiPlus } from "react-icons/fi";

const PaymentSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payments</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track and allocate your business payments.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <FiPlus /> Record Payment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <PaymentTab isModalOpen={isModalOpen} onCloseModal={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default PaymentSection;
