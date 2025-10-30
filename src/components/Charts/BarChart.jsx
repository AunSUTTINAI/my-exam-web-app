import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";

const BarChart = ({ data, height = 400, title, legend }) => {
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

  return (
    <Box sx={{ height, width: "100%" }}>
      {title && (
        <Box
          sx={{ textAlign: "center", mb: 1, fontWeight: "bold", fontSize: 16 }}
        >
          {title}
        </Box>
      )}
      <ResponsiveBar
        data={data}
        keys={["value"]}
        indexBy="country"
        margin={{ top: 10, right: 20, bottom: 70, left: 60 }}
        padding={0.3}
        colors={{ scheme: "set2" }}
        borderRadius={3}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        axisBottom={{
          tickRotation: -45,
          legendPosition: "middle",
          legendOffset: 50,
        }}
        axisLeft={{
          legend: legend,
          legendPosition: "middle",
          legendOffset: -50,
        }}
        theme={{
          textColor: "#333",
          fontSize: 12,
        }}
        animate={true}
        motionConfig="gentle"
      />
    </Box>
  );
};

export default BarChart;
