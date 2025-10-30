import React, { useState, useCallback, useMemo, useEffect } from "react";
import { LoginConfig, RegisterConfig } from "./authConfig";
import TextFieldCustom from "@components/inputs/TextFieldCustom";
import AutocompleteCustom from "@components/inputs/AutocompleteCustom";
import ButtonCustom from "@components/buttons/ButtonCustom";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Link,
  Box,
  Grid,
} from "@mui/material";
import { apiCollection } from "../../configs/constants";
import axios from "axios";
import { toast } from "@components/alerts/AlertDialog";

export default function Login() {
  const [payloads, setPayloads] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("login");
  const [payloadsRegister, setPayloadsRegister] = useState({});

  const handleChange = useCallback(
    (id) => (e) => {
      const value = e.target.value;
      if (page === "login") {
        setPayloads((prev) => ({ ...prev, [id]: value }));
      } else {
        setPayloadsRegister((prev) => ({ ...prev, [id]: value }));
      }
    },
    [page]
  );

  const isValid = useMemo(() => {
    const fields = page === "login" ? LoginConfig : RegisterConfig;
    const values = page === "login" ? payloads : payloadsRegister;

    return fields.every((f) =>
      f.required ? Boolean(values[f.id]?.trim()) : true
    );
  }, [page, payloads, payloadsRegister]);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ icon: "success", message: `เข้าสู่ระบบสำเร็จ` });
    }, 1000);
  };

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(apiCollection.province);
        setProvinces(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  console.log(payloadsRegister);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      {page === "login" ? (
        <Card sx={{ width: 380, p: 2, boxShadow: 3, borderRadius: 2 }}>
          <CardHeader
            title="Login"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          />
          <CardContent>
            <Stack spacing={2}>
              {LoginConfig.map((item) => (
                <TextFieldCustom
                  key={item.id}
                  id={item.id}
                  type={item.type}
                  label={item.label}
                  required={item.required}
                  value={payloads[item.id] || ""}
                  onChange={handleChange(item.id)}
                />
              ))}

              <Box sx={{ display: "flex", justifyContent: "start" }}>
                <Link component="button" onClick={() => setPage("register")}>
                  Register
                </Link>
              </Box>

              <ButtonCustom
                label="Login"
                color="primary"
                variant="contained"
                loading={loading}
                onClick={handleLogin}
                disabled={!isValid}
              />
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card sx={{ width: 600, p: 2, boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
              title="Register"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            />
            <CardContent>
              <Grid container spacing={2} mb={2}>
                {RegisterConfig.map((item, index) => {
                  let _width = 12;
                  if (
                    item.id === "firstName" ||
                    item.id === "lastName" ||
                    item.id === "tambon" ||
                    item.id === "amphoe" ||
                    item.id === "zipcode" ||
                    item.id === "country"
                  ) {
                    _width = 6;
                  }
                  if (item.type !== "select") {
                    return (
                      <Grid item size={{ xs: 12, sm: _width }} key={index}>
                        <TextFieldCustom
                          key={item.id}
                          id={item.id}
                          type={item.type}
                          label={item.label}
                          required={item.required}
                          value={payloadsRegister[item.id] || ""}
                          onChange={handleChange(item.id)}
                          multiline={item.id === "address" ? true : false}
                        />
                      </Grid>
                    );
                  } else if (item.type === "select") {
                    return (
                      <AutocompleteCustom
                        label={item.label}
                        name={item.id}
                        value={payloadsRegister[item.id] ?? null} // <-- เก็บ object
                        options={provinces.map((p) => ({
                          label: p.name_th,
                          value: p.name_th,
                        }))}
                        getOptionLabel={(o) => o?.label ?? ""}
                        isOptionEqualToValue={(o, v) => o.value === v.value}
                        onChange={(newValue) =>
                          setPayloadsRegister((prev) => ({
                            ...prev,
                            [item.id]: newValue,
                          }))
                        }
                        required
                        placeholder={item.label}
                        fullWidth
                      />
                    );
                  }
                })}
              </Grid>

              <Stack spacing={2}>
                <Box sx={{ display: "flex", justifyContent: "start" }}>
                  <Link component="button" onClick={() => setPage("login")}>
                    Login
                  </Link>
                </Box>

                <ButtonCustom
                  label="Register"
                  color="success"
                  variant="contained"
                  loading={loading}
                  onClick={handleLogin}
                  disabled={!isValid}
                />
              </Stack>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
