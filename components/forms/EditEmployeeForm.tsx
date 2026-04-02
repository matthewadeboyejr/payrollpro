import React, { useState, useEffect, useMemo } from "react";
import TextInput from "../ui/TextInput";
import {
  EditEmployeeFormProps,
  EditEmployeeFormValues,
} from "../types/formFields";
import SelectInput from "../ui/SelectInput";
import useConstantData from "@/hooks/useConstantData";
import { FormApi } from "final-form";
import {
  useGetEmploymentTypesQuery,
  useGetGradeLevelsQuery,
  useGetWorkScheduleTypesQuery,
  useLazyGetSalaryBandsByGradeLevelIdQuery,
} from "@/services/api/constants/employee.constant";

interface EditEmployeeFormComponentProps extends EditEmployeeFormProps {
  step: "basic-info" | "salary-info";
}

const EditEmployeeForm = ({
  step,
  form,
  handleSubmit,
}: EditEmployeeFormComponentProps) => {
  const [gradeLevelId, setGradeLevelId] = useState<string | undefined>(
    undefined
  );
  const { departmentOptions, positionOptions, statuses } = useConstantData();
  const { data: employmentTypes } = useGetEmploymentTypesQuery(undefined);
  const { data: workScheduleTypes } = useGetWorkScheduleTypesQuery(undefined);
  const workScheduleTypeOptions = workScheduleTypes?.data?.map(
    (workScheduleType: { id: string; name: string }) => ({
      value: workScheduleType?.id,
      label: workScheduleType?.name,
    })
  );
  const employmentTypeOptions = employmentTypes?.data?.map((employmentType: { id: string; name: string }) => ({
    value: employmentType?.id,
    label: employmentType?.name,
  }));
  const { data: gradeLevels } = useGetGradeLevelsQuery(undefined);
  const gradeLevelOptions = gradeLevels?.data?.map((gradeLevel: { id: string; name: string }) => ({
    value: gradeLevel?.id,
    label: gradeLevel?.name,
  }));
  const [
    getSalaryBandsByGradeLevelId,
    { data: salaryBands },
  ] = useLazyGetSalaryBandsByGradeLevelIdQuery();
  const salaryBandOptions = useMemo(() => {
    return salaryBands?.data?.map((salaryBand: { id: string; code: string }) => ({
      value: salaryBand?.id,
      label: salaryBand?.code,
    }));
  }, [salaryBands]);

  // Type assertion for form
  const typedForm = form as FormApi<
    EditEmployeeFormValues,
    Partial<EditEmployeeFormValues>
  >;

  // Watch for grade level changes and fetch salary bands
  useEffect(() => {
    const unsubscribe = typedForm.subscribe(
      (formState) => {
        const currentGradeLevelId = formState.values?.gradeLevelId;
        if (currentGradeLevelId && String(currentGradeLevelId) !== gradeLevelId) {
          setGradeLevelId(String(currentGradeLevelId));
          getSalaryBandsByGradeLevelId(String(currentGradeLevelId));
          // Clear salary band when grade level changes
          typedForm.change(
            "salaryBandId" as keyof EditEmployeeFormValues,
            undefined
          );
        }
      },
      { values: true }
    );
    return unsubscribe;
  }, [typedForm, gradeLevelId, getSalaryBandsByGradeLevelId]);

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === "basic-info" ? (
          <>
            {/*  <div className="grid grid-cols-2 gap-2">
              <TextInput
                label="First Name"
                name="firstName"
                type="text"
                placeholder="John"
                form={form}
              />
              <TextInput
                label="Last Name"
                name="lastName"
                type="text"
                placeholder="Doe"
                form={form}
              />
            </div> */}
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
            <div className="grid grid-cols-2 gap-2">
              <SelectInput
                label="Status"
                name="status"
                options={statuses}
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
                    typedForm.change(
                      "salaryBandId" as keyof EditEmployeeFormValues,
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

export default EditEmployeeForm;
