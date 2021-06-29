import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  Typography,
} from '@material-ui/core';

import Contract from './components/Contract/Contract';


function App() {
  return (
    <Router>
      <Switch>

        <Route path="/" exact>
          <Typography>Главная</Typography>
        </Route>
        
        <Route path="/contract/:logist" exact>
          <Contract />
        </Route>

        <Route path="/" >
          <Typography>404</Typography>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
