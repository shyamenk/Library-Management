import React from "react";

const BookListHeader: React.FC = () => {
  return (
    <thead className="bg-gray-100 rounded-lg md:rounded-tl">
      <tr>
        <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">ID</th>
        <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Name</th>
        <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700">Availability</th>
        <th className="px-4 py-3.5 text-left text-sm font-normal text-gray-700 rounded-tr-lg">
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default BookListHeader;
