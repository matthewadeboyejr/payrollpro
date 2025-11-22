import { showAlert } from "@/components/ui/ShowAlert";
import { useDeactivateUserMutation } from "@/services/api/constants/auth.constant";
import { useDeactivateemployeeMutation } from "@/services/api/constants/employee.constant";
import { useRejectLeaveRequestMutation } from "@/services/api/constants/Leave.constant";
import Swal from "sweetalert2";

export const useAction = () => {
  const [deactivateUser, { isLoading: isDeactivating }] =
    useDeactivateUserMutation();

  const [deactivateemployee, { isLoading: isDeactivatingEmployee }] =
    useDeactivateemployeeMutation();

  const deactivate = async (userId: string) => {
    if (!userId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Deactivate Staff?",
      text: "This action will Temporally prevent access to this account without deleting it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate!",
    });

    if (result.isConfirmed) {
      try {
        await deactivateUser(userId).unwrap();
        showAlert("Success", "User Deactivated", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Deactivate user",
          "error"
        );
      }
    }
  };
  const deactivateEmployee = async (employeeId: string) => {
    if (!employeeId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Deactivate Employee?",
      text: "This action will Temporally prevent access to this employee without deleting it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deactivate!",
    });

    if (result.isConfirmed) {
      try {
        await deactivateemployee(employeeId).unwrap();
        showAlert("Success", "Employee Deactivated", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message ||
            error?.message ||
            "Failed to Deactivate employee",
          "error"
        );
      }
    }
  };

  return {
    deactivate,
    isDeactivating,
    deactivateEmployee,
    isDeactivatingEmployee,
  };
};
