import { useEffect, useState } from "react";
import { fetchArtworks } from "../api/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Pagination from "./Pagination";
import TitleFilterHeader from "./TitleFilterHeader.tsx";

function Table() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  const handleNumberSelect = (num: number) => {
    console.log(`Selecting ${num} rows`);
    const newSelection = data.slice(0, Math.min(num, data.length));
    setSelectedRows(newSelection);
  };

  useEffect(() => {
    loadData(currentPage);
  }, []);

  const loadData = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetchArtworks(page);

      setData(res.data);
      setTotalRecords(res.pagination.total);

      setFirst((page - 1) * rows);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (e: any) => {
    const page = Math.floor(e.first / e.rows) + 1;
    setFirst(e.first);
    setRows(e.rows);
    setCurrentPage(page);
    loadData(page);
  };

  return (
    <div className="px-4">
      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p>Selected rows: {selectedRows.length}</p>
        <p>Current page: {currentPage}</p>
      </div>

      <DataTable
        value={data}
        loading={loading}
        dataKey="id"
        selection={selectedRows}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        selectionMode="multiple"
      >

        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          exportable={false}
          header={
            <div className="flex items-center justify-center">
              <TitleFilterHeader onNumberSelect={handleNumberSelect} />
            </div>
          }
        />

        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>

      {data.length > 0 && (
        <Pagination
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

export default Table;