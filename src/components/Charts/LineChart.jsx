import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";

const LineChart = ({ data, height = 400, title }) => {
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ไม่มีข้อมูล
      </Box>
    );
  }

  const formattedData = [
    {
      id: "FRP",
      color: "#1976d2",
      data: data.sort((a, b) => new Date(a.x) - new Date(b.x)), // เรียงวันจากเก่า -> ใหม่
    },
  ];

  return (
    <Box sx={{ height, width: "100%" }}>
      {title && (
        <Box
          sx={{ textAlign: "center", mb: 1, fontWeight: "bold", fontSize: 16 }}
        >
          {title}
        </Box>
      )}

      <ResponsiveLine
        data={formattedData}
        margin={{ top: 40, right: 40, bottom: 60, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickRotation: -45,
          legend: "วันที่ตรวจพบ (acq_date)",
          legendOffset: 45,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          legend: "ค่าพลังงานความร้อน (FRP)",
          legendOffset: -55,
          legendPosition: "middle",
        }}
        colors={{ scheme: "set1" }}
        pointSize={8}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableArea={true}
        areaOpacity={0.1}
        enableGridX={false}
        enableGridY={true}
        useMesh={true}
        theme={{
          textColor: "#333",
          fontSize: 12,
        }}
        motionConfig="gentle"
      />
    </Box>
  );
};

export default LineChart;
