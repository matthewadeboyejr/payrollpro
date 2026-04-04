"use client";

import React from "react";
import { Form } from "react-final-form";
import { useCreateTaxRuleMutation, useUpdateTaxRuleMutation } from "@/services/api/constants/payroll.constant";
import { showAlert } from "@/components/ui/ShowAlert";
import Modal from "@/components/ui/Modal";
import TextInput from "@/components/ui/TextInput";

interface TaxRule {
    id: number;
    taxYearLabel: string;
    region: string;
    bandName: string;
    lowerBoundAnnual: number;
    upperBoundAnnual?: number;
    rate: number;
}

interface Props {
    rule?: TaxRule;
    onClose: () => void;
}

interface FormValues {
    taxYearLabel: string;
    region: string;
    bandName: string;
    lowerBoundAnnual: number | string;
    upperBoundAnnual?: number | string;
    rate: number | string;
}

const TaxRuleForm = ({ rule, onClose }: Props) => {
    const [createTaxRule, { isLoading: isCreating }] = useCreateTaxRuleMutation();
    const [updateTaxRule, { isLoading: isUpdating }] = useUpdateTaxRuleMutation();

    const onSubmit = async (values: FormValues) => {
        try {
            const payload = {
                id: rule?.id || 0, // Explicitly set ID for API compatibility
                taxYearLabel: values.taxYearLabel,
                region: values.region,
                bandName: values.bandName,
                lowerBoundAnnual: Number(values.lowerBoundAnnual),
                upperBoundAnnual: values.upperBoundAnnual ? Number(values.upperBoundAnnual) : 0,
                rate: Number(values.rate) / 100, // Convert percentage to decimal
            };

            if (rule?.id) {
                await updateTaxRule({ id: rule.id, data: payload }).unwrap();
                showAlert("Success", "Tax rule updated successfully", "success");
            } else {
                await createTaxRule(payload).unwrap();
                showAlert("Success", "Tax rule created successfully", "success");
            }
            onClose();
        } catch (error: unknown) {
            const err = error as { data?: { message?: string } };
            showAlert("Error", err?.data?.message || "Failed to save tax rule", "error");
        }
    };

    const validate = (values: FormValues) => {
        const errors: Record<string, string> = {};
        if (!values.taxYearLabel) errors.taxYearLabel = "Required";
        if (values.rate === undefined) errors.rate = "Required";
        if (!values.bandName) errors.bandName = "Required";
        return errors;
    };

    const initialValues = rule ? {
        ...rule,
        rate: rule.rate ? rule.rate * 100 : 0, // Convert decimal to percentage for input
    } : { lowerBoundAnnual: 0, region: "England" };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={initialValues}
            validate={validate}
            render={({ handleSubmit, submitting, form }) => (
                <Modal
                    onClose={onClose}
                    heading={rule ? "Edit Tax Rule" : "Add New Tax Rule"}
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
                                name="region"
                                label="Region"
                                placeholder="e.g. England, Scotland, Wales"
                                form={form}
                            />

                            <TextInput
                                name="bandName"
                                label="Band Name"
                                placeholder="e.g. Basic, Higher, Additional"
                                form={form}
                            />

                            <TextInput
                                name="rate"
                                type="number"
                                label="Tax Rate (%)"
                                placeholder="e.g. 20"
                                form={form}
                            />

                            <TextInput
                                name="lowerBoundAnnual"
                                type="number"
                                label="Lower Bound (£ Annual)"
                                placeholder="0"
                                form={form}
                            />

                            <TextInput
                                name="upperBoundAnnual"
                                type="number"
                                label="Upper Bound (£ Annual)"
                                placeholder="Limit (leave empty for infinity)"
                                form={form}
                            />
                        </div>
                    </form>
                </Modal>
            )}
        />
    );
};

export default TaxRuleForm;
