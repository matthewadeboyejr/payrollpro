import React from "react";

interface ViewSkeletonProps {}

const ViewSkeleton: React.FC<ViewSkeletonProps> = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-2 gap-4 text-sm">
      {/* First Name */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
        <div className="h-5 bg-gray-300 rounded animate-pulse w-32"></div>
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
        <div className="h-5 bg-gray-300 rounded animate-pulse w-32"></div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
        <div className="h-5 bg-gray-300 rounded animate-pulse w-48"></div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-5 bg-gray-300 rounded animate-pulse w-32"></div>
      </div>

      {/* Roles */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
        <div className="flex flex-col gap-2 items-start">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20"></div>
        </div>
      </div>
    </div>
  );
};

export default ViewSkeleton;
