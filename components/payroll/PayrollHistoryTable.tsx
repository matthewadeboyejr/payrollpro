import { useRouter } from "next/navigation";
import StatusBadge from "@/utils/StatusBadge";
import { Dropdown } from "../ui/Dropdown";
import { useGetPayrollRunsQuery, useFinalizePayrollRunMutation } from "@/services/api/constants/payroll.constant";
import { BiFile, BiCheckCircle } from "react-icons/bi";
import { showAlert } from "../ui/ShowAlert";

const PayrollHistoryTable = () => {
  const { data: response, isLoading, refetch } = useGetPayrollRunsQuery({});
  const payrollRuns = response?.data;
  const [finalizeRun] = useFinalizePayrollRunMutation();
  const router = useRouter();

  const handleFinalize = async (id: string | number) => {
    try {
      await finalizeRun(id).unwrap();
      showAlert("Success", "Payroll run finalized successfully", "success");
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert("Error", err?.data?.message || "Failed to finalize run", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Run ID</th>
            <th scope="col" className="px-6 py-3">Period</th>
            <th scope="col" className="px-6 py-3">Department</th>
            <th scope="col" className="px-6 py-3">Tax Config</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrollRuns?.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500 italic">
                No payroll runs found. Start your first run to see history.
              </td>
            </tr>
          ) : (
            payrollRuns?.map((run: { id: string | number; month: number; year: number; departmentId: number; departmentName?: string; useUkProgressiveTax: boolean; taxRate: number; currency: string; status: string; isFinalized: boolean }) => (
              <tr key={run.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 italic">
                  #{run.id}
                </td>
                <td className="px-6 py-4">
                  {new Date(0, run.month - 1).toLocaleString('en-GB', { month: 'short' })} {run.year}
                </td>
                <td className="px-6 py-4">
                  {run.departmentId === 0 ? "All Departments" : (run.departmentName || `Dept #${run.departmentId}`)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1 text-[10px]">
                    <span className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-800 w-fit">
                      {run.useUkProgressiveTax ? "UK Progressive" : `Tax: ${run.taxRate}%`}
                    </span>
                    <span className="text-gray-400">
                      Currency: {run.currency}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={run.status || (run.isFinalized ? "Finalized" : "Draft")} />
                </td>
                <td className="px-6 py-4 text-right">
                  <Dropdown
                    options={[
                      {
                        title: "View Details",
                        icon: <BiFile className="text-blue-500" />,
                        onClick: () => router.push(`/dashboard/payroll-wages/${run.id}`)
                      },
                      {
                        title: "Finalize Run",
                        icon: <BiCheckCircle className="text-green-500" />,
                        disabled: run.status === "Finalized" || run.isFinalized,
                        onClick: () => handleFinalize(run.id)
                      },
                    ]}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollHistoryTable;
