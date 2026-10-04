import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import i18n from './i18n';
import store from './store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
