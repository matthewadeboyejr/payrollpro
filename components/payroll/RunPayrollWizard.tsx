import React, { useId } from "react";
import Modal from "../ui/Modal";
import { Form } from "react-final-form";
import ProcessPayrollForm from "../forms/ProcessPayrollForm";
import { useRunPayrollMutation } from "@/services/api/constants/payroll.constant";
import { showAlert } from "../ui/ShowAlert";
import { RunPayrollFormValues } from "../types/formFields";

interface RunPayrollWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const RunPayrollWizard = ({ isOpen, onClose, onSuccess }: RunPayrollWizardProps) => {
  const [runPayroll, { isLoading: submitting }] = useRunPayrollMutation();
  const formId = useId();

  const onSubmit = async (values: RunPayrollFormValues) => {
    try {
      const data = {
        ...values,
        year: Number(values.year),
        month: Number(values.month),
        departmentId: Number(values.departmentId || 0),
        taxRate: Number(values.taxRate || 0),
        pensionRate: Number(values.pensionRate || 0),
        otherDeductionRate: Number(values.otherDeductionRate || 0),
        taxYearStartYear: Number(values.taxYearStartYear || 0),
        taxPeriodNumber: Number(values.taxPeriodNumber || 0),
      };

      await runPayroll(data).unwrap();
      showAlert("Success", "Payroll run initiated successfully", "success");
      onSuccess();
      onClose();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert("Error", err?.data?.message || "Failed to process payroll", "error");
    }
  };

  const validate = (values: RunPayrollFormValues) => {
    const errors: Record<string, string> = {};
    if (!values.year) errors.year = "Pick a year";
    if (!values.month) errors.month = "Pick a month";
    if (!values.currency) errors.currency = "Select a currency";
    return errors;
  };

  if (!isOpen) return null;

  return (
    <Modal
      size="2xl"
      heading="Process New Payroll Run"
      desc="Initiate a new payroll processing task."
      submitBtnText="Run Selection"
      isSubmitting={submitting}
      formId={formId}
      onClose={onClose}
    >
      <Form<RunPayrollFormValues>
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          currency: "GBP",
          useUkProgressiveTax: true,
          includeEmployeeNationalInsurance: true,
          useTaxPeriods: true,
          taxRegion: "UK",
        }}
        render={({ handleSubmit, form, submitting }) => (
          <form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <ProcessPayrollForm
              handleSubmit={handleSubmit}
              form={form}
              submitting={submitting}
            />
          </form>
        )}
      />
    </Modal>
  );
};

export default RunPayrollWizard;
