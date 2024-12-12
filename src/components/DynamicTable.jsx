import React from "react";

const DynamicTable = ({
  columns,
  data,
  actions,
  onAction,
  keyField = "id",
}) => {
  return (
    <div className="mt-8">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-2">
                {column.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item[keyField]}>
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
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => onAction(action.type, item[keyField])}
                      className={`mr-2 px-3 py-1 ${action.className}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
