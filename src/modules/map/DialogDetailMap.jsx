import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ButtonCustom from "../../components/buttons/ButtonCustom";
import { confidenceMap, instrumentMap } from "./config";

function DialogDetailMap({ open, data, onClose }) {
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
          <ButtonCustom color="grey" label="CLOSE" onClick={onClose} />
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDetailMap;
