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

            let ret = () => {
                let linkClass = (link.active ? "active" : "");

                switch (link.type) {
                    case "page":
                        return (<div className="breadcrumbsItem"><div className="breadcrumbsSeparator">{this.props.separator}</div><Link className={linkClass} to={href()}>{link.text}</Link></div>)
                    case "fraction":
                        return (<div className="breadcrumbsItem"><Link className={linkClass} to={href()}>{link.text}</Link></div>);
                    default:
                        return "";
                }
            }
            return ret();
        });
    };

    render() {
        let imgSrc = "/Images/Fractions/" + this.props.fraction + ".png";
        return (
            <div className="breadcrumbs">
                <img src={imgSrc} className="breadcrumbsIcon" />
                {this.list()}
            </div>
        )
    }
}