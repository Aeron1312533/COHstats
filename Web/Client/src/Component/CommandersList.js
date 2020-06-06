import React from 'react';
import CommanderListItem from './CommanderListItem';
import '../Styles/CommandersList.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        return (
            <div className="commanders">
                <Carousel
                    responsive={responsive}
                    draggable={false}
                    slidesToSlide={2}
                    showDots
                    renderDotsOutside
                >
                    {this.list()}
                </Carousel>
            </div>
        )
    }
}