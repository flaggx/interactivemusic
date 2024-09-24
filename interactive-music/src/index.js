import {createRoot} from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import GqlProvider from "./apolloClientProvider";




import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import * as dotenv from 'dotenv';
dotenv.config()


const container = document.getElementById("root");

const root = createRoot(container);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Auth0ProviderWithNavigate>
              <GqlProvider>
                <App />
              </GqlProvider>
          </Auth0ProviderWithNavigate>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
