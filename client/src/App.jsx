import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Typography,
  Link,
} from '@material-ui/core';

import Contract from './components/Contract/Contract';
import Pers from './components/Contract/Pers';


function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <p style={{ textAlign: 'center' }}>
            <img src="../logo.png" alt="logo" height="100" />
            <Typography variant="h6">
              <Link href="http://www.tekvympel.ru/" target="_blank">ТЭК "Вымпел"</Link>
            </Typography>
          </p>
        </Route>
        
        <Route path="/contract/:logist" exact>
          <Contract />
        </Route>

        <Route path="/pers/" exact>
          <Pers />
        </Route>

        <Route path="/" >
          <Typography>404</Typography>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
