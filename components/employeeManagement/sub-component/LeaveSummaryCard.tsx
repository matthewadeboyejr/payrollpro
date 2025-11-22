import React from "react";

export interface LeaveSummaryItem {
  leaveType: string;
  year: number | string;
  remaining: number;
  entitled: number;
  used: number;
}

interface LeaveSummaryCardProps {
  leaveSummary: LeaveSummaryItem[];
}

const LeaveSummaryCard: React.FC<LeaveSummaryCardProps> = ({
  leaveSummary,
}) => {
  if (!leaveSummary || leaveSummary.length === 0) {
    return (
      <div className="bg-white p-4 rounded-sm">
        <p className="text-sm text-gray-500">No leave summary available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-sm space-y-3 w-full">
      {leaveSummary.map((leave, index) => {
        // Calculate progress percentage (used / entitled)
        const progressPercentage =
          leave.entitled > 0
            ? Math.min((leave.used / leave.entitled) * 100, 100)
            : 0;

        return (
          <div className="space-y-2" key={index}>
            <div className="flex items-center gap-2 justify-between">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <span>{leave?.leaveType || "-"}</span>
                <span className="text-blue-500">{leave?.year || "-"}</span>
              </h3>

              <p className="text-xs font-medium text-gray-500">
                {leave?.remaining || 0} of {leave?.entitled || 0} days left
              </p>
            </div>
            <div className="h-2 bg-blue-50 w-full rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <p className="text-xs font-medium text-gray-500">
                Used: {leave?.used || 0} days
              </p>

              <p className="text-xs font-medium text-gray-500">
                Remaining: {leave?.remaining || 0} days
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveSummaryCard;
