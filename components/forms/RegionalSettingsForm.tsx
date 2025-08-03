import React from "react";

import { RegionalSettingsFormProps } from "../types/formFields";
import { BiGlobe } from "react-icons/bi";
import SelectInput from "../ui/SelectInput";

const RegionalSettingsForm = ({
  handleSubmit,
  form,
}: RegionalSettingsFormProps) => {
  return (
    <div className="w-full mt-5 bg-white p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-5">
        <BiGlobe className="font-bold" />
        <h2 className="text-lg font-semibold">Regional Settings</h2>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-2">
          <SelectInput
            label="Timezone"
            name="timezone"
            options={[
              { value: "UTC+0", label: "UTC+0" },
              { value: "UTC+1", label: "UTC+1" },
              { value: "UTC+2", label: "UTC+2" },
            ]}
            form={form}
          />
          <SelectInput
            label="Currency"
            name="currency"
            options={[
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
              { value: "GBP", label: "GBP" },
            ]}
            form={form}
          />
          <SelectInput
            label="Date Format"
            name="dateFormat"
            options={[
              { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
              { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
              { value: "YYYY/MM/DD", label: "YYYY/MM/DD" },
            ]}
            form={form}
          />
          <SelectInput
            label="Language"
            name="language"
            options={[
              { value: "en", label: "English" },
              { value: "fr", label: "French" },
              { value: "de", label: "German" },
            ]}
            form={form}
          />
        </div>
      </form>
    </div>
  );
};

export default RegionalSettingsForm;
