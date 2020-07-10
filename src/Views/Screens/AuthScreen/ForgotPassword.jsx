import React from "react"
import bgForgotPassoword from "../../../Assets/images/bg-login3.png"
import "./AuthScreen.css"
import Axios from "axios"
import { API_URL } from "../../../Constants/API"
import swal from "sweetalert"

const styles = {
    bgContainer: {
      backgroundImage: `url(${bgForgotPassoword})`
    },
  }

class ForgotPassword extends React.Component{
    state = { email: "" }

    inputHandler = (e, field, form) => {
        const {value} = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    }

    kirimEmailBtnHandler = () => {
        // console.log(this.state.email)
        Axios.get(`${API_URL}/members/forgotpassword/${this.state.email}`)
        .then((res)=>{
            console.log(res.data)
            swal("Sukses!", `Check Your Email To Change the password`, "success");
        })
        .catch((err)=>{
            swal("Failed!", err.response.data.message, "error");
            console.log(err.response.data)
        })
    }
    render(){
        return(
            <div className="limiter" style={styles.bgContainer}>
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form-title" style={styles.bgContainer}>
                            <span className="login100-form-title-1">Forgot Password</span>
                        </div>
                        <form className="login100-form">
                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Email</span>
                                <input 
                                    className="input100" 
                                    type="text" 
                                    onChange={(e) => this.setState({email: e.target.value})} 
                                    value={this.state.email}
                                    placeholder="Input Email"/>
                                <span className="focus-input100"></span>
                            </div>
                        </form>
                        <div className="container-login100-form-btn mb-5">
                            <button className="login100-form-btn" onClick={this.kirimEmailBtnHandler}>kirim email</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ForgotPassword;