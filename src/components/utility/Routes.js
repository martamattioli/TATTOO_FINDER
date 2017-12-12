import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../statics/Home';
import StudiosIndex from '../studios/StudiosIndex';

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/studios" component={StudiosIndex} />
        </Switch>
    );
}

export default Routes;