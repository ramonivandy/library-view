import React, { useState } from "react";

const DynamicTable = ({
  columns,
  data,
  actions,
  onAction,
  keyField = "id",
  loading = false,
}) => {
  // Number of skeleton rows to show while loading
  const skeletonRowCount = 3;

  const LoadingSkeleton = () =>
    Array(skeletonRowCount)
      .fill(0)
      .map((_, index) => (
        <tr key={`skeleton-${index}`}>
          {columns.map((column, colIndex) => (
            <td key={`skeleton-cell-${colIndex}`} className="border px-4 py-2">
              <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
            </td>
          ))}
          {actions && (
            <td className="border px-4 py-2">
              <div className="flex gap-2">
                {actions.map((_, actionIndex) => (
                  <div
                    key={`skeleton-action-${actionIndex}`}
                    className="animate-pulse h-8 w-16 bg-gray-200 rounded"
                  ></div>
                ))}
              </div>
            </td>
          )}
        </tr>
      ));

  return (
    <div className="mt-8 overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2 bg-gray-50">
                {column.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2 bg-gray-50">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            data.map((item) => (
              <tr key={item[keyField]} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={`${item[keyField]}-${column.key}`}
                    className="border px-4 py-2"
                  >
                    {item[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      {actions.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => onAction(action.type, item[keyField])}
                          className={`px-3 py-1 ${action.className}`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
          {!loading && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
