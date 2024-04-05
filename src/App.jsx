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
  //Guardar la ciudad
  const [ciudad, setCiudad] = useState("");
  //Efecto de Carga para el Boton
  const [loading, setLoading] = useState(false);
  //Para capturar errores
  const [error, setError] = useState({ error: false, message: "" });
  //Para Capturar los datos del JSON
  const [weather, setWeather] = useState({
    city: "",
    region: "",
    country: "",
    localtime: "",

    temp_c: "",
    is_day: "",

    text: "",
    icon: "",
  });
  const guardar = async (e) => {
    e.preventDefault();
    //Al ponerse true el boton hace efecto de carga
    setLoading(true);
    setError({ error: false, message: "" });
    try {
      //Si la ciudad esta vacia con espacios no lo deja pasar
      if (!ciudad.trim()) throw { message: "El campo es obligatorio" };
      //Peticion al Api y la Ciudad
      const response = await fetch(`${url}${ciudad}`);
      //La respuesta de la data
      const data = await response.json();
      //Si hay un error
      if (data.error) throw { message: data.error.message };
      //Parceo la respuesta
      setWeather({
        city: data.location.name,
        region: data.location.region,
        country: data.location.country,
        localtime: data.location.localtime,

        temp_c: data.current.temp_c,
        is_day: data.current.is_day,

        text: data.current.condition.text,
        icon: data.current.condition.icon,
      });
    } catch (error) {
      setError({ error: true, message: error.message });
    } finally {
      setLoading(false);
    }
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
            fullWidth
            value={ciudad}
            onChange={(e) => {
              setCiudad(e.target.value);
            }}
            error={error.error}
            helperText={error.message}
          ></TextField>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="Buscando..."
          >
            Buscar
          </LoadingButton>
        </Box>

        {weather.city && (
          <Box sx={{ mt: 2, display: "grid", gap: 2, textAlign: "center" }}>
            <Typography component="h1" variant="h2" sx={{ fontWeight: "bold" }}>
              {weather.country}
            </Typography>
            <Typography component="h2" variant="h4">
              {weather.city}, {weather.region}
            </Typography>
            <Box
              component="img"
              alt={weather.text}
              src={weather.icon}
              sx={{ margin: "0 auto" }}
            ></Box>
            <Typography component="h3" variant="h5">
              {weather.temp_c} °C
            </Typography>
            <Typography variant="h6" component="h4">
              {weather.localtime}
            </Typography>
            <Typography variant="h6" component="h4">
              {weather.is_day == 1 ? "Es de Dia" : "Es de Noche"}
            </Typography>
          </Box>
        )}

        <Typography textAlign="center" sx={{ mt: 2, fontSize: "10px", mb: 5 }}>
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
