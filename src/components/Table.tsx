import { useEffect, useState } from "react";
import { fetchApi } from "../api/api";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from 'primereact/checkbox';


function Table() {
  const [dataFetching, setDataFetching] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchApi();
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
    <DataTable
      value={dataFetching}
      loading={loading}
      dataKey="id"
    >
      <Column field="title" header="Title" />
      <Column field="place_of_origin" header="Origin" />
      <Column field="artist_display" header="Artist" />
      <Column field="inscriptions" header="Inscriptions" />
      <Column field="date_start" header="Start Year" />
      <Column field="date_end" header="End Year" />
    </DataTable>
  );
}

export default Table;
