import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import CustomMap from "../components/maps/CustomMap";
import httpClient from "../api/httpClient";
import { apiCollection } from "../configs/constants";
import {
  Grid,
  Box,
  Stack,
  Card,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import Loading from "../components/loading/Loading";
import CardPosition from "../components/Card/CardPosition";
import CustomSlider from "../components/inputs/CustomSlider";
import ButtonCustom from "../components/buttons/ButtonCustom";
import { circlePaint, confidenceMap, instrumentMap } from "./configMap";
import PieChart from "../components/Charts/PieChart";
import BarChart from "../components/Charts/BarChart";

const MemoCustomMap = memo(CustomMap);

function App() {
  //? State Management
  //#region  STATE
  const [mapsData, setMapsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recordLimit, setRecordLimit] = useState(500);
  const [isOpen, setIsOpen] = useState({ data: null, open: false });
  //#endregion

  //? fetch data
  //#region FETCH DATA
  const fetchMapsData = useCallback(async (limit, offset) => {
    try {
      setLoading(true);
      const response = await httpClient.get(apiCollection.map_api, {
        params: { limit: limit, offset: offset },
      });
      setMapsData(response.data);
    } catch (err) {
      alert(err.message || "Error fetching map data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMapsData(1000, 0);
  }, [fetchMapsData]);
  //#endregion

  //? dialog handlers
  //#region DIALOG HANDLERS
  const openDialog = useCallback((e, lat_long) => {
    setIsOpen({ data: { ...e, ...lat_long }, open: true });
  }, []);

  const handleCloseDialog = () => {
    setIsOpen({ data: null, open: false });
  };
  //#endregion

  //? map interface handlers
  //#region  MAP interface
  const handleMapClick = useCallback(
    (e, { lng, lat }) => {
      openDialog(e.properties, { lng, lat });
    },
    [openDialog]
  );
  const onChangeLimitOffset = useCallback((val) => {
    setRecordLimit(val);
  }, []);
  const handleSearch = useCallback(() => {
    fetchMapsData(recordLimit, 0);
  }, [fetchMapsData, recordLimit]);
  //#endregion

  const mapData = useMemo(
    () => ({
      type: "FeatureCollection",
      features: mapsData.features || [],
    }),
    [mapsData]
  );

  //? prepare data for charts
  //#region  "Confidence Summary and Country Summary for Charts"
  const confidenceSummary = mapData.features.reduce((summary, feature) => {
    const confidenceLevel = feature.properties?.confidence ?? "unknown";
    const currentCount = summary[confidenceLevel] ?? 0;
    summary[confidenceLevel] = currentCount + 1;
    return summary;
  }, {});

  const pieConfidence = Object.entries(confidenceSummary).map(
    ([confidenceLevel, count]) => ({
      id: confidenceLevel,
      label: confidenceLevel.charAt(0).toUpperCase() + confidenceLevel.slice(1),
      value: count,
      color:
        confidenceLevel === "high"
          ? "rgba(244, 67, 54, 0.7)"
          : confidenceLevel === "nominal"
          ? "rgba(255, 152, 0, 0.7)"
          : confidenceLevel === "low"
          ? "rgba(76, 175, 80, 0.7)"
          : "#9e9e9e",
    })
  );

  const countrySummary = mapData.features.reduce((summary, feature) => {
    const countryName = feature.properties?.ct_en || "Unknown";
    const currentCount = summary[countryName] ?? 0;
    summary[countryName] = currentCount + 1;
    return summary;
  }, {});

  const barCountry = Object.entries(countrySummary)
    .map(([countryName, count]) => ({
      country: countryName,
      value: count,
    }))
    .sort(
      (firstCountry, secondCountry) => secondCountry.value - firstCountry.value
    );
  //#endregion

  console.log(confidenceSummary);

  return (
    <Box>
      {loading && <Loading />}
      <CardPosition
        stylesCard={{
          top: 84,
          left: 40,
          width: 350,
          height: 800,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" mb={2} sx={{ fontWeight: "bold" }}>
          Dashboard Hotspot ทั้งหมด
        </Typography>
        {!loading && (
          <>
            <Box sx={{ bgcolor: "rgba(200,200,200,0.5)", borderRadius: 2 }}>
              <PieChart
                height={300}
                data={pieConfidence}
                title="สถิติข้อมูล Confidence"
              />
            </Box>
            <Box
              sx={{
                bgcolor: "rgba(200,200,200,0.5)",
                borderRadius: 2,
                mt: 2,
                paddingBottom: 2,
              }}
            >
              <BarChart
                height={300}
                data={barCountry}
                title={"จำนวน Hotspot"}
              />
            </Box>
          </>
        )}
      </CardPosition>
      {isOpen.open && (
        <MapDetailDialog
          data={isOpen.data}
          open={isOpen.open}
          onClose={handleCloseDialog}
        />
      )}
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 10 }}>
          {!loading && !!mapsData.features?.length && (
            <MemoCustomMap
              styleUrl="https://demotiles.maplibre.org/globe.json"
              //"https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
              zoom={3}
              height={800}
              data={mapData}
              fitToData
              onClick={handleMapClick}
              circlePaint={circlePaint}
            />
          )}
        </Grid>
        <Grid item size={{ xs: 12, md: 2 }}>
          <Card
            sx={{
              boxShadow: 3,
              p: 2,
              borderRadius: 1,
              height: 800,
              overflowY: "auto",
            }}
          >
            <Box sx={{ p: 2 }}>
              <CustomSlider
                label="เพิ่ม/ลดจำนวนข้อมูล"
                defaultLimit={0}
                step={200}
                min={1000}
                max={10000}
                onChange={onChangeLimitOffset}
              />
              <Stack spacing={2} sx={{ mt: 4, justifySelf: "flex-end" }}>
                <ButtonCustom label="SEARCH" onClick={handleSearch} />
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

function MapDetailDialog({ open, data, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{data.ct_tn}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography variant="h6">ข้อมูลดาวเทียม</Typography>
          <Typography variant="body1">ดาวเทียม: {data.satellite}</Typography>
          <Typography variant="body1">
            Tool :{instrumentMap[data.instrument] || data.instrument || "-"}
          </Typography>
          <Typography variant="body1">FRP: {data.frp ?? "-"} MW</Typography>
          <Typography variant="body1">
            Confidence:{" "}
            {confidenceMap[data.confidence] || data.confidence || "-"}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} sx={{ justifySelf: "flex-end" }}>
          <ButtonCustom color="grey" label="CLOSE"  onClick={onClose} />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default App;
