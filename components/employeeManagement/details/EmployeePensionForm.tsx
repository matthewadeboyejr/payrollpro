import React from "react";
import { Field, Form } from "react-final-form";
import TextInput from "@/components/ui/TextInput";
import SelectInput from "@/components/ui/SelectInput";
import TextareaInput from "@/components/ui/TextareaInput";
import Checkbox from "@/components/ui/Checkbox";
import { useUpdateEmployeePensionMutation } from "@/services/api/constants/employee.constant";
import { showAlert } from "@/components/ui/ShowAlert";

const EmployeePensionForm = ({
  employeeId,
  initialData,
}: {
  employeeId: string;
  initialData?: Record<string, unknown>;
}) => {
  const [updatePension, { isLoading: isUpdating }] = useUpdateEmployeePensionMutation();

  const onSubmit = async (values: Record<string, unknown>) => {
    try {
      // Explicitly construct the request body to match the required schema
      const requestBody = {
        pensionScheme: (values.pensionScheme as string) || "",
        contributionPercent: Number(values.contributionPercent) || 0,
        contributionMethod: (values.contributionMethod as string) || "",
        optedOut: values.optedOut === "true",
        optOutReason: (values.optOutReason as string) || "",
        pensionReference: (values.pensionReference as string) || "",
        isAutoEnrolled: Boolean(values.isAutoEnrolled),
        isEligibleForAutoEnrolment: Boolean(values.isEligibleForAutoEnrolment),
      };

      const response = await updatePension({
        employeeId,
        data: requestBody,
      }).unwrap();
      showAlert(
        "Success",
        response?.message || "Pension details updated successfully",
        "success"
      );
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      showAlert(
        "Error",
        err?.data?.message || err?.message || "Failed to update pension details",
        "error"
      );
    }
  };

  const pensionSchemes = [
    { value: "NEST", label: "NEST" },
    { value: "The Peoples Pension", label: "The People's Pension" },
    { value: "Smart Pension", label: "Smart Pension" },
    { value: "Aviva", label: "Aviva" },
    { value: "Standard Life", label: "Standard Life" },
    { value: "Scottish Widows", label: "Scottish Widows" },
    { value: "Other", label: "Other" },
  ];

  const contributionPercentages: { value: string; label: string }[] = [
    { value: "5", label: "5% (Legal Minimum)" },
    { value: "6", label: "6%" },
    { value: "7", label: "7%" },
    { value: "8", label: "8%" },
    { value: "9", label: "9%" },
    { value: "10", label: "10%" },
    { value: "12", label: "12%" },
    { value: "15", label: "15%" },
  ];

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialData}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border border-blue-50 rounded-md p-5 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100 border-b-2 border-blue-500 pb-1 inline-block">
                6. Workplace Pension Auto-Enrolment
              </h2>

              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Under UK law, we must automatically enrol eligible employees into a workplace pension scheme.
                  You are eligible if you&apos;re aged 22 to State Pension age and earn over £10,000 per year.
                </p>
              </div>

              <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r-md">
                <h3 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">
                  Minimum Contributions (2024/25):
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
                  <li>Total minimum: 8% of qualifying earnings (£6,240 - £50,270)</li>
                  <li>Employer contribution: minimum 3%</li>
                  <li>Employee contribution: minimum 5%</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700 rounded-lg p-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Pension Scheme Details
              </h3>

              {/* Status Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Checkbox
                  label="Is Eligible for Auto-Enrolment"
                  name="isEligibleForAutoEnrolment"
                  form={form}
                />
                <Checkbox
                  label="Currently Auto-Enrolled"
                  name="isAutoEnrolled"
                  form={form}
                />
              </div>

              <div className="space-y-6 pt-2">
                <SelectInput
                  label={<>Pension Scheme <span className="text-red-500">*</span></>}
                  name="pensionScheme"
                  form={form}
                  options={pensionSchemes}
                />

                <SelectInput
                  label={<>Your Contribution Percentage <span className="text-red-500">*</span></>}
                  name="contributionPercent"
                  form={form}
                  options={contributionPercentages}
                  desc="Higher contributions receive tax relief and may be matched by employer"
                />

                <div className="space-y-3">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Contribution Method <span className="text-red-500">*</span>
                  </span>
                  <div className="flex gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Field
                        name="contributionMethod"
                        component="input"
                        type="radio"
                        value="RAS"
                        className="w-4 h-4 text-accent border-gray-300 pointer-events-auto"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Relief at Source (RAS)
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Field
                        name="contributionMethod"
                        component="input"
                        type="radio"
                        value="Net Pay"
                        className="w-4 h-4 text-accent border-gray-300 pointer-events-auto"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Net Pay Arrangement
                      </span>
                    </label>
                  </div>
                  <p className="text-[12px] text-gray-500">
                    Most common is Relief at Source. Your HR team will advise if different.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Do you wish to opt out of auto-enrolment?
                  </span>
                  <div className="flex gap-6 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Field
                        name="optedOut"
                        component="input"
                        type="radio"
                        value="true"
                        className="w-4 h-4 text-accent border-gray-300 pointer-events-auto"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Yes, I wish to opt out
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Field
                        name="optedOut"
                        component="input"
                        type="radio"
                        value="false"
                        className="w-4 h-4 text-accent border-gray-300 pointer-events-auto"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        No, I want to remain enrolled
                      </span>
                    </label>
                  </div>
                </div>

                {values?.optedOut === "true" && (
                  <TextareaInput
                    label="Reason for Opting Out"
                    name="optOutReason"
                    form={form}
                    placeholder="Briefly explain why you are opting out..."
                    desc="Required for administrative records"
                  />
                )}

                <TextInput
                  label="Existing Pension Reference Number (if applicable)"
                  name="pensionReference"
                  form={form}
                  desc="Only required if you have an existing scheme membership"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-100 dark:border-gray-700">
            <button
              type="submit"
              disabled={submitting || isUpdating}
              className="primary-btn px-8"
            >
              {submitting || isUpdating ? "Saving..." : "Save Pension Details"}
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default EmployeePensionForm;
