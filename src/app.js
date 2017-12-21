import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import SassVariables from './components/utility/SassVariables';

import Routes from './components/utility/Routes';
import Navbar from './components/utility/Navbar';

import 'bootstrap-css-only';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

const theme = SassVariables;

class App extends React.Component {
  render() {
    return(
      <ThemeProvider theme={ theme }>
        <Router>
          <div className="container-fluid">
            <Navbar
              logout={this.logout}
            />
            <main>
              <Routes />
            </main>
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
