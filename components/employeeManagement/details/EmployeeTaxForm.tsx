import React from "react";
import { Field, Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import Checkbox from "@/components/ui/Checkbox";
import SelectInput from "@/components/ui/SelectInput";
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
      const data = { ...values };
      if (data.previousEmployerLeavingDate) {
        data.previousEmployerLeavingDate = new Date(data.previousEmployerLeavingDate as string).toISOString();
      }
      if (data.visaExpiryDate) {
        data.visaExpiryDate = new Date(data.visaExpiryDate as string).toISOString();
      }
      const response = await updateTax({ employeeId, data }).unwrap();
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
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className=" border border-blue-50 rounded-md p-5 space-y-2">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                P45 from Previous Employment
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Do you have a P45 from your previous employer?
              </p>
              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <Field
                    name="hasP45"
                    component="input"
                    type="radio"
                    value="true"
                    parse={(val: string) => val === "true"}
                    format={(val: boolean) => val?.toString()}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                    Yes
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <Field
                    name="hasP45"
                    component="input"
                    type="radio"
                    value="false"
                    parse={(val: string) => val === "true"}
                    format={(val: boolean) => val?.toString()}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                    No
                  </span>
                </label>
              </div>


              {values?.hasP45 === true && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800 space-y-4">
                  <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 mb-2">
                    <span className="font-semibold px-2 py-0.5 bg-blue-100 dark:bg-blue-800 rounded text-xs uppercase tracking-wider">
                      P45 Details
                    </span>
                  </div>
                  <TextInput
                    label="Previous Employer Name"
                    name="previousEmployer"
                    form={form}
                    placeholder="Enter previous employer's name"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="Leaving Date"
                      name="previousEmployerLeavingDate"
                      form={form}
                      type="date"
                    />
                    <TextInput
                      label="Tax Code from P45"
                      name="taxCode"
                      form={form}
                      placeholder="e.g. 1257L"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInput
                      label="Total Pay to Date (£)"
                      name="previousPayToDate"
                      form={form}
                      type="number"
                      placeholder="0.00"
                    />
                    <TextInput
                      label="Total Tax to Date (£)"
                      name="previousTaxToDate"
                      form={form}
                      type="number"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              )}

              {values?.hasP45 === false && (
                <div className="space-y-4">
                  <div className="bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 p-4 rounded-r-md">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      As you don&apos;t have a P45, please select the statement that
                      applies to you. This determines your initial tax code.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Starter Checklist Statement <span className="text-red-500">*</span>
                    </h3>

                    <div className="space-y-4">
                      {[
                        {
                          id: "Statement A",
                          label: "Statement A",
                          desc: "This is my first job since last 6 April and I have not been receiving taxable Jobseeker's Allowance, Employment and Support Allowance, taxable Incapacity Benefit, State Pension or Occupational Pension",
                        },
                        {
                          id: "Statement B",
                          label: "Statement B",
                          desc: "This is now my only job but since last 6 April I have had another job, or have received taxable Jobseeker's Allowance, Employment and Support Allowance or taxable Incapacity Benefit. I do not receive a State or Occupational Pension",
                        },
                        {
                          id: "Statement C",
                          label: "Statement C",
                          desc: "I have another job or receive a State or Occupational Pension",
                        },
                      ].map((statement) => (
                        <label
                          key={statement.id}
                          className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                        >
                          <Field
                            name="starterStatement"
                            component="input"
                            type="radio"
                            value={statement.id}
                            className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-gray-900 dark:text-gray-100 mr-1">
                              {statement.label}:
                            </span>
                            <span className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {statement.desc}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Tax Allowances and Reliefs */}
          <div className=" border border-blue-50 rounded-md p-5 space-y-2">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Tax Allowances and Reliefs
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you eligible for any of the following? (Select all that apply)
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <Checkbox
                label="Blind Person Allowance"
                name="blindPersonAllowance"
                form={form}
              />
              <Checkbox
                label="Marriage Allowance (transferring to/from spouse)"
                name="marriageAllowance"
                form={form}
              />

            </div>
          </div>
          {/* Student Loan Deductions */}
          <div className=" border border-blue-50 rounded-md p-5 space-y-2">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">
                Student Loan Deductions
              </h2>
              <div className="bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 p-4 rounded-r-md">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  If you have a student or postgraduate loan, we are legally required to deduct repayments from your salary when you earn above the threshold.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex gap-6 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <Field
                    name="hasStudentLoan"
                    component="input"
                    type="radio"
                    value="true"
                    parse={(val: string) => val === "true"}
                    format={(val: boolean) => val?.toString()}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                    Yes
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <Field
                    name="hasStudentLoan"
                    component="input"
                    type="radio"
                    value="false"
                    parse={(val: string) => val === "true"}
                    format={(val: boolean) => val?.toString()}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                    No
                  </span>
                </label>
              </div>

              {values?.hasStudentLoan === true && (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 space-y-6">
                  <div>
                    <SelectInput
                      label="Student Loan Plan Type"
                      name="studentLoanPlan"
                      form={form}
                      options={[
                        { value: "Plan 1", label: "Plan 1 (Started before Sept 2012, or Scottish student)" },
                        { value: "Plan 2", label: "Plan 2 (Started between Sept 2012 and July 2023 in England/Wales)" },
                        { value: "Plan 4", label: "Plan 4 (Scottish student who started after Sept 1998)" },
                        { value: "Plan 5", label: "Plan 5 (Started on or after 1 Aug 2023 in England)" },
                      ]}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Current thresholds: Plan 1 (£24,990), Plan 2 (£27,295), Plan 4 (£31,395), Plan 5 (£25,000)
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-800 dark:text-gray-100">
                      Do you have a Postgraduate Loan? <span className="text-red-500">*</span>
                    </h3>
                    <div className="flex gap-6 mb-2">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <Field
                          name="hasPostgraduateLoan"
                          component="input"
                          type="radio"
                          value="true"
                          parse={(val: string) => val === "true"}
                          format={(val: boolean) => val?.toString()}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                          Yes
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <Field
                          name="hasPostgraduateLoan"
                          component="input"
                          type="radio"
                          value="false"
                          parse={(val: string) => val === "true"}
                          format={(val: boolean) => val?.toString()}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                          No
                        </span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Postgraduate loan threshold: £21,000. Can be deducted alongside undergraduate loan.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* National Insurance and Right to Work */}
          <div className=" border border-blue-50 rounded-md p-5 space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <TextInput
                label="National Insurance Number"
                name="nationalInsuranceNumber"
                form={form}
                placeholder="e.g. QQ 12 34 56 C"
              />
              <SelectInput
                label="NI Category"
                name="niCategory"
                form={form}
                options={[
                  { value: "A", label: "A - Standard Rate" },
                  { value: "B", label: "B - Married Women/Widows (Reduced Rate)" },
                  { value: "C", label: "C - Over State Pension Age" },
                  { value: "H", label: "H - Apprentices Under 25" },
                  { value: "J", label: "J - Deferment" },
                  { value: "M", label: "M - Under 21" },
                  { value: "V", label: "V - Veterans" },
                  { value: "X", label: "X - No NI Contributions" },
                  { value: "Z", label: "Z - Under 21 Deferment" },
                ]}
              />


              <SelectInput
                label="Right to Work Status"
                name="rightToWorkStatus"
                form={form}
                options={[
                  { value: "British Citizen", label: "British Citizen" },
                  { value: "Irish Citizen", label: "Irish Citizen" },
                  { value: "Settled Status", label: "Settled Status (ILR)" },
                  { value: "Pre-Settled Status", label: "Pre-Settled Status" },
                  { value: "Skilled Worker Visa", label: "Skilled Worker Visa" },
                  { value: "Student Visa", label: "Student Visa" },
                  { value: "Graduate Visa", label: "Graduate Visa" },
                  { value: "Family Visa", label: "Family Visa" },
                  { value: "Other", label: "Other Time-Limited Leave" },
                ]}
              />
              <SelectInput
                label="Visa Type"
                name="visaType"
                form={form}
                options={[
                  { value: "Skilled Worker", label: "Skilled Worker Visa" },
                  { value: "Health and Care", label: "Health and Care Worker Visa" },
                  { value: "Student", label: "Student Visa" },
                  { value: "Graduate", label: "Graduate Visa" },
                  { value: "Family", label: "Family Visa (Spouse/Partner)" },
                  { value: "Youth Mobility", label: "Youth Mobility Scheme" },
                  { value: "Global Talent", label: "Global Talent Visa" },
                  { value: "UK Ancestry", label: "UK Ancestry Visa" },
                  { value: "HPI", label: "High Potential Individual (HPI)" },
                  { value: "BNO", label: "British National (Overseas)" },
                  { value: "Frontier Worker", label: "Frontier Worker Permit" },
                  { value: "Other", label: "Other" },
                  { value: "N/A", label: "Not Applicable (UK/Irish Citizen)" },
                ]}
              />
              <TextInput label="Visa Number" name="visaNumber" form={form} />
              <TextInput
                label="Visa Expiry Date"
                name="visaExpiryDate"
                type="date"
                form={form}
              />
              <TextInput label="Share Code" name="shareCode" form={form} />
              <SelectInput
                label="Work Restrictions"
                name="workRestrictions"
                form={form}
                options={[
                  { value: "None", label: "No Restrictions" },
                  { value: "20hrs Term Time", label: "Limited to 20 hours/week (Term Time)" },
                  { value: "10hrs Term Time", label: "Limited to 10 hours/week (Term Time)" },
                  { value: "No Public Funds", label: "No Public Funds" },
                  { value: "Specified Employer", label: "Specified Employer Only" },
                  { value: "No Work", label: "No Work Permitted" },
                ]}
              />
            </div>
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
