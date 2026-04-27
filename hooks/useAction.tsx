import { useActivatePayrollConfigurationMutation, useGeneratePayslipsMutation, useSendPayslipByIdMutation, useSendPayslipsByRunIdMutation } from "@/services/api/constants/payroll.constant";
import { useDeleteRotaMutation, useDeleteShiftMutation } from "@/services/api/constants/shift.constant";
import { useDeleteAccountingBankTransactionsMutation, useDeleteAccountingPeriodsMutation } from "@/services/api/constants/accounting.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import Swal from "sweetalert2";
import { useDeactivateUserMutation } from "@/services/api/constants/auth.constant";
import { useDeactivateemployeeMutation } from "@/services/api/constants/employee.constant";
import { useDeleteExpenseCategoriesMutation, useDeleteExpenseMutation, useDeleteIncomeCategoriesMutation } from "@/services/api/constants/expense.constant";
import { useDeactivateSalaryBandMutation } from "@/services/api/constants/setting.constant";
import { useDeleteAccountingReconciliationsMutation, useDeleteAccountingBillsMutation, useDeleteAccountingSuppliersMutation, useDeleteAccountingExpensesMutation, useDeleteAccountingInvoicesMutation, useDeleteAccountingCustomersMutation, useDeleteAccountingBankAccountMutation, useAccountingPeriodsMutation, useUpdateAccountingPeriodsMutation, useDeleteAccountingAccountMutation, useDeleteAccountingVatMutation, useDeleteAccountingPaymentsMutation, useSendAccountingInvoicesMutation } from "@/services/api/constants/accounting.constant";

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
  const [deleteReconciliation, { isLoading: isDeletingReconciliation }] = useDeleteAccountingReconciliationsMutation();
  const [deleteBankTransaction, { isLoading: isDeletingBankTransaction }] = useDeleteAccountingBankTransactionsMutation();
  const [deleteAccountingBill, { isLoading: isDeletingBill }] = useDeleteAccountingBillsMutation();
  const [deleteAccountingSupplier, { isLoading: isDeletingSupplier }] = useDeleteAccountingSuppliersMutation();
  const [deleteAccountingExpense, { isLoading: isDeletingAccountingExpense }] = useDeleteAccountingExpensesMutation();
  const [deleteAccountingInvoice, { isLoading: isDeletingInvoice }] = useDeleteAccountingInvoicesMutation();
  const [deleteAccountingCustomer, { isLoading: isDeletingCustomer }] = useDeleteAccountingCustomersMutation();
  const [deleteAccountingBankAccount, { isLoading: isDeletingBankAccount }] = useDeleteAccountingBankAccountMutation();
  const [lockAccountingPeriod, { isLoading: isLockingPeriod }] = useAccountingPeriodsMutation();
  const [deleteAccountingPeriod, { isLoading: isDeletingAccountingPeriod }] = useDeleteAccountingPeriodsMutation();
  const [deleteAccountingAccount, { isLoading: isDeletingAccount }] = useDeleteAccountingAccountMutation();
  const [deleteAccountingVat, { isLoading: isDeletingVat }] = useDeleteAccountingVatMutation();
  const [deleteAccountingPayment, { isLoading: isDeletingAccountingPayment }] = useDeleteAccountingPaymentsMutation();
  const [sendAccountingInvoice, { isLoading: isSendingAccountingInvoice }] = useSendAccountingInvoicesMutation();



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

  const deleteReconciliationAction = async (id: number | string, onSuccess?: () => void) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Delete Reconciliation?",
      text: "This action will permanently delete this reconciliation record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteReconciliation(id).unwrap();
        showAlert("Success", "Reconciliation record deleted", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        console.error("Delete Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to delete reconciliation record",
          "error"
        );
      }
    }
  };

  const deleteBankTransactionAction = async (id: number | string, onSuccess?: () => void) => {
    if (!id) return;

    const result = await Swal.fire({
      title: "Delete Transaction?",
      text: "This action will permanently delete this bank transaction record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBankTransaction(id).unwrap();
        showAlert("Success", "Transaction deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        console.error("Delete Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to delete transaction",
          "error"
        );
      }
    }
  };

  const deleteAccountingBillAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Bill?",
      text: "This action will permanently delete this bill!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingBill(id).unwrap();
        showAlert("Success", "Bill deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete bill", "error");
      }
    }
  };

  const deleteAccountingSupplierAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Supplier?",
      text: "This action will permanently delete this supplier!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingSupplier(id).unwrap();
        showAlert("Success", "Supplier deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete supplier", "error");
      }
    }
  };

  const deleteAccountingExpenseAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Expense?",
      text: "This action will permanently delete this accounting expense!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingExpense(id).unwrap();
        showAlert("Success", "Expense deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete expense", "error");
      }
    }
  };

  const deleteAccountingInvoiceAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Invoice?",
      text: "This action will permanently delete this invoice!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingInvoice(id).unwrap();
        showAlert("Success", "Invoice deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete invoice", "error");
      }
    }
  };

  const deleteAccountingCustomerAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Customer?",
      text: "This action will permanently delete this customer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingCustomer(id).unwrap();
        showAlert("Success", "Customer deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete customer", "error");
      }
    }
  };

  const deleteAccountingBankAccountAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Bank Account?",
      text: "This action will permanently delete this bank account and all its transaction history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingBankAccount(id).unwrap();
        showAlert("Success", "Bank account deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete bank account", "error");
      }
    }
  };

  const lockAccountingPeriodAction = async (yyyyMM: string, onSuccess?: () => void, providedReason?: string) => {
    let reason = providedReason;
    let isConfirmed = !!providedReason;

    if (!reason) {
      const result = await Swal.fire({
        title: `Lock Period ${yyyyMM}?`,
        text: "Locking a period prevents any further transactions from being recorded in it.",
        input: "text",
        inputLabel: "Reason for Locking",
        inputPlaceholder: "e.g. Monthly close complete",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3b82f6",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Lock Period",
      });
      reason = result.value;
      isConfirmed = result.isConfirmed;
    }

    if (isConfirmed && reason) {
      try {
        await lockAccountingPeriod({ yyyyMM, reason }).unwrap();
        showAlert("Success", `Period ${yyyyMM} locked successfully`, "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to lock period", "error");
      }
    } else if (isConfirmed && !reason) {
      showAlert("Warning", "A reason is required to lock a period", "warning");
    }
  };

  const deleteAccountingPeriodAction = async (yyyyMM: string, onSuccess?: () => void) => {
    const { isConfirmed } = await Swal.fire({
      title: `Delete Period Lock ${yyyyMM}?`,
      text: "Deleting this lock will unlock the period and allow transactions to be recorded again.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete Lock",
    });

    if (isConfirmed) {
      try {
        await deleteAccountingPeriod(yyyyMM).unwrap();
        showAlert("Success", `Period ${yyyyMM} lock deleted successfully`, "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete period lock", "error");
      }
    }
  };

  const deleteAccountingAccountAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Account?",
      text: "This action will permanently remove this account from your Chart of Accounts. Only do this if the account has no transaction history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingAccount(id).unwrap();
        showAlert("Success", "Account deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete account", "error");
      }
    }
  };

  const deleteAccountingVatAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete VAT Code?",
      text: "This action will permanently delete this tax code!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete!",
    });
    if (result.isConfirmed) {
      try {
        await deleteAccountingVat(id).unwrap();
        showAlert("Success", "VAT code deleted successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete VAT code", "error");
      }
    }
  };

  const deleteAccountingPaymentAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Delete Payment?",
      text: "This will permanently remove this payment record. If it was allocated to an invoice or bill, the allocation will be reversed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete Payment",
    });

    if (result.isConfirmed) {
      try {
        await deleteAccountingPayment(id).unwrap();
        showAlert("Deleted!", "Payment record has been removed.", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to delete payment", "error");
      }
    }
  };

  const sendAccountingInvoiceAction = async (id: number | string, onSuccess?: () => void) => {
    const result = await Swal.fire({
      title: "Send Invoice?",
      text: "This will send the invoice to the customer via email.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Send!",
    });

    if (result.isConfirmed) {
      try {
        await sendAccountingInvoice(id).unwrap();
        showAlert("Success", "Invoice sent successfully", "success");
        if (onSuccess) onSuccess();
      } catch (error: any) {
        showAlert("Error", error?.data?.message || "Failed to send invoice", "error");
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
    deleteReconciliationAction,
    isDeletingReconciliation,
    deleteBankTransactionAction,
    isDeletingBankTransaction,
    deleteAccountingBillAction,
    isDeletingBill,
    deleteAccountingSupplierAction,
    isDeletingSupplier,
    deleteAccountingExpenseAction,
    isDeletingAccountingExpense,
    deleteAccountingInvoiceAction,
    isDeletingInvoice,
    deleteAccountingCustomerAction,
    isDeletingCustomer,
    deleteAccountingBankAccountAction,
    isDeletingBankAccount,
    lockAccountingPeriodAction,
    isLockingPeriod,
    deleteAccountingPeriodAction,
    isDeletingAccountingPeriod,
    deleteAccountingAccountAction,
    isDeletingAccount,
    deleteAccountingVatAction,
    isDeletingVat,
    deleteAccountingPaymentAction,
    isDeletingAccountingPayment,
    sendAccountingInvoiceAction,
    isSendingAccountingInvoice
  };
};
