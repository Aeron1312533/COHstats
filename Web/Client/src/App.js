import React from "react";
import Main from "./Main";
import Fefe from "./Component/Fefe";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/fefe">
                    <Fefe />
                </Route>

                </Switch>
        </Router>
    );
}