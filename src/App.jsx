import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Box, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
//console.log("API KEY", import.meta.env.VITE_API_KEY);
const url = `http://api.weatherapi.com/v1/current.json?key=${
  import.meta.env.VITE_API_KEY
}&q=`;
function App() {
  const [ciudad, setCiudad] = useState("");

  const guardar = async (e) => {
    e.preventDefault();
    console.log("HELLO WORLD");
    try {
    } catch (error) {}
  };
  return (
    <>
      <Container maxWidth="xs" sx={{ mt: 5 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold" }}
          component="h1"
          align="center"
        >
          ClimateWise
        </Typography>
        <Box
          sx={{ display: "grid", gap: 2, mt: 3 }}
          component="form"
          autoComplete="off"
          onSubmit={guardar}
        >
          <TextField
            id="ciudad"
            label="Ciudad"
            variant="outlined"
            size="medium"
            required
            fullWidth
            value={ciudad}
            onChange={(e) => {
              setCiudad(e.target.value);
            }}
          ></TextField>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={false}
            loadingIndicator="Buscando..."
          >
            Buscar
          </LoadingButton>
        </Box>

        <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px" }}>
          {" "}
          Powered By:{" "}
          <a href="https://www.weatherapi.com/" title="Weather API">
            WheaterAPI.com
          </a>
        </Typography>
      </Container>
    </>
  );
}

export default App;
