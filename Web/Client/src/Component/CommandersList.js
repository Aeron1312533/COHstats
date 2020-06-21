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
        var isActiveSet = false;
        return this.state.commanders.map(element => {
            var isElementActive = false;
            if (!isActiveSet && typeof this.props.match.params.id == 'undefined') {
                isActiveSet = true;
                isElementActive = true;
            } else if (!isActiveSet && typeof this.props.match.params.id != 'undefined'){
                isActiveSet = true;
                isElementActive = true;
            }
            return (
                <CommanderListItem {...this.props} isActive={isElementActive} commanderInfo={element} key={element.commanderKey} />
            );
        });
    };
    render() {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 3
            },
            desktop: {
                breakpoint: { max: 3000, min: 1200 },
                items: 3
            },
            tablet: {
                breakpoint: { max: 1200, min: 464 },
                items: 2,
                partialVisibilityGutter: 30
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                partialVisibilityGutter: 30
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
                    partialVisible
                >
                    {this.list()}
                </Carousel>
            </div>
        )
    }
}