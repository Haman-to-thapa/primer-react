import { useEffect, useState } from "react";
import { fetchApi } from "../api/api";

function Table() {

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchApi();
        console.log("Api response", response)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData()
  }, [])

  return (
    <div>

    </div>
  )
}

export default Table
