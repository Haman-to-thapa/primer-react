import { useEffect, useState } from "react";
import { fetchApi } from "../api/api";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";



function Table() {
  const [dataFetching, setDataFetching] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchApi();
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

      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          bodyStyle={{ paddingLeft: "0rem", textAlign: "center" }}

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
