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
                <Route path="/">
                    <Main fraction="Wehrmacht" />
                </Route>
                <Route path="/fefe">
                    <Fefe />
                </Route>
                <Route path="/Wehrmacht">
                    <Main fraction="Wehrmacht" />
                </Route>
                <Route path="/Oberkommando">
                    <Main fraction="Oberkommando" />
                </Route>
                <Route path="/Soviet">
                    <Main fraction="Soviet" />
                </Route>
                <Route path="/Us">
                    <Main fraction="Us" />
                </Route>
                <Route path="/British">
                    <Main fraction="British" />
                </Route>
                </Switch>
        </Router>
    );
}