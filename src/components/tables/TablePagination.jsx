import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import moment from "moment";
import { DATE_TIME_FORMAT } from "../../configs/constants";
import { statusColor } from "../../configs/commonFunc";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

function TablePaginations({
  columns,
  rows,
  totalCount,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  onClick,
}) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth || 170 }}
                  sx={{ fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.type === "datetime") {
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {value
                              ? moment(value).format(DATE_TIME_FORMAT)
                              : "-"}
                          </TableCell>
                        </>
                      );
                    } else if (column.type === "status") {
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            <Chip
                              label={value}
                              size="small"
                              sx={{ bgcolor: statusColor(value) }}
                            />
                          </TableCell>
                        </>
                      );
                    } else if (column.type === "open") {
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            <IconButton
                              size="small"
                              onClick={() => onClick(row)}
                            >
                              <OpenInNewIcon color="primary" />
                            </IconButton>
                          </TableCell>
                        </>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
}

export default TablePaginations;
