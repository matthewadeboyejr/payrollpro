import React, { useState, useEffect, useRef, useMemo } from "react";
import TextInput from "../ui/TextInput";
import {
  AddNewEmployeeFormProps,
  AddNewEmployeeFormValues,
} from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import useConstantData from "@/hooks/useConstantData";
import { FormApi } from "final-form";
import { FormRenderProps } from "react-final-form";

import {
  useGetEmploymentTypesQuery,
  useGetGradeLevelsQuery,
  useGetWorkScheduleTypesQuery,
  useLazyGetSalaryBandsByGradeLevelIdQuery,
} from "@/services/api/constants/employee.constant";

interface AddNewEmployeeFormComponentProps extends AddNewEmployeeFormProps {
  step: "basic-info" | "salary-info";
}

const AddNewEmployeeForm = ({
  step,
  form,
  handleSubmit,
}: AddNewEmployeeFormComponentProps) => {
  const [gradeLevelId, setGradeLevelId] = useState<string | undefined>(
    undefined
  );
  const { departmentOptions, positionOptions } = useConstantData();
  const { data: employmentTypes } = useGetEmploymentTypesQuery(undefined);
  const { data: workScheduleTypes } = useGetWorkScheduleTypesQuery(undefined);
  const workScheduleTypeOptions = workScheduleTypes?.map(
    (workScheduleType: any) => ({
      value: workScheduleType?.id,
      label: workScheduleType?.name,
    })
  );
  const employmentTypeOptions = employmentTypes?.map((employmentType: any) => ({
    value: employmentType?.id,
    label: employmentType?.name,
  }));
  const { data: gradeLevels } = useGetGradeLevelsQuery(undefined);
  const gradeLevelOptions = gradeLevels?.map((gradeLevel: any) => ({
    value: gradeLevel?.id,
    label: gradeLevel?.name,
  }));
  const [
    getSalaryBandsByGradeLevelId,
    { data: salaryBands, error, isLoading },
  ] = useLazyGetSalaryBandsByGradeLevelIdQuery();
  const salaryBandOptions = useMemo(() => {
    return salaryBands?.data?.map((salaryBand: any) => ({
      value: salaryBand?.id,
      label: salaryBand?.code,
    }));
  }, [salaryBands]);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === "basic-info" ? (
          <>
            {/* <h2 className="text-xl font-bold mb-2">Basic Information</h2> */}
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="John Doe"
                form={form}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
                form={form}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                label="Email"
                name="email"
                type="text"
                placeholder="john.doe@example.com"
                form={form}
              />

              <TextInput
                label="Phone"
                name="phone"
                type="text"
                placeholder="07700900123"
                form={form}
              />
            </div>

            <div className="flex items-center gap-4">
              <TextInput
                label="Start Date"
                name="startDate"
                type="date"
                placeholder="2021-01-01"
                form={form}
              />
              <TextInput
                label="Address"
                name="address"
                type="textarea"
                placeholder="123 Main St, Anytown, USA"
                form={form}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                label="Emergency Contact Name"
                name="emergencyContactName"
                type="text"
                placeholder="John Doe"
                form={form}
              />
              <TextInput
                label="Emergency Contact Phone"
                name="emergencyContactPhone"
                type="text"
                placeholder="07700900123"
                form={form}
              />
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              <SelectInput
                label="Department"
                name="departmentId"
                options={departmentOptions}
                form={form}
              />

              <SelectInput
                label="Position"
                name="positionId"
                options={positionOptions}
                form={form}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <TextInput
                label="Weekly Hours"
                name="weeklyHours"
                type="number"
                placeholder="0"
                form={form}
              />
              <TextInput
                label="Working Days Per Week"
                name="workingDaysPerWeek"
                type="number"
                placeholder="0"
                form={form}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SelectInput
                label="Grade Level"
                name="gradeLevelId"
                options={gradeLevelOptions}
                form={form}
                onChange={(e) => {
                  const value = e.target.value;
                  setGradeLevelId(value);
                  if (value) {
                    getSalaryBandsByGradeLevelId(value);
                    // Clear salary band when grade level changes
                    (
                      form as FormApi<
                        AddNewEmployeeFormValues,
                        Partial<AddNewEmployeeFormValues>
                      >
                    ).change(
                      "salaryBandId" as keyof AddNewEmployeeFormValues,
                      undefined
                    );
                  }
                }}
              />

              <SelectInput
                label="Salary Band"
                name="salaryBandId"
                options={salaryBandOptions}
                form={form}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <SelectInput
                label="Employment Type"
                name="employmentTypeId"
                options={employmentTypeOptions}
                form={form}
              />
              <TextInput
                label="Custom Salary"
                name="customSalary"
                type="number"
                placeholder="0"
                form={form}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <SelectInput
                label="Work Schedule Type"
                name="workScheduleTypeId"
                options={workScheduleTypeOptions}
                form={form}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default AddNewEmployeeForm;
