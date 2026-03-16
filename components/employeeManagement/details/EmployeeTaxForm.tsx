import React from "react";
import { Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import Checkbox from "@/components/ui/Checkbox";
import { useUpdateEmployeeTaxMutation } from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";

const EmployeeTaxForm = ({
  employeeId,
  initialData,
}: {
  employeeId: string;
  initialData?: Record<string, unknown>;
}) => {
  const [updateTax, { isLoading: isUpdating }] = useUpdateEmployeeTaxMutation();

  const formattedInitialData = React.useMemo(() => {
    if (!initialData) return {};
    const data = { ...initialData };
    if (data.previousEmployerLeavingDate) {
      data.previousEmployerLeavingDate = (data.previousEmployerLeavingDate as string).split("T")[0];
    }
    if (data.visaExpiryDate) {
      data.visaExpiryDate = (data.visaExpiryDate as string).split("T")[0];
    }
    return data;
  }, [initialData]);

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      const response = await updateTax({ employeeId, data: values }).unwrap();
      showAlert("Success", response?.message || "Tax details updated successfully", "success");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert("Error", err?.data?.message || err?.message || "Failed to update tax details", "error");
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={formattedInitialData}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="National Insurance Number"
              name="nationalInsuranceNumber"
              form={form}
            />
            <TextInput label="Tax Code" name="taxCode" form={form} />
            <TextInput label="NI Category" name="niCategory" form={form} />
            
            <div className="flex items-center gap-4 pt-6">
               <Checkbox label="Has P45" name="hasP45" form={form} />
            </div>

            <TextInput label="Previous Employer" name="previousEmployer" form={form} />
            <TextInput
              label="Previous Employer Leaving Date"
              name="previousEmployerLeavingDate"
              type="date"
              form={form}
            />
            <TextInput
              label="Previous Pay To Date"
              name="previousPayToDate"
              type="number"
              form={form}
            />
            <TextInput
              label="Previous Tax To Date"
              name="previousTaxToDate"
              type="number"
              form={form}
            />
            <TextInput label="Starter Statement" name="starterStatement" form={form} />
            
            <div className="flex flex-col gap-4 pt-2">
               <Checkbox label="Blind Person Allowance" name="blindPersonAllowance" form={form} />
               <Checkbox label="Marriage Allowance" name="marriageAllowance" form={form} />
               <Checkbox label="Has Student Loan" name="hasStudentLoan" form={form} />
            </div>

            <TextInput label="Student Loan Plan" name="studentLoanPlan" form={form} />
            
            <div className="flex items-center gap-4 pt-6">
               <Checkbox label="Has Postgraduate Loan" name="hasPostgraduateLoan" form={form} />
            </div>

            <TextInput label="Right to Work Status" name="rightToWorkStatus" form={form} />
            <TextInput label="Visa Type" name="visaType" form={form} />
            <TextInput label="Visa Number" name="visaNumber" form={form} />
            <TextInput
              label="Visa Expiry Date"
              name="visaExpiryDate"
              type="date"
              form={form}
            />
            <TextInput label="Share Code" name="shareCode" form={form} />
            <TextInput label="Work Restrictions" name="workRestrictions" form={form} />
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={submitting || isUpdating}
              className="primary-btn px-8"
            >
              {submitting || isUpdating ? "Saving..." : "Save Tax Details"}
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default EmployeeTaxForm;
