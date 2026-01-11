import { useEffect, useState } from "react";
import { fetchArtworks } from "../api/api";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";



function Table() {
  const [dataFetching, setDataFetching] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRows] = useState<any[]>([])



  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchArtworks();
        console.log(response)
        setDataFetching(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);



  return (
    <div className="px-5">

      <DataTable
        value={dataFetching}
        loading={loading}
        dataKey="id"
        selection={selectedRow}
        onSelectionChange={(e) => setSelectedRows(e.value)}
        selectionMode="multiple"
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}


        />

        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>

    </div>

  );
}

export default Table;