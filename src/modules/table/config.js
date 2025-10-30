  export const columns = [
    { id: "row_num", label: "No", minWidth: 50 },
    { id: "open", label: "", minWidth: 100, type: "open" },
    { id: "ct_tn", label: "Country", minWidth: 100 },
    { id: "latitude", label: "Latitude", minWidth: 50 },
    { id: "longitude", label: "Longitude", minWidth: 50 },
    { id: "satellite", label: "Satellite", minWidth: 80 },
    { id: "confidence", label: "Confidence", minWidth: 100, type: "status" },
    {
      id: "acq_date",
      label: "Acq. Date",
      type: "datetime",
      minWidth: 170,
      // format: (value) =>
      //   value ? new Date(value).toLocaleString("th-TH") : "-",
    },
  ];