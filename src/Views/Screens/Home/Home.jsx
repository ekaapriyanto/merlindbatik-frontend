import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import BatikSlide1 from "../../../Assets/images/Showcase/batikslide1.jpg";
import BatikSlide2 from "../../../Assets/images/Showcase/batikslide2.jpg";
import BatikSlide3 from "../../../Assets/images/Showcase/batikslide3.jpg";
import BatikCouple from "../../../Assets/images/Showcase/batikcouple.png";
import BatikMen from "../../../Assets/images/Showcase/batikmen.png";
import BatikWoman from "../../../Assets/images/Showcase/batikwoman.png";
import Cimb from "../../../Assets/images/logo-cimbniaga.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowAltCircleLeft, faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons"
import { Carousel, CarouselItem, CarouselControl } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import ProductCard from "../../Components/Cards/ProductCard";

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
        newArrival: []
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

    getNewArrival = () => {
        Axios.get(`${API_URL}/products/new`)
        .then((res) => {
            console.log(res.data)
            this.setState({ newArrival: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderNewArrival = () => {
        return this.state.newArrival.map((val) => {
            return (
                <ProductCard
                  key={val.id}
                  data={val}
                  className="m-2"
                />
            )
        })
    }

    componentDidMount(){
        this.getNewArrival()
    }

    
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
                        <div className="container mt-1">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <h1 className="heading-title">NEW ARRIVALS</h1>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12">
                                    {this.renderNewArrival()}
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <Link to="/shop" style={{ color: "inhirit" }} onClick={() => this.setState({ categoryFilter: "tab" })}>
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
                        <div className="container mt-5">
                            <p className="text-dark sf-title text-center mb-5">
                                Our awesome partners to help us in best possible way
                            </p>
                            <div className="row" style={{opacity: "0.5"}}>
                                <div className="col-lg-3 col-md-3">
                                    <img src="https://www.riantybatik.com/images/fe/partner/midtrans.png"/>
                                </div>
                                <div className="col-lg-2 col-md-3">
                                    <img src="https://www.riantybatik.com/images/fe/partner/visa.png"/>
                                </div>
                                <div className="col-lg-2 col-md-3">
                                    <img src="https://www.riantybatik.com/images/fe/partner/bca.png"/>
                                </div>
                                <div className="col-lg-3 col-md-3">
                                    <img src={Cimb} width="200px"/>
                                </div>
                                <div className="col-lg-2 col-md-3">
                                    <img src="https://www.riantybatik.com/images/fe/partner/bni.png"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Home;