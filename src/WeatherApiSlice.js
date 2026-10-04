import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit'
import axios from 'axios';

export const WeatherApiSlice = createSlice({
    name: 'weatherApi',
    initialState: {
        result: "empty",
        weather: {
            number: "",
            description: "",
            min: "",
            max: "",
            icon: "",
        },
        isLoading: false
    },
    reducers: {
        changeResult: (state, action) => {
            state.result = "changed"
        }
    },
    extraReducers: builder => {
    builder
        .addCase(fetchWeather.pending, (state, action) => {
            state.isLoading = true
        })
        .addCase(fetchWeather.fulfilled, (state, action)=>{
            state.isLoading = false
            state.weather = action.payload
        })
        .addCase(fetchWeather.rejected, (state, action)=>{
            state.isLoading = false
        })
    }
})

export const fetchWeather = createAsyncThunk('weatherApi/fetchWeather', async () => {
    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=33.5138&lon=36.2765&appid=585619061c995c0612e7322e751c37c9")
        const number = Math.round(response.data.main.temp - 272.15)
        const description = response.data.weather[0].description
        const min = Math.round(response.data.main.temp_min - 272.15)
        const max = Math.round(response.data.main.temp_max - 272.15)
        const icon = response.data.weather[0].icon
        return {number, description, min, max, icon}
})

// Action creators are generated for each case reducer function
export const { changeResult } = WeatherApiSlice.actions

export default WeatherApiSlice.reducer