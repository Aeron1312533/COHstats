import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Breadcrumbs.css';

export default class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
    }

    list = () => {
        return this.props.links.map(link => {
            //let isActive = (element == this.props.active) ? true : false;
            let href = () => {
                switch (link.type) {
                    case "page":
                        return ("/" + this.props.fraction + "/" + link.link);
                    case "fraction":
                        return ("/" + link.link);
                    default:
                        return "";
                }
            }

            return (
                <span><span className="breadcrumbsSeparator">{this.props.separator}</span><Link to={href}>{link.text}</Link></span>
            );
        });
    };

    render() {
        return (
            <div className="breadcrumbs">
                {this.list()}
            </div>
        )
    }
}