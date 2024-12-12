import React from "react";

const Table = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const dummyData = [
    { id: 1, bookName: "John Doe", active: true },
    { id: 2, bookName: "Jane Smith", active: false }, 
    { id: 3, bookName: "Bob Wilson", active: true }
  ];

  const filteredData = dummyData.filter(item =>
    item.bookName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get table headers dynamically from first data item
  const tableHeaders = dummyData.length > 0 ? Object.keys(dummyData[0]) : [];

  return (
    <div className="w-full px-4 overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="w-full min-w-[500px] border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {tableHeaders.map((header) => (
              <th key={header} className="p-2 text-left border">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th className="p-2 text-left border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {tableHeaders.map((header) => (
                <td key={header} className="p-2 border">
                  {header === 'active' ? (
                    <span className={`px-2 py-1 rounded-full text-sm ${row[header] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {row[header] ? 'Active' : 'Inactive'}
                    </span>
                  ) : row[header]}
                </td>
              ))}
              <td className="p-2 border">
                <button className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 mx-2">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-blue-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
