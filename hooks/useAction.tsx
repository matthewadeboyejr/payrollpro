import { showAlert } from "@/components/ui/ShowAlert";
import { useDeactivateUserMutation } from "@/services/api/constants/auth.constant";
import { useDeactivateemployeeMutation } from "@/services/api/constants/employee.constant";
//import { useRejectLeaveRequestMutation } from "@/services/api/constants/Leave.constant";
import { useDeactivateSalaryBandMutation } from "@/services/api/constants/setting.constant";
import { useDeleteRotaMutation, useDeleteShiftMutation } from "@/services/api/constants/shift.constant";
import Swal from "sweetalert2";

export const useAction = () => {
  const [deactivateUser, { isLoading: isDeactivating }] =
    useDeactivateUserMutation();
  const [deactivateemployee, { isLoading: isDeactivatingEmployee }] =
    useDeactivateemployeeMutation();
  const [deactivateSalaryBand, { isLoading: isDeletingSalaryBand }] =
    useDeactivateSalaryBandMutation();
  const [deleteRota, { isLoading: isDeletingRota }] = useDeleteRotaMutation();
  const [deleteShift, { isLoading: isDeletingShift }] = useDeleteShiftMutation();
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

  const deleteSalaryBand = async (salaryBandId: string) => {
    if (!salaryBandId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Salary Band?",
      text: "This action will permanently delete this salary band!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deactivateSalaryBand(salaryBandId).unwrap();
        showAlert("Success", "Salary Band Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message ||
          error?.message ||
          "Failed to Delete salary band",
          "error"
        );
      }
    }
  };
  const deleteRotaAction = async (rotaId: string) => {
    if (!rotaId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Rota?",
      text: "This action will permanently delete this rota!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRota(rotaId).unwrap();
        showAlert("Success", "Rota Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete rota",
          "error"
        );
      }
    }
  };

  const deleteShiftAction = async (shiftId: string) => {
    if (!shiftId) {
      console.error("Invalid rowData: Missing ID");
      return;
    }

    const result = await Swal.fire({
      title: "Delete  Shift?",
      text: "This action will permanently delete this shift!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#bd5a00",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      try {
        await deleteShift(shiftId).unwrap();
        showAlert("Success", "Shift Deleted", "success");
      } catch (error: any) {
        console.error("Reset Failed:", error);
        showAlert(
          "Error",
          error?.data?.message || error?.message || "Failed to Delete shift",
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
    deleteSalaryBand,
    isDeletingSalaryBand,
    deleteRotaAction,
    isDeletingRota,
    deleteShiftAction,
    isDeletingShift,
  };
};
