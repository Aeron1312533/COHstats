import React from 'react';
import CommanderListItem from './CommanderListItem';
import '../Styles/CommandersList.css';

export default class CommandersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commanders: [],
            isLoaded: false,
            error: null
        };
    }
    loadData(fraction) {
        //get fraction and load fraction commanders
        let url = this.props.config.API + "commanders/fraction/" + fraction;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        commanders: result,
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
        this.loadData(this.props.fraction);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.fraction != this.props.fraction) {
            this.loadData(this.props.fraction);
        }
    }

    list = () => {
        return this.state.commanders.map(element => {
            //let isActive = (element == this.props.active) ? true : false;
            return (
                <CommanderListItem {...this.props} commanderInfo={element} key={element.commanderKey} />
            );
        });
    };
    render() {
        return (
            <div className="commanders">
                <ul>
                    {this.list()}
                </ul>
            </div>
        )
    }
}