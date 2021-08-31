import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Typography,
  Box,
} from '@material-ui/core';

// import Contract from './components/Contract/Contract';
import Pers from './components/Contract/Pers';
import Contract from "./components/Contract/Contract";
import Uploader from "./components/UploadForm/Uploader";


function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <Box style={{ textAlign: 'center' }}>
            <img src="../logo.png" alt="logo" height="100" />
            <Typography variant="h6">
              ТЭК "Вымпел"
            </Typography>
          </Box>
        </Route>

        <Route path="/uploader/:logist" exact>
          <Uploader />
        </Route>
        
        <Route path="/contract/:logist" exact>
          <Contract />
        </Route>

        <Route path="/pers/" exact>
          <Pers />
        </Route>

        <Route path="/" >
          <Box style={{ textAlign: 'center' }}>
            <img src="../logo.png" alt="logo" height="100" />
            <Typography variant="h6">
              Страница не найдена
            </Typography>
          </Box>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
