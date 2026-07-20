import './App.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import axios from 'axios';


let cancelAxios = null
function App() {
  console.log("rendering the component");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: ""
  }) 
  useEffect(() => {
    // const controller = new AbortController();
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?lat=33.5138&lon=36.2765&appid=585619061c995c0612e7322e751c37c9", 
        {
          // signal: controller.signal,
          // OR 
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c
          })
        }
      )
      .then((response) => {
        const number = Math.round(response.data.main.temp - 272.15)
        const description = response.data.weather[0].description
        const min = Math.round(response.data.main.temp_min - 272.15)
        const max = Math.round(response.data.main.temp_max - 272.15)
        const icon = response.data.weather[0].icon
        setTemp({number: number,description: description, min: min, max: max, icon: icon})
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Request completed");
      });
      return () => {
        // controller.abort();
        console.log("clean up");
        cancelAxios()
      }
  }, [])
  return (
    <div className="App">
      <Container maxWidth="sm">
        {/* CONTEBT CONTAINER */}
        <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
        
        
          {/* CARD */}
          <div style={{
            background: "rgb(28 52 91 / 36%)",
            color: "white", 
            padding: "10px", 
            borderRadius: "15px",
            boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
            width: "100%",
            direction: "rtl"
            }}>
            {/* CONTENT */}
            <div>
              {/* CITY & TIME */}
              <div style={{display: "flex", direction: "rtl", alignItems: "end", justifyContent: "start"}}>
                <Typography variant="h2" style={{marginRight: "20px", fontWeight: "600"}}>
                  الرياض
                </Typography>
                <Typography variant="h5" style={{marginRight: "20px"}}>
                  الإثنين 10-10-2040
                </Typography>
              </div>
              {/* == CITY & TIME == */}
              <hr/>
              {/* CONTAINER OF DEGREE + CLOUD ICON */}
              <div style={{display: "flex" ,justifyContent: "space-around"}}>
                {/* DEGREE & DESCRIPTION */}
                <div>
                  {/* TEMP */}
                  <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Typography variant="h1" style={{textAlign: "right"}}>
                      {temp.number}
                    </Typography>
                    <img src={`https://openweathermap.org/payload/api/media/file/${temp.icon}.png`} alt='no_photo'/>
                  </div>
                  {/* == TEMP == */}
                  {/* Description */}
                  <Typography variant="h6">
                    {temp.description}
                  </Typography>
                  {/* == Description == */}
                  {/* MIN & MAX TEMP */}
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h5>الصغرى : {temp.min}</h5>
                    <h5 style={{margin: "0 5px"}}>|</h5>
                    <h5>الكبرى : {temp.max}</h5>
                  </div>
                  {/* == MIN & MAX TEMP == */}
                </div>
                {/* == DEGREE & DESCRIPTION == */}
                <CloudIcon style={{fontSize: "200px", color: "white"}}/>
              </div>
              {/* == CONTAINER OF DEGREE + CLOUD ICON == */}
            </div>
            {/* == CONTENT == */}
          </div>
          {/* == CARD == */}


          {/* TRANSLATION CONTAINER */}
          <div style={{display: "flex", justifyContent: "end", width: "100%", direction: "rtl"}}>
            <Button style={{color: "white", marginTop: "20px"}} variant="text">انكليزي</Button>
          </div>
          {/* == TRSLATION CONTAINER == */}


        </div>
        {/* == CONTEBT CONTAINER == */}
      </Container>
    </div>
  );
}

export default App;
