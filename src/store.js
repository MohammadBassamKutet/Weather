import { configureStore } from '@reduxjs/toolkit'
import WeatherApiSlice from './WeatherApiSlice'

export default configureStore({
    reducer: {
        weather: WeatherApiSlice
    }
})