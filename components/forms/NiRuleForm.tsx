"use client";

import React from "react";
import { Form } from "react-final-form";
import { useCreateNiRuleMutation, useUpdateNiRuleMutation } from "@/services/api/constants/payroll.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import Modal from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";

interface NiRule {
    id: number;
    taxYearLabel: string;
    niCategory: string;
    primaryThresholdAnnual: number;
    upperEarningsLimitAnnual?: number;
    mainRate: number;
    upperRate: number;
}

interface Props {
    rule?: NiRule;
    onClose: () => void;
}

interface FormValues {
    taxYearLabel: string;
    niCategory: string;
    primaryThresholdAnnual: number | string;
    upperEarningsLimitAnnual?: number | string;
    mainRate: number | string;
    upperRate: number | string;
}

const NiRuleForm = ({ rule, onClose }: Props) => {
    const [createNiRule, { isLoading: isCreating }] = useCreateNiRuleMutation();
    const [updateNiRule, { isLoading: isUpdating }] = useUpdateNiRuleMutation();

    const onSubmit = async (values: FormValues) => {
        try {
            const payload = {
                id: rule?.id || 0, // Explicitly set ID for API compatibility
                taxYearLabel: values.taxYearLabel,
                niCategory: values.niCategory,
                primaryThresholdAnnual: Number(values.primaryThresholdAnnual),
                upperEarningsLimitAnnual: values.upperEarningsLimitAnnual ? Number(values.upperEarningsLimitAnnual) : 0,
                mainRate: Number(values.mainRate) / 100, // Convert percentage to decimal
                upperRate: Number(values.upperRate) / 100, // Convert percentage to decimal
            };

            if (rule?.id) {
                await updateNiRule({ id: rule.id, data: payload }).unwrap();
                showAlert("Success", "NI rule updated successfully", "success");
            } else {
                await createNiRule(payload).unwrap();
                showAlert("Success", "NI rule created successfully", "success");
            }
            onClose();
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            showAlert("Error", err?.data?.message || "Failed to save NI rule", "error");
        }
    };

    const validate = (values: FormValues) => {
        const errors: Record<string, string> = {};
        if (!values.taxYearLabel) errors.taxYearLabel = "Required";
        if (!values.niCategory) errors.niCategory = "Required";
        if (values.mainRate === undefined) errors.mainRate = "Required";
        if (values.upperRate === undefined) errors.upperRate = "Required";
        return errors;
    };

    const initialValues = rule ? {
        ...rule,
        mainRate: rule.mainRate ? rule.mainRate * 100 : 0, // Convert decimal to percentage for input
        upperRate: rule.upperRate ? rule.upperRate * 100 : 0, // Convert decimal to percentage for input
    } : { primaryThresholdAnnual: 0, niCategory: "A" };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit, submitting, form }) => (
                <Modal
                    onClose={onClose}
                    heading={rule ? "Edit NI Rule" : "Add New NI Rule"}
                    size="lg"
                    onSubmit={handleSubmit}
                    isSubmitting={submitting || isCreating || isUpdating}
                    submitBtnText={rule ? "Update Rule" : "Create Rule"}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                            <TextInput
                                name="taxYearLabel"
                                label="Tax Year"
                                placeholder="e.g. 2026/27"
                                form={form}
                            />

                            <TextInput
                                name="niCategory"
                                label="NI Category"
                                placeholder="e.g. A, B, C, H, J, M, V, Z"
                                form={form}
                            />

                            <TextInput
                                name="primaryThresholdAnnual"
                                type="number"
                                label="PT (Annual £)"
                                placeholder="0"
                                form={form}
                            />

                            <TextInput
                                name="upperEarningsLimitAnnual"
                                type="number"
                                label="UEL (Annual £)"
                                placeholder="Threshold limit (leave empty for infinity)"
                                form={form}
                            />

                            <TextInput
                                name="mainRate"
                                type="number"
                                label="Main Rate (%)"
                                placeholder="e.g. 8"
                                form={form}
                            />

                            <TextInput
                                name="upperRate"
                                type="number"
                                label="Upper Rate (%)"
                                placeholder="e.g. 2"
                                form={form}
                            />
                        </div>
                    </form>
                </Modal>
            )}
        />
    );
};

export default NiRuleForm;
