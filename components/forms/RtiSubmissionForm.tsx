"use client";

import React from "react";
import { Form } from "react-final-form";
import { useGeneratePayrollRtiMutation } from "@/services/api/constants/payroll.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import Modal from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";

interface Props {
    payrollRunId: number;
    onClose: () => void;
}

interface FormValues {
    submissionType: string;
    payloadJson: string;
}

const RtiSubmissionForm = ({ payrollRunId, onClose }: Props) => {
    const [generateRti, { isLoading }] = useGeneratePayrollRtiMutation();

    const onSubmit = async (values: FormValues) => {
        try {
            await generateRti({
                payrollRunId,
                data: {
                    submissionType: values.submissionType,
                    payloadJson: values.payloadJson,
                },
            }).unwrap();
            showAlert("Success", "RTI submission generated successfully", "success");
            onClose();
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            showAlert("Error", err?.data?.message || "Failed to generate RTI", "error");
        }
    };

    const validate = (values: FormValues) => {
        const errors: Record<string, string> = {};
        if (!values.submissionType) errors.submissionType = "Required";
        if (!values.payloadJson) errors.payloadJson = "Required";
        return errors;
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{ submissionType: "FPS" }}
            validate={validate}
            render={({ handleSubmit, submitting, form }) => (
                <Modal
                    onClose={onClose}
                    heading={`Generate RTI for Run #${payrollRunId}`}
                    size="lg"
                    onSubmit={handleSubmit}
                    isSubmitting={submitting || isLoading}
                    submitBtnText="Submit to HMRC"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <TextInput
                                name="submissionType"
                                label="Submission Type"
                                placeholder="e.g. FPS, EPS"
                                form={form}
                            />

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Payload JSON
                                </label>
                                <textarea
                                    name="payloadJson"
                                    className="w-full h-48 p-3 text-sm font-mono border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder='{ "reportingPeriod": "2024-03", ... }'
                                    onChange={(e) => form.change("payloadJson", e.target.value)}
                                />
                                {form.getState().submitFailed && form.getState().errors?.payloadJson && (
                                    <span className="text-red-500 text-xs">{form.getState().errors?.payloadJson}</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
                            <p className="text-[11px] text-blue-700 dark:text-blue-300 leading-relaxed italic">
                                <strong>Note:</strong> Ensure the JSON payload is formatted correctly. This will be sent directly to the HMRC Gateway.
                            </p>
                        </div>
                    </form>
                </Modal>
            )}
        />
    );
};

export default RtiSubmissionForm;
