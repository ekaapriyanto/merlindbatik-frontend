import React from "react"
import bgChgPassword from "../../../Assets/images/bg-login3.png"
import "./AuthScreen.css"
import Axios from "axios"
import { API_URL } from "../../../Constants/API"
import swal from "sweetalert"

const styles = {
    bgContainer: {
      backgroundImage: `url(${bgChgPassword})`
    },
  }

class ChangePassword extends React.Component{
    state = {
        changePasswordForm: {
            email: this.props.match.params.email,
            password: "",
            kondisiSudahGanti: false,
            verify: this.props.match.params.verify
        }
    }

    inputHandler = (e, field, form) => {
        const { value } = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            },
        });
    }

    gantiPasswordHandler = () =>{
        console.log(this.props.match.params.email)
        Axios.put(`${API_URL}/members/changepassword/`,this.state.changePasswordForm)
        .then((res)=>{
            console.log(res.data)
            swal("Sukses!","Password Sudah Diganti", "success")
            this.setState({
                kondisiSudahGanti: true
            })
        })
        .catch((err)=>{
            console.log(err)    
        })
    }

    render(){
        return(
            <div className="limiter" style={styles.bgContainer}>
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-form-title" style={styles.bgContainer}>
                            <span className="login100-form-title-1">Change Password</span>
                        </div>
                        <form className="login100-form">
                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Input new Password</span>
                                <input className="input100" type="text" placeholder="Input New Password" onChange={(e) => this.inputHandler(e, "password", "changePasswordForm")} value={this.state.changePasswordForm.password}/>
                                <span className="focus-input100"></span>
                            </div>
                        </form>
                        <div className="container-login100-form-btn mb-5">
                            <button className="login100-form-btn" onClick={this.gantiPasswordHandler}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ChangePassword;