import { GoPeople } from "react-icons/go";
import { LuBuilding2, LuShield } from "react-icons/lu";

export const overviewData = [
  {
    icon: (
      <p className="bg-blue-50 rounded-xl p-4 w-fit text-2xl text-accent">
        <LuBuilding2 className=" " />
      </p>
    ),
    title: "Muilti-tenant",
    details: "Agency management with white-label options",
  },
  {
    icon: (
      <p className="bg-green-50 rounded-xl p-4 w-fit text-2xl text-green-500">
        <LuShield className="" />
      </p>
    ),
    title: "Compliant",
    details: "UK PAYE, HMRC integration, GDPR ready",
  },
  {
    icon: (
      <p className="bg-purple-50 rounded-xl p-4 w-fit text-2xl text-purple-500">
        {" "}
        <GoPeople />
      </p>
    ),
    title: "Role-based",
    details: "MFA, RBAC, team management",
  },
];
