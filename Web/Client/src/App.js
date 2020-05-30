import React from "react";
import Main from "./Main";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Main />
                <Switch>
                    <Route path="/about">
                    </Route>
                    <Route path="/users">
                    </Route>
                    <Route path="/">
                    </Route>
                </Switch>
        </Router>
    );
}