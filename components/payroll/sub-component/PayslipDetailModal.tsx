import { FiX, FiPrinter, FiSend, FiCheckCircle, FiFileText } from "react-icons/fi";
import { format } from "date-fns";
import { useAction } from "@/hooks/useAction";
import Spinner from "@/components/ui/Spinner";
import { useGetPayslipByIdQuery } from "@/services/api/constants/payroll.constant";

interface Props {
  payslipId: number | string;
  onClose: () => void;
}

const PayslipDetailModal = ({ payslipId, onClose }: Props) => {
  const { data: response, isLoading } = useGetPayslipByIdQuery(payslipId);
  const { sendPayslipAction, isSendingPayslip } = useAction();
  const payslip = response?.data;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
        <Spinner />
      </div>
    );
  }

  if (!payslip) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSend = async () => {
    await sendPayslipAction(payslipId, payslip.employeeEmail);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl min-h-[600px] rounded-xl shadow-2xl flex flex-col my-8">
        {/* Header Actions */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-800 print:hidden">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FiFileText className="text-blue-600" />
              Payslip Detail
            </h3>
            <span className={`text-[10px] uppercase font-bold py-0.5 px-2 rounded-full ${payslip.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}>
              {payslip.isPublished ? "Published" : "Draft Record"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSend}
              disabled={isSendingPayslip}
              className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
            >
              <FiSend className={isSendingPayslip ? "animate-pulse" : ""} />
              <span>{isSendingPayslip ? "Sending..." : "Send"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <FiPrinter />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Payslip Content (A4 feel) */}
        <div className="flex-1 p-8 md:p-12 print:p-0 overflow-y-auto">
          <div className="payslip-container bg-white dark:bg-gray-900 mx-auto max-w-4xl print:max-w-none">
            {/* Payslip Header */}
            <div className="flex justify-between items-start mb-10 border-b-2 border-blue-600 pb-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-black">
                    P
                  </div>
                  <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight italic uppercase">
                    PayrollPRO
                  </h1>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px] leading-relaxed">
                  38 Strouts Way, ICT Division, Abuja International Hotel Plc.
                </p>
              </div>
              <div className="text-right flex flex-col gap-1">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">PAYSLIP</h2>
                <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest leading-none">
                  <span>PAYMENT ID: {payslip.id}</span>
                  <span>GENERATED: {format(new Date(payslip.generatedAt), "dd MMM yyyy")}</span>
                </div>
              </div>
            </div>

            {/* Employee & Pay Info Grid */}
            <div className="grid grid-cols-2 gap-12 mb-10 text-sm">
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest border-b dark:border-gray-800 pb-1">Employee Details</h4>
                <div className="grid grid-cols-2 gap-y-3">
                  <span className="text-gray-400 dark:text-gray-500 font-medium">Name:</span>
                  <span className="text-gray-900 dark:text-white font-bold">{payslip.employeeName}</span>

                  <span className="text-gray-400 dark:text-gray-500 font-medium">Employee No:</span>
                  <span className="text-gray-900 dark:text-white font-bold">{payslip.employeeNo}</span>

                  <span className="text-gray-400 dark:text-gray-500 font-medium">Email:</span>
                  <span className="text-gray-900 dark:text-white font-bold break-all">{payslip.employeeEmail}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest border-b dark:border-gray-800 pb-1">Summary Information</h4>
                <div className="grid grid-cols-2 gap-y-3">
                  <span className="text-gray-400 dark:text-gray-500 font-medium">Pay Period:</span>
                  <span className="text-gray-900 dark:text-white font-bold">P{payslip.payrollRunId} / 2024</span>

                  <span className="text-gray-400 dark:text-gray-500 font-medium">Currency:</span>
                  <span className="text-gray-900 dark:text-white font-bold">GBP (£)</span>

                  <span className="text-gray-400 dark:text-gray-500 font-medium">Publish Status:</span>
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    {payslip.isPublished ? <FiCheckCircle /> : null}
                    <span>{payslip.isPublished ? "Official" : "Work-in-Progress"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Financials Table */}
            <div className="mb-12">
              <table className="w-full text-sm border-t dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px]">Description</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px]">Earnings</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider text-[11px]">Deductions</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800 font-medium">
                  <tr>
                    <td className="py-4 px-4 text-gray-900 dark:text-white font-bold lowercase first-letter:uppercase italic">Basic Salary / Gross Pay</td>
                    <td className="py-4 px-4 text-right text-gray-900 dark:text-white">£{payslip.grossPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="py-4 px-4 text-right text-gray-400">-</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 text-gray-600 dark:text-gray-400">Payroll Deductions (Total)</td>
                    <td className="py-4 px-4 text-right text-gray-400">-</td>
                    <td className="py-4 px-4 text-right text-orange-600 font-bold">-£{payslip.totalDeductions?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  </tr>
                  {/* Summary Footer Row */}
                  <tr className="bg-blue-50/10 dark:bg-blue-900/5 font-black border-t-2 border-gray-100 dark:border-gray-700">
                    <td className="py-5 px-4 text-gray-900 dark:text-white text-base">NET TAKE-HOME PAY</td>
                    <td colSpan={2} className="py-5 px-4 text-right text-blue-600 dark:text-blue-400 text-3xl tracking-tighter">
                      £{payslip.netPay?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Disclaimer */}
            <div className="text-center pt-8 border-t border-dashed dark:border-gray-800 space-y-2">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold">
                Electronically Generated Document - No Signature Required
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 italic">
                If you have any questions regarding this payslip, please contact the HR department.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .fixed {
            position: absolute !important;
            left: 0;
            top: 0;
            margin: 0;
            padding: 0;
            background: white !important;
            backdrop-filter: none !important;
          }
          .payslip-container, .payslip-container * {
            visibility: visible;
          }
          .payslip-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2cm !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PayslipDetailModal;
