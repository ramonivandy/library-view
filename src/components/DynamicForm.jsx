import React from "react";

const DynamicForm = ({
  fields,
  values,
  onChange,
  onSubmit,
  isEditing,
  gridCols = 2,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white rounded shadow-md">
      <div className={`grid grid-cols-${gridCols} gap-4`}>
        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            value={values[field.name]}
            onChange={onChange}
            placeholder={field.placeholder}
            className="p-2 border rounded"
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default DynamicForm;
