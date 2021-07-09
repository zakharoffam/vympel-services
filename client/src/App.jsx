import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Typography,
  Link,
  Box,
} from '@material-ui/core';

import Contract from './components/Contract/Contract';
import Pers from './components/Contract/Pers';


function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <Box style={{ textAlign: 'center' }}>
            <img src="../logo.png" alt="logo" height="100" />
            <Typography variant="h6">
              <Link href="http://www.tekvympel.ru/" target="_blank">ТЭК "Вымпел"</Link>
            </Typography>
          </Box>
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
              <Link href="http://www.tekvympel.ru/" target="_blank">ТЭК "Вымпел"</Link>
            </Typography>
          </Box>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
