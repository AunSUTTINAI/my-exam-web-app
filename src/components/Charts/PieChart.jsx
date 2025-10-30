import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";

const PieChart = ({ data, height = 300, title }) => {
  return (
    <Box sx={{ height, width: "100%" }}>
      {title && (
        <Box
          sx={{ textAlign: "center", mb: 1, fontWeight: "bold", fontSize: 16 }}
        >
          {title}
        </Box>
      )}
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 50, bottom: 50, left: 50 }}
        innerRadius={0.5}
        padAngle={1.5}
        cornerRadius={4}
        activeOuterRadiusOffset={8}
        colors={(d) => d.data.color}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        animate={true}
        motionConfig="gentle"
        theme={{
          textColor: "#333",
          fontSize: 12,
          tooltip: { container: { background: "#fff", color: "#333" } },
        }}
      />
    </Box>
  );
};

export default PieChart;
