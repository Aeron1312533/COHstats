import React from 'react';
import CommandersList from './CommandersList';
import '../Styles/Body.css';
import Breadcrumbs from './Breadcrumbs';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    returnPage(page) {
        if (page == "Commanders") {
            return (<CommandersList {...this.props} active='false' />);
        }
    }

    getBreadcrumbs() {
        let links = [];

        links.push(
            {
                link: this.props.page,
                text: this.props.page
            }
        );
        links.push(
            {
                link: this.props.page,
                text: this.props.page
            }
        );
        links.push(
            {
                link: this.props.page,
                text: this.props.page
            }
        );
        return links;
    }
    render() {
        return (
            <div className="body">
                <Breadcrumbs links={this.getBreadcrumbs()} />
                {this.returnPage(this.props.page)}
            </div>
        )
    }
}