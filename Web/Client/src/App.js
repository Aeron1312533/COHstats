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
                <Route
                    path="/Wehrmacht/Commanders/:idCommander/Abilities/:idAbility"
                    render={(props) => <Main fraction="Wehrmacht" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht/Commanders/:id"
                    render={(props) => <Main fraction="Wehrmacht" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht"
                    render={(props) => <Main fraction="Wehrmacht" {...props} />}>
                </Route>
                <Route
                    path="/Oberkommando"
                    render={(props) => <Main fraction="Oberkommando" {...props} />}>
                </Route>
                <Route
                    path="/Soviet"
                    render={(props) => <Main fraction="Soviet" {...props} />}>
                </Route>
                <Route
                    path="/Us"
                    render={(props) => <Main fraction="Us" {...props} />}>
                </Route>
                <Route
                    path="/British"
                    render={(props) => <Main fraction="British" {...props} />}>
                </Route>
                <Route
                    path="/"
                    render={(props) => <Main fraction="Wehrmacht" {...props} />}>
                </Route>
                </Switch>
        </Router>
    );
}