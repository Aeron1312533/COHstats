import React from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://coh2stats.online/api/v1/showall")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        console.log(items);
        return (
            <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/231430/c89f060dc361fa5fb8b9ad1368c91651a1204ce2.jpg" alt="logo" />
        )
    }
}