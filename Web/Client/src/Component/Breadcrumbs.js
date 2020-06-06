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
                <div className="breadcrumbsItem"><div className="breadcrumbsSeparator">{this.props.separator}</div><Link to={href}>{link.text}</Link></div>
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