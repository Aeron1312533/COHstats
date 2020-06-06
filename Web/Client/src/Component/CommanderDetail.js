import React from 'react';
import '../Styles/CommanderDetail.css';

export default class CommanderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoaded: false,
            error: null
        };
    }

    loadData(commanderKey) {
        //get fraction and load fraction commanders
        let url = this.props.config.API + "commander/id/" + commanderKey;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        data: result,
                        isLoaded: true
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )
    }
    componentDidMount() {
        this.loadData(this.props.commanderKey);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.commanderKey != this.props.commanderKey) {
            this.loadData(this.props.commanderKey);
        }
    }

    render() {
       
        return (
            <div>{this.state.data.description}
            </div>
        )
    }
}