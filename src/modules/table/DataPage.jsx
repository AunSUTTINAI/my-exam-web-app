import React, { useState, useEffect, useCallback } from "react";
import TablePaginations from "../../components/tables/TablePagination";
import httpClient from "../../api/httpClient";
import { apiCollection } from "../../configs/constants";
import Loading from "../../components/loading/Loading";
import DialogDetailMap from "../map/DialogDetailMap";
import { columns } from "./config";

function DataPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isOpen, setIsOpen] = useState({ data: null, open: false });

  const fetchTableData = useCallback(async () => {
    setLoading(true);
    const offset = page * limit;

    try {
      const response = await httpClient.get(apiCollection.map_api, {
        params: { limit: limit, offset: offset },
      });
      const apiData = response.data.features || [];
      const formattedRows = apiData.map((feature, idx) => ({
        row_num: idx + 1,
        id: feature.id,
        ...feature.properties,
      }));

      setRows(formattedRows);
    } catch (err) {
      alert(err.message || "Error fetching map data");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchTableData();
  }, [fetchTableData]);



  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
  };

  const openDialog = useCallback((e) => {
    setIsOpen({ data: { ...e }, open: true });
  }, []);

  const handleCloseDialog = () => {
    setIsOpen({ data: null, open: false });
  };

  return (
    <div style={{ padding: "20px" }}>
      {isOpen.open && (
        <DialogDetailMap
          data={isOpen.data}
          open={isOpen.open}
          onClose={handleCloseDialog}
        />
      )}
      {loading && <Loading />}
      <TablePaginations
        columns={columns}
        rows={rows}
        totalCount={10000}
        rowsPerPage={limit}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        loading={loading}
        onClick={(e) => openDialog(e)}
      />
    </div>
  );
}

export default DataPage;
