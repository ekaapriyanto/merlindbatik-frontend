import React from "react"
import "./Footer.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons"
import fb from "../../../Assets/icons/facebook.png"
import tt from "../../../Assets/icons/twitter.png"
import ig from "../../../Assets/icons/instagram.png"
import wa from "../../../Assets/icons/whatsapp.png"

class Footer extends React.Component{
    render(){
        return(
            <div className="footer bg-blue">
                <div className="container footer-text">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-2 mt-5">
                            <h5 className="footer-menu-title ml-5">Support</h5>
                            <ul className="general-listing mt-3 ml-5">
                                <li style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} className="mr-2"/>
                                    Contact Us
                                </li>
                                <li style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} className="mr-2" />
                                    Privacu Policy
                                </li>
                                <li style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} className="mr-2"/>
                                    Terms & Condition
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-2 mt-5">
                            <h5 className="footer-menu-title ml-5">Shooping</h5>
                            <ul className="general-listing mt-3 ml-5">
                                <li style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} className="mr-2"/>
                                    FAQ
                                </li>
                                <li style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} className="mr-2" />
                                    How To Buy
                                </li>
                                <li style={{listStyleType: "none"}}>
                                    <FontAwesomeIcon icon={faChevronCircleRight} className="mr-2" />
                                    Find Our Store
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-5 text-center">
                            <img src={fb} width="50px" />
                            <img src={tt} width="50px" />
                            <img src={ig} width="50px" />
                            <img src={wa} width="50px" />
                        </div>
                    </div>
                    <div>
                        <hr style={{border: "solid", backgroundColor: "#fffff"}}/>
                        <div className="d-flex">
                            <p>
                                Copyrigt © 2020 Merlind Batik
                                <br/>
                                Developed By Eka Apriyanto
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;