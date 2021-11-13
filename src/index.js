import React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import App from './App';

ReactDOM.render(
  <StyledEngineProvider>
    <App/>
  </StyledEngineProvider>,
  document.getElementById('root')
)