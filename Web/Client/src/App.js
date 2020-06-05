import React from "react";
import Main from "./Main";
import Fefe from "./Component/Fefe";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

console.log(process.env);
export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/fefe">
                    <Fefe />
                </Route>
                <Route
                    path="/Wehrmacht/Commanders/:idCommander/Abilities/:idAbility"
                    render={(props) => <Main fraction="Wehrmacht" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht/Commanders/:id"
                    render={(props) => <Main fraction="Wehrmacht" page="Commanders" {...props} />}>
                </Route>
                <Route
                    path="/Wehrmacht"
                    render={(props) => <Main fraction="Wehrmacht" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/Oberkommando"
                    render={(props) => <Main fraction="Oberkommando" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/Soviet"
                    render={(props) => <Main fraction="Soviet" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/Us"
                    render={(props) => <Main fraction="Us" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/British"
                    render={(props) => <Main fraction="British" page="Home" {...props} />}>
                </Route>
                <Route
                    path="/"
                    render={(props) => <Main fraction="Wehrmacht" page="Home" {...props} />}>
                </Route>
                </Switch>
        </Router>
    );
}