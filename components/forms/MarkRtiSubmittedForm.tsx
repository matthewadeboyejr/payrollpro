"use client";

import React from "react";
import { Form } from "react-final-form";
import { useMarkRtiAsSubmittedMutation } from "@/services/api/constants/payroll.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import Modal from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";

interface Props {
    id: number;
    onClose: () => void;
}

interface FormValues {
    hmrcSubmissionId: string;
    isSuccess: boolean | string;
    responseMessage?: string;
}

const MarkRtiSubmittedForm = ({ id, onClose }: Props) => {
    const [markSubmitted, { isLoading }] = useMarkRtiAsSubmittedMutation();

    const onSubmit = async (values: FormValues) => {
        try {
            await markSubmitted({
                id,
                data: {
                    hmrcSubmissionId: values.hmrcSubmissionId,
                    responseMessage: values.responseMessage,
                    isSuccess: values.isSuccess === "true" || !!values.isSuccess,
                },
            }).unwrap();
            showAlert("Success", "RTI record marked as submitted", "success");
            onClose();
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            showAlert("Error", err?.data?.message || "Failed to update RTI status", "error");
        }
    };

    const validate = (values: FormValues) => {
        const errors: Record<string, string> = {};
        if (!values.hmrcSubmissionId) errors.hmrcSubmissionId = "Required";
        return errors;
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{ isSuccess: true }}
            validate={validate}
            render={({ handleSubmit, submitting, form }) => (
                <Modal
                    onClose={onClose}
                    heading="Mark RTI as Submitted"
                    size="lg"
                    onSubmit={handleSubmit}
                    isSubmitting={submitting || isLoading}
                    submitBtnText="Confirm Submission"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                            <TextInput
                                name="hmrcSubmissionId"
                                label="HMRC Submission ID"
                                placeholder="e.g. HMRC-12345678"
                                form={form}
                            />

                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    Status
                                </label>
                                <select
                                    name="isSuccess"
                                    className="w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500 outline-none"
                                    onChange={(e) => form.change("isSuccess", e.target.value === "true")}
                                >
                                    <option value="true">Success</option>
                                    <option value="false">Failed</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                Response Message
                            </label>
                            <textarea
                                name="responseMessage"
                                className="w-full h-24 p-3 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Response from gateway (e.g. Successfully accepted by HMRC)"
                                onChange={(e) => form.change("responseMessage", e.target.value)}
                            />
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                            <p className="text-[11px] text-amber-700 dark:text-amber-300 leading-relaxed italic">
                                <strong>Warning:</strong> Use this only for manual overrides or to acknowledge submissions handled outside this platform.
                            </p>
                        </div>
                    </form>
                </Modal>
            )}
        />
    );
};

export default MarkRtiSubmittedForm;
