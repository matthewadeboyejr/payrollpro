import Modal from "@/components/ui/Modal";
import React from "react";
import { useModal } from "@/context/ModalContext";
import { useGetUserByIdQuery } from "@/services/api/constants/auth.constant";

import ViewSkeleton from "@/components/ui/ViewSkeleton";

const ViewSalaryBand = ({
  selectedSalaryBandId,
}: {
  selectedSalaryBandId: string;
}) => {
  const { setIsModalOpen } = useModal();

  const { data: salaryBandData, isLoading: isLoadingSalaryBandData } =
    useGetSalaryBandByIdQuery(selectedSalaryBandId, {
      skip: !selectedSalaryBandId,
    });
  const salaryBandDetails = salaryBandData?.data;

  console.log("salaryBandDetails", salaryBandDetails);

  return (
    <Modal
      size={"2xl"}
      heading={
        isLoadingSalaryBandData
          ? " loading User Details"
          : userDetails?.firstName + " " + userDetails?.lastName
      }
      desc={"View a user details"}
      onClose={() => setIsModalOpen(null)}
      showSubmitBtn={false}
    >
      {isLoadingUserData ? (
        <ViewSkeleton />
      ) : (
        <div className="grid  md:grid-cols-2 grid-cols-2 gap-4 text-sm ">
          <div className="flex flex-col gap-2">
            <h2 className="text-xs text-gray-500">First Name</h2>
            <p className="font-medium">{userDetails?.firstName}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs text-gray-500">Last Name</h2>
            <p className="font-medium">{userDetails?.lastName}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs text-gray-500">Email</h2>
            <p className="font-medium">{userDetails?.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs text-gray-500">Phone Number</h2>
            <p className="font-medium">{userDetails?.phoneNumber}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xs text-gray-500">Roles</h2>
            <ul className="flex flex-col gap-2 items-start">
              {userDetails?.roles?.map((role: string) => (
                <li
                  key={role}
                  className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md whitespace-nowrap"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ViewSalaryBand;
