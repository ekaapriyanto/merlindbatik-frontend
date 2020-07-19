import React from "react";
import Brand from "../../../Assets/images/brand.png"
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUserAlt} from "@fortawesome/free-solid-svg-icons/";
import { Dropdown, DropdownItem, DropdownToggle,DropdownMenu} from "reactstrap";
import { logoutHandler, fillCart } from "../../../Redux/Actions/user"
import ButtonUI from "../Buttons/Button";
import logout from "../../../Assets/icons/logout.png"
import profil from "../../../Assets/icons/user.png"
import {navbarInputHandler} from "../../../Redux/Actions/search"

const CircleBg = ({ children }) => {
  return <div className="circle-bg">{children}</div>;
};

class Navbar extends React.Component {
  state = {
    searchBarIsFocused: false,
    searcBarInput: "",
    dropdownOpen: false,
  };

  onFocus = () => {
    this.setState({ searchBarIsFocused: true });
  };

  onBlur = () => {
    this.setState({ searchBarIsFocused: false });
  };

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  logoutBtnHandler = () =>{
    this.props.logoutHandler()
    console.log(this.props.user.username)
  }

  render() {
    return (
      <div>
        <div className="text-center" style={{backgroundColor: "#032a5d"}}>
          <img src={Brand}/>
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center py-2 navbar-container">
          <Link  to="/" style={{ textDecoration: "none", color: "blue" }}>Home</Link>
          <Link to="/shop" className="ml-4" style={{ textDecoration: "none", color: "blue" }}>Shop</Link>
          <Link className="ml-4" style={{ textDecoration: "none", color: "blue" }}>New Arrivals</Link>
          <Link className="ml-4" style={{ textDecoration: "none", color: "blue" }}>Sale Items</Link>
          <Link className="ml-4" style={{ textDecoration: "none", color: "blue" }}>Story</Link>
          <Link className="ml-4" style={{ textDecoration: "none", color: "blue" }}>News</Link>
          <div style={{ flex: 1 }} className="px-5 d-flex flex-row justify-content-start">
            
          </div>
          <div className="d-flex flex-row align-items-center">
            {this.props.user.id ? (
              <>
              {this.props.user.role === "admin" ? (
                <>
                <Dropdown toggle={this.toggleDropdown} isOpen={this.state.dropdownOpen}>
                  <DropdownToggle tag="div" className="d-flex">
                    <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: 24 }} />
                    <p className="small ml-3 mr-4">{this.props.user.username}</p>
                  </DropdownToggle>
                  <DropdownMenu className="mt-2">
                    <DropdownItem>
                      <Link style={{ color: "inherit", textDecoration: "none" }} to="/admin/dashboard">
                        Dashboard
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/admin/dataMember" style={{color: "inherit", textDecoration: "none"}}>
                        Member
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/admin/payment" style={{ color: "inherit", textDecoration: "none" }}>
                        Payments
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/admin/report" style={{ color: "inherit", textDecoration: "none" }}>
                        Report product
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/" onClick={this.logoutBtnHandler} style={{textDecoration:"none"}}>
                        Logout
                        <img src={logout} width="20px" className="ml-2"/>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </>
              ) : (
                <>
                <Link
                  className="d-flex flex-row"
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faShoppingCart}
                    style={{ fontSize: 24 }}
                  />
                  <CircleBg>
                    <small style={{ color: "#3C64B1", fontWeight: "bold" }}>
                      {this.props.user.cartItems}
                    </small>
                  </CircleBg>
                  </Link>
                  <Dropdown toggle={this.toggleDropdown} isOpen={this.state.dropdownOpen} className="ml-5">
                  <DropdownToggle tag="div" className="d-flex">
                    <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: 24 }} />
                    <p className="small ml-3 mr-4">{this.props.user.username}</p>
                  </DropdownToggle>
                  <DropdownMenu className="mt-3">
                    <DropdownItem>
                      <Link to="/userprofil">
                        <img src={profil} width="20px" className="mr-2"/>Profil
                      </Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/history">History</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/" onClick={this.logoutBtnHandler} style={{textDecoration:"none"}}>
                        Logout
                        <img src={logout} width="20px" className="ml-2"/>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                </>
              )}
              </>
            ) : (
              <>
                  <Link to="/signin" style={{textDecoration:"none"}}>
                    <ButtonUI type="outlined">Sign in</ButtonUI>
                  </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    search: state.search,
  };
};

const mapDispatchToProps = {
  logoutHandler,
  onChangeSearch: navbarInputHandler,
  fillCart,

};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);