import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box } from "@mui/material";

/** สไตล์แผนที่พื้นฐาน (OSM Raster) */
const DEFAULT_RASTER_STYLE = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      // attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

const POINTS_SOURCE_ID = "points-source";
const POINTS_LAYER_ID = "points-layer";

//** แปลง input ให้เป็น GeoJSON FeatureCollection (เฉพาะจุด) */
function normalizeToFeatureCollection(input) {
  if (!input) {
    return { type: "FeatureCollection", features: [] };
  }

  //? ถ้าเป็น FeatureCollection อยู่แล้ว คืนกลับเลย
  if (input.type === "FeatureCollection") {
    return input;
  }

  //? ถ้าเป็นอาร์เรย์ของ { lng, lat, properties }
  if (Array.isArray(input)) {
    return {
      type: "FeatureCollection",
      features: input
        .filter((p) => Number.isFinite(p?.lng) && Number.isFinite(p?.lat))
        .map((p) => {
          return {
            type: "Feature",
            geometry: { type: "Point", coordinates: [p.lng, p.lat] },
            properties: p.properties || {},
          };
        }),
    };
  }

  return { type: "FeatureCollection", features: [] };
}

/** คำนวณขอบเขต (bounding box) จาก FeatureCollection ที่เป็นจุด */
function computeBoundingBoxFromFeatureCollection(featureCollection) {
  if (
    !featureCollection ||
    featureCollection.type !== "FeatureCollection" ||
    !Array.isArray(featureCollection.features)
  ) {
    return null;
  }

  let minLongitude = Infinity;
  let minLatitude = Infinity;
  let maxLongitude = -Infinity;
  let maxLatitude = -Infinity;

  for (const feature of featureCollection.features) {
    if (!feature?.geometry || feature.geometry.type !== "Point") {
      continue;
    }

    const [longitude, latitude] = feature.geometry.coordinates || [];

    if (Number.isFinite(longitude) && Number.isFinite(latitude)) {
      if (longitude < minLongitude) {
        minLongitude = longitude;
      }
      if (latitude < minLatitude) {
        minLatitude = latitude;
      }
      if (longitude > maxLongitude) {
        maxLongitude = longitude;
      }
      if (latitude > maxLatitude) {
        maxLatitude = latitude;
      }
    }
  }

  if (minLongitude === Infinity) {
    return null;
  }

  return [
    [minLongitude, minLatitude],
    [maxLongitude, maxLatitude],
  ];
}

export default function CustomMap(props) {
  const {
    data,
    center = [100.5018, 13.7563],
    zoom = 4,
    height = 520,
    styleUrl, 
    circlePaint, 
    fitToData = true,
    padding = 40,
    showNavigation = true,
    onClick,
    className,
    containerStyle,
  } = props;

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  //** สร้างแผนที่ครั้งแรก */
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) {
      return;
    }

    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleUrl || DEFAULT_RASTER_STYLE,
      center,
      zoom,
      attributionControl: true,
    });

    mapInstanceRef.current = mapInstance;

    if (showNavigation) {
      mapInstance.addControl(
        new maplibregl.NavigationControl({ visualizePitch: true }),
        "top-right"
      );
    }

    const handleResize = () => {
      mapInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    mapInstance.on("load", () => {
      //?? :: เพิ่มแหล่งข้อมูล (source) ของจุด
      mapInstance.addSource(POINTS_SOURCE_ID, {
        type: "geojson",
        data: normalizeToFeatureCollection(data),
      });

      //?? :: เพิ่มชั้น (layer) ของจุด
      mapInstance.addLayer({
        id: POINTS_LAYER_ID,
        type: "circle",
        source: POINTS_SOURCE_ID,
        paint: {
          "circle-radius": 6,
          ...(circlePaint || {}),
        },
      });

      //?? :: เปลี่ยน cursor เมื่อ hover
      mapInstance.on("mouseenter", POINTS_LAYER_ID, () => {
        mapInstance.getCanvas().style.cursor = "pointer";
      });
      mapInstance.on("mouseleave", POINTS_LAYER_ID, () => {
        mapInstance.getCanvas().style.cursor = "";
      });

      //?? :: คลิกจุด
      mapInstance.on("click", POINTS_LAYER_ID, (event) => {
        const feature = event.features?.[0];

        if (!feature) {
          return;
        }

        const [longitude, latitude] = feature.geometry?.coordinates || [];

        if (onClick) {
          onClick(feature, { lng: longitude, lat: latitude });
        }
      });

      //?? :: ซูมให้พอดีกับข้อมูลรอบแรก
      if (fitToData) {
        const featureCollection = normalizeToFeatureCollection(data);
        const bounds =
          computeBoundingBoxFromFeatureCollection(featureCollection);

        if (bounds) {
          mapInstance.fitBounds(bounds, { padding, duration: 600 });
        }
      }
    });

    // cleanup เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("resize", handleResize);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [
    center,
    zoom,
    styleUrl,
    showNavigation,
    circlePaint,
    fitToData,
    padding,
    data,
    onClick,
  ]);

  /** อัปเดตข้อมูลเมื่อ data เปลี่ยน */
  useEffect(() => {
    const mapInstance = mapInstanceRef.current;

    if (!mapInstance || !mapInstance.isStyleLoaded?.()) {
      return;
    }

    /** อาจเกิดกรณี style reload — ตรวจ source ก่อนเสมอ */
    const pointsSource = mapInstance.getSource(POINTS_SOURCE_ID);

    if (!pointsSource) {
      return;
    }

    const featureCollection = normalizeToFeatureCollection(data);
    pointsSource.setData(featureCollection);

    if (fitToData) {
      const bounds = computeBoundingBoxFromFeatureCollection(featureCollection);

      if (bounds) {
        mapInstance.fitBounds(bounds, { padding, duration: 500 });
      }
    }
  }, [data, fitToData, padding]);

  return (
    <Box
      ref={mapContainerRef}
      className={className}
      style={{
        width: "100%",
        height,
        borderRadius: 8,
        overflow: "hidden",
        ...(containerStyle || {}),
      }}
    />
  );
}
