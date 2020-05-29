import React from 'react';
import { Link } from 'react-router';
import {initArticles, initComments} from "../actions/actionCreators";
const Main = React.createClass({
    componentDidMount() {
        this.props.dispatch(initArticles());
        this.props.dispatch(initComments());  
    },
    render() {
        return (
                <div>
                    <h1>
                        <Link className="link-default" to="/">Agile Gateway</Link>
                    </h1>
                    <div className="subtitle">Entrance to the world of Agile</div>
                
                    {React.cloneElement(this.props.children, this.props)}
                </div>
                )
    }
});

export default Main;