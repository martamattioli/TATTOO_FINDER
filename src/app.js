import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Routes from './components/utility/Routes';

import 'bootstrap-css-only';
import 'font-awesome/css/font-awesome.css';
import './scss/style.scss';

class App extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <header>
                        <p><Link to="/">Home</Link></p>
                    </header>
                    <main>
                        <Routes />
                    </main>
                </div>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));