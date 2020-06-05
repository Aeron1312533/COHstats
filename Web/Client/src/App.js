import React from "react";
import Main from "./Main";
import Fefe from "./Component/Fefe";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const config = require('./config.json');

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/fefe">
                    <Fefe />
                </Route>
                <Route
                    path="/Wehrmacht/Commanders/:idCommander/Abilities/:idAbility"
                    render={(props) => <Main config={config} fraction="Wehrmacht" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht/Commanders/:id"
                    render={(props) => <Main config={config} fraction="Wehrmacht" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht/Commanders"
                    render={(props) => <Main config={config} fraction="Wehrmacht" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht"
                    render={(props) => <Main config={config} fraction="Wehrmacht" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/Oberkommando/Commanders"
                    render={(props) => <Main config={config} fraction="Oberkommando" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Oberkommando"
                    render={(props) => <Main config={config} fraction="Oberkommando" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/Soviet/Commanders"
                    render={(props) => <Main config={config} fraction="Sovier" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Soviet"
                    render={(props) => <Main config={config} fraction="Soviet" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/Us/Commanders"
                    render={(props) => <Main config={config} fraction="Us" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Us"
                    render={(props) => <Main config={config} fraction="Us" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/British/Commanders"
                    render={(props) => <Main config={config} fraction="British" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/British"
                    render={(props) => <Main config={config} fraction="British" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/"
                    render={(props) => <Main config={config} fraction="Wehrmacht" page="Home" {...props} />}>
                </Route>
                </Switch>
        </Router>
    );
}