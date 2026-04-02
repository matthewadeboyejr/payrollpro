import { useActivatePayrollConfigurationMutation, useGeneratePayslipsMutation, useSendPayslipByIdMutation, useSendPayslipsByRunIdMutation } from "@/services/api/constants/payroll.constant";
import { useDeleteRotaMutation, useDeleteShiftMutation } from "@/services/api/constants/shift.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import Swal from "sweetalert2";
import { useDeactivateUserMutation } from "@/services/api/constants/auth.constant";
import { useDeactivateemployeeMutation } from "@/services/api/constants/employee.constant";
import { useDeleteExpenseCategoriesMutation, useDeleteExpenseMutation, useDeleteIncomeCategoriesMutation } from "@/services/api/constants/expense.constant";
import { useDeactivateSalaryBandMutation } from "@/services/api/constants/setting.constant";

export const useAction = () => {
  const [deactivateUser, { isLoading: isDeactivating }] = useDeactivateUserMutation();
  const [deactivateemployee, { isLoading: isDeactivatingEmployee }] = useDeactivateemployeeMutation();
  const [deactivateSalaryBand, { isLoading: isDeletingSalaryBand }] = useDeactivateSalaryBandMutation();
  const [deleteRota, { isLoading: isDeletingRota }] = useDeleteRotaMutation();
  const [deleteShift, { isLoading: isDeletingShift }] = useDeleteShiftMutation();
  const [deleteExpense, { isLoading: isDeletingExpense }] = useDeleteExpenseMutation();
  const [deleteIncomeCategories, { isLoading: isDeletingIncomeCategories }] = useDeleteIncomeCategoriesMutation();
  const [deleteExpenseCategories, { isLoading: isDeletingExpenseCategories }] = useDeleteExpenseCategoriesMutation();
  const [activatePayrollConfig, { isLoading: isActivatingPayrollConfig }] = useActivatePayrollConfigurationMutation();
  const [generatePayslips, { isLoading: isGeneratingPayslips }] = useGeneratePayslipsMutation();
  const [sendPayslip, { isLoading: isSendingPayslip }] = useSendPayslipByIdMutation();
  const [sendAllPayslips, { isLoading: isSendingAllPayslips }] = useSendPayslipsByRunIdMutation();



  //actions
  const sendPayslipAction = async (payslipIdArg: string | number | any, defaultEmail?: string) => {
    // Basic robustness: if an object is passed, try to get the id property
    const id = typeof payslipIdArg === "object" ? payslipIdArg?.id : payslipIdArg;

    if (!id) {
      console.error("Invalid payslip ID provided:", payslipIdArg);
      showAlert("Error", "Could not identify the payslip record", "error");
      return;
    }

    const { value: emailOverride, isConfirmed } = await Swal.fire({
      title: "Send Payslip?",
      text: "This will send the official payslip to the employee.",
      input: "email",
      inputLabel: "Recipient Email Address",
      inputValue: defaultEmail || "",
      inputPlaceholder: "Enter email address",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Send!",
    });

    if (isConfirmed) {
      try {
        await sendPayslip({ id: id, emailOverride }).unwrap();
        showAlert("Success", "Payslip sent successfully", "success");
      } catch (error: any) {
        console.error("Send Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to send payslip",
          "error"
        );
      }
    }
  };

  const sendAllPayslipsAction = async (payrollRunId: string | number) => {
    if (!payrollRunId) {
      console.error("Invalid payrollRunId");
      return;
    }

    const result = await Swal.fire({
      title: "Send All Payslips?",
      text: "This will send official payslips to all employees in this run. Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Send All!",
    });

    if (result.isConfirmed) {
      try {
        await sendAllPayslips(payrollRunId).unwrap();
        showAlert("Success", "All payslips are being sent", "success");
      } catch (error: any) {
        console.error("Bulk Send Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to send payslips",
          "error"
        );
      }
    }
  };

  const generatePayslipsAction = async (payrollRunId: string | number) => {
    if (!payrollRunId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Generate Payslips?",
      text: "This will create official payslip records for all employees in this run. You can view them before sending.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Generate!",
    });

    if (result.isConfirmed) {
      try {
        await generatePayslips(payrollRunId).unwrap();
        showAlert("Success", "Payslips generated successfully", "success");
      } catch (error: any) {
        console.error("Generation Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to generate payslips",
          "error"
        );
      }
    }
  };

  const activatePayrollConfigurationAction = async (id: number) => {
    if (!id) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Activate Configuration?",
      text: "This action will make this payroll configuration active for all future payroll runs!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate!",
    });

    if (result.isConfirmed) {
      try {
        await activatePayrollConfig(id).unwrap();
        showAlert("Success", "Configuration Activated", "success");
      } catch (error: any) {
        console.error("Activation Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to activate configuration",
          "error"
        );
      }
    }
  };

  const deactivate = async (userId: string) => {
    if (!userId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Deactivate Staff?",
      text: "This action will Temporally prevent access to this account without deleting it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate!",
    });

    if (result.isConfirmed) {
      try {
        await deactivateUser(userId).unwrap();
        showAlert("Success", "User Deactivated", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Deactivate user",
          "error"
        );
      }
    }
  };
  const deactivateEmployee = async (employeeId: string) => {
    if (!employeeId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Deactivate Employee?",
      text: "This action will Temporally prevent access to this employee without deleting it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate!",
    });

    if (result.isConfirmed) {
      try {
        await deactivateemployee(employeeId).unwrap();
        showAlert("Success", "Employee Deactivated", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message ||
          error?.message ||
          "Failed to Deactivate employee",
          "error"
        );
      }
    }
  };

  const deleteSalaryBand = async (salaryBandId: string) => {
    if (!salaryBandId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Salary Band?",
      text: "This action will permanently delete this salary band!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deactivateSalaryBand(salaryBandId).unwrap();
        showAlert("Success", "Salary Band Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message ||
          error?.message ||
          "Failed to Delete salary band",
          "error"
        );
      }
    }
  };
  const deleteRotaAction = async (rotaId: string) => {
    if (!rotaId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Rota?",
      text: "This action will permanently delete this rota!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRota(rotaId).unwrap();
        showAlert("Success", "Rota Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete rota",
          "error"
        );
      }
    }
  };

  const deleteShiftAction = async (shiftId: string) => {
    if (!shiftId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete  Shift?",
      text: "This action will permanently delete this shift!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteShift(shiftId).unwrap();
        showAlert("Success", "Shift Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete shift",
          "error"
        );
      }
    }
  };

  const deleteExpenseAction = async (expenseId: string) => {
    if (!expenseId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete  Expense?",
      text: "This action will permanently delete this expense!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteExpense(expenseId).unwrap();
        showAlert("Success", "Expense Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete expense",
          "error"
        );
      }
    }
  };
  const deleteIncomeCategoriesAction = async (expenseId: string) => {
    if (!expenseId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Income Category?",
      text: "This action will permanently delete this income category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteIncomeCategories(expenseId).unwrap();
        showAlert("Success", "Income Category Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete income category",
          "error"
        );
      }
    }
  };
  const deleteExpenseCategoriesAction = async (expenseId: string) => {
    if (!expenseId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Income Category?",
      text: "This action will permanently delete this income category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteExpenseCategories(expenseId).unwrap();
        showAlert("Success", "Expense Category Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete Expense category",
          "error"
        );
      }
    }
  };

  return {
    deactivate,
    isDeactivating,
    deactivateEmployee,
    isDeactivatingEmployee,
    deleteSalaryBand,
    isDeletingSalaryBand,
    deleteRotaAction,
    isDeletingRota,
    deleteShiftAction,
    isDeletingShift,
    deleteExpenseAction,
    isDeletingExpense,
    deleteIncomeCategoriesAction,
    isDeletingIncomeCategories,
    deleteExpenseCategoriesAction,
    isDeletingExpenseCategories,
    activatePayrollConfigurationAction,
    isActivatingPayrollConfig,
    generatePayslipsAction,
    isGeneratingPayslips,
    sendPayslipAction,
    isSendingPayslip,
    sendAllPayslipsAction,
    isSendingAllPayslips,
  };
};
