import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import BatikSlide1 from "../../../Assets/images/Showcase/batikslide1.jpg";
import BatikSlide2 from "../../../Assets/images/Showcase/batikslide2.jpg";
import BatikSlide3 from "../../../Assets/images/Showcase/batikslide3.jpg";
import BatikCouple from "../../../Assets/images/Showcase/batikcouple.png";
import BatikMen from "../../../Assets/images/Showcase/batikmen.png";
import BatikWoman from "../../../Assets/images/Showcase/batikwoman.png";

import { Carousel, CarouselItem, CarouselControl } from "reactstrap";

const dummy = [
    {
        image: BatikSlide1,
        id: 1,
    },
    {
        image: BatikSlide2,
        id: 2,
    },
    {
        image: BatikSlide3,
        id: 3,
    },
];

class Home extends React.Component {

    state = {
        activeIndex: 0,
        animating: false,
        bestSellerData: [],
        categoryFilter: "",
    };

    renderCarouselItems = () => {
        return dummy.map(({ image, id}) => {
            return (
                <CarouselItem
                    onExiting={() => this.setState({ animating: true})}
                    onExited={() => this.setState({ animating: false})}
                    key={id.toString()}
                >
                    <div className="carousel-item-home">
                        <div className="container">
                            <img src={image} alt="" style={{ width: "1080px", height: "600px"}} />
                        </div>
                    </div>
                </CarouselItem>
            );
        });
    };

    nextHandler = () => {
        if (this.state.animating) return;
        let nextIndex =
            this.state.activeIndex === dummy.length - 1
            ? 0
            : this.state.activeIndex + 1;
            this.setState({ activeIndex: nextIndex });
    };

    prevHandler = () => {
        if (this.state.animating) return;
        let prevIndex =
            this.state.activeIndex === 0
            ? dummy.length - 1
            : this.state.activeIndex - 1;
            this.setState({ activeIndex: prevIndex });
    };

    
    render() {
        return (
            <div>
                <Carousel
                    className="carousel-item-home-bg"
                    next={this.nextHandler}
                    previous={this.prevHandler}
                    activeIndex={this.state.activeIndex}
                >
                    {this.renderCarouselItems()}
                    <CarouselControl
                    directionText="Previous"
                    direction="prev"
                    onClickHandler={this.prevHandler}
                    />
                    <CarouselControl
                    directionText="Next"
                    direction="next"
                    onClickHandler={this.prevHandler}
                    />
                </Carousel>
                <div className="bg-light spacer">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-6">
                            <Link to="/shop?cat=tab" style={{ color: "inhirit" }} onClick={() => this.setState({ categoryFilter: "tab" })}>
                            <img className="img-fluid" src={BatikCouple} />
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <Link to="/shop" style={{ color: "inhirit" }} onClick={() => this.setState({ categoryFilter: "laptop" })}>
                            <img className="img-fluid" src={BatikWoman} />
                            </Link>
                            <Link to="/shop" style={{ color: "inhirit" }} onClick={() => this.setState({ categoryFilter: "phone" })}>
                            <img className="img-fluid" src={BatikMen} />
                            </Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;