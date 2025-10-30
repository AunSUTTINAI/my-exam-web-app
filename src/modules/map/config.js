import Style1 from "../../../public/images/style1.png";
import Style2 from "../../../public/images/style2.png";
import { THEME_GLOBE, THEME_POSITRON } from "../../configs/constants";

export const circlePaint = {
  "circle-color": [
    "match",
    ["get", "confidence"],
    "high",
    "rgba(0, 188, 212, 0.9)",
    "nominal",
    "rgba(38, 198, 218, 0.85)",
    "low",
    "rgba(128, 222, 234, 0.75)",
    "rgba(77, 182, 172, 0.8)",
  ],
  "circle-radius": [
    "interpolate",
    ["linear"],
    ["coalesce", ["get", "frp"], 0],
    0,
    3,
    10,
    6,
    50,
    12,
    200,
    18,
  ],
  "circle-stroke-width": 1.4,
  "circle-stroke-color": [
    "match",
    ["get", "confidence"],
    "high",
    "#f44336",
    "nominal",
    "#3f51b5",
    "low",
    "#ffc107",
    "#009688",
  ],
};

 export const instrumentMap = {
    VIIRS: "Visible Infrared Imaging Radiometer Suite",
    MODIS: "Moderate Resolution Imaging Spectroradiometer",
  };

 export const confidenceMap = {
    high: "สูง (High Confidence)",
    nominal: "ปานกลาง (Nominal Confidence)",
    low: "ต่ำ (Low Confidence)",
  };


export const mapThemesConfig = [
  {
    id: "globe", 
    name: "Globe Theme",
    styleUrl: THEME_GLOBE,
    imageSrc: Style1 
  },
  {
    id: "positron",
    name: "Positron Theme",
    styleUrl: THEME_POSITRON,
    imageSrc: Style2 
  }
];