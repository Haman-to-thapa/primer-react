import { useEffect, useState } from "react";
import { fetchArtworks } from "../api/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Pagination from "./Pagination";

function Table() {
  const [dataFetching, setDataFetching] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);


  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    loadData(currentPage);
  }, []);


  const loadData = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetchArtworks(page);
      console.log("API Response:", response);

      setDataFetching(response.data);

      setTotalRecords(response.pagination.total);



      const newFirst = (page - 1) * rows;
      setFirst(newFirst);
      setCurrentPage(page)


    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  const onPageChange = (event: any) => {
    const newPage = Math.floor(event.first / event.rows) + 1;
    setCurrentPage(newPage);
    setFirst(event.first);
    setRows(event.rows);
    loadData(newPage);
  };

  return (
    <div className="px-5">
      <div className="mt-3">
        <p>Selected rows: {selectedRows.length}</p>
        <p>Current page: {currentPage}</p>
      </div>
      <DataTable
        value={dataFetching}
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
        />

        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>


      {dataFetching.length > 0 && (
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