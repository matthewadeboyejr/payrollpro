
import React from "react";
import Modal from "@/components/ui/Modal";
import { useModal } from "@/context/ModalContext";
import { ExpenseDetails } from "../../expenseManagement/sub-component/ExpenseDetails"; // Reusing ExpenseDetails for consistency

interface ViewIncomeProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const ViewIncome = ({ data }: ViewIncomeProps) => {
    const { setIsModalOpen } = useModal();

    return (

        <Modal
            size={"2xl"}
            heading={"View Income Details"}
            onClose={() => setIsModalOpen(null)}
            submitBtnText="Close"
            showCancelBtn={false}
            onSubmit={() => setIsModalOpen(null)}
        >
            <ExpenseDetails
                title={data.description || "No Description"}
                employee={data.source || "Unknown Source"}
                category={data.categoryName || "Uncategorized"}
                amount={`£${data.amount}`}
                date={new Date(data.incomeDate || data.date).toLocaleDateString()}
                employeeId={data.employeeId || "N/A"}
                receipt={"N/A"} // Income doesn't typically have a receipt
            />
        </Modal >
    );
};

export default ViewIncome;
