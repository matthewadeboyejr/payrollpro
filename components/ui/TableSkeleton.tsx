import React from "react";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showSearch?: boolean;
  showAddButton?: boolean;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 5,
  showSearch = true,
  showAddButton = true,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-sm">
      {/* Header with search and add button */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        {showSearch && (
          <div className="flex-1 items-center gap-2 border border-gray-200 px-2 py-3 rounded-sm w-full md:w-auto bg-gray-50">
            <div className="h-4 bg-gray-300 rounded animate-pulse w-64"></div>
          </div>
        )}

        {showAddButton && (
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="h-10 bg-gray-300 rounded animate-pulse w-32"></div>
          </div>
        )}
      </div>

      {/* Table skeleton */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
