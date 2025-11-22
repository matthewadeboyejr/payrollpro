import {
  useGetDepartmentsQuery,
  useGetLeaveTypeQuery,
  useGetPositionsQuery,
  useGetRolesQuery,
} from "@/services/api/constants/data.constant";

const useConstantData = () => {
  const { data: roles } = useGetRolesQuery(undefined);
  const { data: departments } = useGetDepartmentsQuery(undefined);
  const { data: positions } = useGetPositionsQuery(undefined);
  const { data: leaveType } = useGetLeaveTypeQuery(undefined);

  const roleOptions = roles?.data?.map((role: any) => ({
    value: role.id,
    label: role.name,
  }));

  const departmentOptions = departments?.data?.map((department: any) => ({
    value: department.id,
    label: department.name,
  }));

  const positionOptions = positions?.data?.map((position: any) => ({
    value: position.id,
    label: position.name,
  }));
  const leaveTypeOptions = leaveType?.data?.map((leaveType: any) => ({
    value: leaveType.id,
    label: leaveType.leaveTypeName,
  }));

  const statuses = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ] as { value: string; label: string }[];

  return {
    roleOptions,
    departmentOptions,
    positionOptions,
    leaveTypeOptions,
    statuses,
  };
};

export default useConstantData;
