import React from 'react';
import CommandersList from './CommandersList';
import '../Styles/Body.css';
import Breadcrumbs from './Breadcrumbs';
import CommanderDetail from './CommanderDetail';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    returnPage(page) {
        if (page == "Commanders") {
            return (
                <CommandersList {...this.props} />
                <CommanderDetail {...this.props} />
            );
        }
    }

    getBreadcrumbs() {
        let links = [];

        links.push(
            {
                link: this.props.fraction,
                text: this.props.fraction,
                type: "fraction",
                active: false
            }
        );
        links.push(
            {
                link: this.props.page,
                text: this.props.page,
                type: "page",
                active: true
            }
        );

        return links;
    }
    render() {
        return (
            <div className="body">
                <Breadcrumbs {...this.props} links={this.getBreadcrumbs()} separator=" > "/>
                {this.returnPage(this.props.page)}
            </div>
        )
    }
}