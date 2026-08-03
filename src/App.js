import './App.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import "moment/min/locales";
import { useTranslation } from 'react-i18next';
moment.locale("ar");  


let cancelAxios = null
function App() {
  const { t, i18n } = useTranslation();
  const [dateAndtime,  setDateAndtime] = useState(null)
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: ""
  })
  const [lang, setLang] = useState("ar")
  console.log(i18n.store.data);
console.log(i18n.hasResourceBundle("ar", "translation"));
console.log(i18n.getResourceBundle("ar", "translation"));
  useEffect(() => {
    i18n.changeLanguage(lang)
    console.log("max =", t("max"));
    console.log(i18n.language);
  }, []);
  useEffect(() => {
    setDateAndtime(moment().format("MMMM Do YYYY, h:mm:ss a"))
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
  const handelChangeLanguage = () => {
    if (lang === "ar") {
      setLang("en")
      i18n.changeLanguage("en")
      moment.locale("en");  
    } else {
      setLang("ar")
      i18n.changeLanguage("ar")
      moment.locale("ar");
    }

    setDateAndtime(moment().format("MMMM Do YYYY, h:mm:ss a"))
  }
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
            // direction: "rtl"
            direction: lang === "ar" ? "rtl" : "ltr",
            }}>
            {/* CONTENT */}
            <div>
              {/* CITY & TIME */}
              <div style={{display: "flex", direction: lang === "ar" ? "rtl" : "ltr", alignItems: "end", justifyContent: "start"}}>
                <Typography variant="h2" style={{marginRight: "20px", fontWeight: "600"}}>
                  {t("damascus")}
                </Typography>
                <Typography variant="h5" style={{marginRight: "20px"}}>
                  {dateAndtime}
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
                    {t(temp.description)}
                  </Typography>
                  {/* == Description == */}
                  {/* MIN & MAX TEMP */}
                  <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <h5>{t("min")} : {temp.min}</h5>
                    <h5 style={{margin: "0 5px"}}>|</h5>
                    <h5>{t("max")} : {temp.max}</h5>
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
          <div style={{display: "flex", justifyContent: "end", width: "100%", direction: lang === "ar" ? "rtl" : "ltr",}}>
            <Button style={{color: "white", marginTop: "20px"}} variant="text" onClick={handelChangeLanguage}>
              {lang === "ar" ? "الانكليزية" : "ARABIC"}
            </Button>
          </div>
          {/* == TRSLATION CONTAINER == */}


        </div>
        {/* == CONTEBT CONTAINER == */}
      </Container>
    </div>
  );
}

export default App;
