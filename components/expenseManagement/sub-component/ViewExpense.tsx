
import React from "react";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { ExpenseDetails } from "./ExpenseDetails";

interface ViewExpenseProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const ViewExpense = ({ data }: ViewExpenseProps) => {
    const { setIsModalOpen } = useModal();

    return (

        <Modal
            size={"2xl"}
            heading={"View Expense Details"}
            onClose={() => setIsModalOpen(null)}
            submitBtnText="Close"
            showCancelBtn={false}
            onSubmit={() => setIsModalOpen(null)}
        >
            <ExpenseDetails
                title={data.description || "No Description"}
                employee={data.employeeName || "Unknown"}
                category={data.categoryName}
                amount={`£${data.amount}`}
                date={new Date(data.createdAt).toLocaleDateString()}
                employeeId={data.employeeId}
                receipt={data.receipt || "N/A"}
            />
        </Modal >
    );
};

export default ViewExpense;
