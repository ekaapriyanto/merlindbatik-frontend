import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Cookies from "universal-cookie";

import TextField from "../../Components/TextField/TextField";
import ButtonUI from "../../Components/Buttons/Button";
import "./AuthScreen.css";

// actions
import { loginHandler } from "../../../Redux/Actions";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import swal from "sweetalert";
import iklanAuth from "../../../Assets/images/Showcase/batikslide1.jpg"
import BgAuth from "../../../Assets/images/bg-login1.png"
import { get } from "http";

const styles = {
  bgContainer: {
    backgroundImage: `url(${BgAuth})`
  }
}


class AuthScreen extends React.Component {
  state = {
    activePage: "register",
    loginForm: {
      username: "",
      password: "",
      showPassword: false,
    },
    registerForm: {
      username: "",
      password: "",
      rePassword: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      province: "",
      city: "",
      district: "",
      zipCode: "",

      showPassword: false,
    },
  };

  inputHandler = (e, field, form) => {
    const { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  }

  registerHandler = () => {
    const {
      username,
      password,
      rePassword,
      name,
      email,
      phone,
      address,
      province,
      city,
      district,
      zipCode,
    } = this.state.registerForm

    if( username == "" || password == "" || name == "" || email == "" || phone == 0 || address == "" || province == "" || city == "" || district == "" || zipCode == 0){
      swal("data tidak lengkap")
    } else {
      if (password == rePassword){
        Axios.post(`${API_URL}/members`, {
          ...this.state.registerForm
        })
        .then((res) => {
          console.log(res.data)
          swal("Success!", "Register Succes, Silahkan Login", "succes")
        })
        .catch((err)=>{
          console.log(err.response.data)
          swal("Failed", err.response.data.message,"error")
        })
      } else {
        swal("password tidak sama dengan repassword")
      }
    }
  }

  loginBtnHandler = () => {
    const { username, password } = this.state.loginForm;
    let newUser = {
      username,
      password,
    };

    this.props.onLogin(newUser);
  };

  componentDidUpdate() {
    if (this.props.user.id) {
      const cookie = new Cookies();
      cookie.set("authData", JSON.stringify(this.props.user), { path: "/" });
    }
  }

  checkboxHandler = (e, form) => {
    const { checked } = e.target;

    console.log(checked);

    this.setState({
      [form]: {
        ...this.state[form],
        showPassword: checked,
      },
    });
  };

  renderAuthComponent = () => {
    const { activePage } = this.state;
    if (activePage == "register") {
      return (
        <div className="mt-3">
          <h3>Register</h3>
          <TextField
            value={this.state.registerForm.username}
            onChange={(e) => this.inputHandler(e, "username", "registerForm")}
            placeholder="Username"
            className="mt-5"
          />
          <div className="d-flex mt-2">
          <TextField
            value={this.state.registerForm.password}
            onChange={(e) => this.inputHandler(e, "password", "registerForm")}
            placeholder="Password"
            type={this.state.registerForm.showPassword ? "text" : "password"}
          />
          <TextField
            value={this.state.registerForm.Repassword}
            onChange={(e) => this.inputHandler(e, "rePassword", "registerForm")}
            placeholder="Re-password"
            className="ml-2"
            type={this.state.registerForm.showPassword ? "text" : "password"}
          />
          </div>
          <input
            type="checkbox"
            onChange={(e) => this.checkboxHandler(e, "registerForm")}
            className="mt-3"
            name="showPasswordRegister"
          />{" "}
          Show Password
          <TextField
            value={this.state.registerForm.name}
            onChange={(e) => this.inputHandler(e, "name", "registerForm")}
            placeholder="Name"
            className="mt-2"
          />
          <TextField
            value={this.state.registerForm.email}
            onChange={(e) => this.inputHandler(e, "email", "registerForm")}
            placeholder="Email"
            className="mt-2"
          />
          <TextField
            value={this.state.registerForm.address}
            onChange={(e) => this.inputHandler(e, "address", "registerForm")}
            placeholder="Address"
            className="mt-2"
          />
          <div className="d-flex mt-2">
            <TextField
              value={this.state.registerForm.province}
              onChange={(e) => this.inputHandler(e, "province", "registerForm")}
              placeholder="Province"
            />
            <TextField
            value={this.state.registerForm.city}
            onChange={(e) => this.inputHandler(e, "city", "registerForm")}
            placeholder="City"
            className="ml-2"
          />
          </div>
          <div className="d-flex mt-2">
            <TextField
              value={this.state.registerForm.district}
              onChange={(e) => this.inputHandler(e, "district", "registerForm")}
              placeholder="District"
            />
            <TextField
            value={this.state.registerForm.zipCode}
            onChange={(e) => this.inputHandler(e, "zipCode", "registerForm")}
            placeholder="Zip Code"
            className="ml-2"
          />
          </div>
          <TextField
              value={this.state.registerForm.phone}
              onChange={(e) => this.inputHandler(e, "phone", "registerForm")}
              placeholder="Phone"
              className="mt-2"
            />
          <div className="d-flex justify-content-center">
            <ButtonUI
              type="contained"
              onClick={this.registerHandler}
              className="mt-4 mb-5"
            >
              Register
            </ButtonUI>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-3">
          <h3>Log In</h3>
          <TextField
            value={this.state.loginForm.username}
            onChange={(e) => this.inputHandler(e, "username", "loginForm")}
            placeholder="Username"
            className="mt-5"
          />
          <TextField
            value={this.state.loginForm.password}
            onChange={(e) => this.inputHandler(e, "password", "loginForm")}
            placeholder="Password"
            className="mt-2"
            type={this.state.registerForm.showPassword ? "text" : "password"}
          />
          <input
            type="checkbox"
            onChange={(e) => this.checkboxHandler(e, "registerForm")}
            className="mt-3"
            name="showPasswordRegister"
          />{" "}
          Show Password
          <br/>
          <Link to="/forgotpassword" style={{textDecoration: "none"}}>forgot password</Link>
          <div className="d-flex justify-content-center">
            <ButtonUI
              onClick={this.loginBtnHandler}
              type="contained"
              className="mt-4 mb-5"
            >
              Login
            </ButtonUI>
          </div>
        </div>
      );
    }
  };

  

  render() {
    if (this.props.user.id > 0) {
      return <Redirect to="/" />;
    }
    return (
      <div style={styles.bgContainer}>
      <div className="container">
        <div className="row">
          <div className="col-5 mt-5">
            <div className="d-flex flex-row">
              <ButtonUI
                className={`auth-screen-btn ${
                  this.state.activePage == "register" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "register" })}
              >
                Register
              </ButtonUI>
              <ButtonUI
                className={`ml-3 auth-screen-btn ${
                  this.state.activePage == "login" ? "active" : null
                }`}
                type="outlined"
                onClick={() => this.setState({ activePage: "login" })}
              >
                Login
              </ButtonUI>
            </div>
            {this.props.user.errMsg ? (
              <div className="alert alert-danger mt-3">
                {this.props.user.errMsg}
              </div>
            ) : null}
            {this.renderAuthComponent()}
          </div>
          <div className="col-7 text-center mt-5">
            <img src={iklanAuth} alt="" width="700px"/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
