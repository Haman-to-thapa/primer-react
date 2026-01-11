import React from "react";
import { Paginator } from "primereact/paginator";

interface PaginationProps {
  first: number;
  rows: number;
  totalRecords: number;
  onPageChange: (event: any) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  first,
  rows,
  totalRecords,
  onPageChange,
}) => {
  const start = first + 1;
  const end = Math.min(first + rows, totalRecords);

  return (
    <div className="flex justify-between items-center mt-4 px-2">
      <span className="text-sm text-gray-600">
        Showing {start} to {end} of {totalRecords} entries
      </span>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        template="PrevPageLink PageLinks NextPageLink"
        className="custom-paginator"
      />

    </div>
  );
};

export default Pagination;