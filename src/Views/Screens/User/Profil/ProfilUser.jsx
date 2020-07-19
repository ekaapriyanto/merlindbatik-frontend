import React from "react";
import "./ProfilUser.css"
import hallo from "../../../../Assets/images/welcome.png"
import {Modal, ModalHeader, ModalBody} from "reactstrap"
import swal from "sweetalert"
import TextField from "../../../Components/TextField/TextField";
import ButtonUI from "../../../Components/Buttons/Button";
import { connect } from "react-redux";
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { changeProfilUser } from "../../../../Redux/Actions/user"

const styles = {
  bgContainer: {
    backgroundImage: `url(https://n6-img-fp.akamaized.net/free-vector/ethnic-floral-seamless-pattern_1159-3574.jpg?size=338&ext=jpg)`
  }
}
class ProfilUser extends React.Component{
    state = {
        editProfileForm : {
            id: this.props.user.id,
            name: this.props.user.name,
            username: this.props.user.username,
            email: this.props.user.email,
            phone: this.props.user.phone,
            address: this.props.user.address,
            district: this.props.user.district,
            city: this.props.user.city,
            province: this.props.user.province,
            zipCode: this.props.user.zipCode,
        },
        editPasswordForm : {
            id: this.props.user.id,
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        modalOpenProfil: false,
        modalOpenPassword: false,
    }

    inputHandler = (e, field, form) => {
        const {value} = e.target;
        this.setState({
            [form]: {
                ...this.state[form],
                [field]: value,
            }
        })
    }

    toggleModalProfil = () => {
        this.setState({ modalOpenProfil: !this.state.modalOpenProfil })
    }
    
    toggleModalPassword = () => {
        this.setState({ modalOpenPassword: !this.state.modalOpenPassword })
    }

    editProfilBtnHandler = () => {
        this.setState({
            editProfileForm: {
                ...this.state.editProfileForm
            },
            modalOpenProfil: true,
        })
    }
    editPasswordBtnhandler = () => {
        this.setState({
            modalOpenPassword: true,
        })
    }

    saveEditBtnHandler = () => {
        Axios.put(`${API_URL}/members/editprofile`,this.state.editProfileForm)
        .then((res) => {
            console.log(res.data)
            swal("Success", "Your Data Has Been Changed", "success")
            this.setState({ modalOpenProfil: false })
            this.props.changeProfilUser(res.data)
        })
        .catch((err) => {
            console.log(err)
            swal("Failed", err.response.data.message,"error")
        })
    }

    saveEditPasswordBtnHandler = () =>{
        if( this.state.editPasswordForm.newPassword == this.state.editPasswordForm.confirmPassword){
            Axios.get(`${API_URL}/members/passwordchange/${this.state.editPasswordForm.id}/${this.state.editPasswordForm.password}/${this.state.editPasswordForm.newPassword}`)
            .then((res) => {
                console.log(res.data)
                swal("Success!", "Your password has been changed", "succes");
                this.setState({modalOpenPassword: false})
            })
            .catch((err) => {
                console.log(err);
                swal("Failed","Your paassword not Match", "error");
            })
        }else {
            swal("Confimasi password salah")
        }
    }

    render(){
        return(
            <body>
                <div className="banner_inner" style={styles.bgContainer}>
                    <div className="container">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-lg-4">
                                <div className="banner_content">
                                    <h3>Hello</h3>
                                    <h1 className="text-uppercase">{this.props.user.name}</h1>
                                    <h4>username : {this.props.user.username}</h4>
                                    <h4>email: {this.props.user.email}</h4>
                                    <h4>phone : {this.props.user.phone}</h4>
                                    <h4>address : <br/>
                                        {this.props.user.address}<br/>
                                        {this.props.user.district}, {this.props.user.city}<br/>
                                        {this.props.user.province}, {this.props.user.zipCode}<br/>
                                    </h4>
                                    <div className="mt-5 mb-5 row">
                                        <button className="btn-edit" onClick={(_) => this.editProfilBtnHandler()}>Edit Profil</button>
                                        <button className="btn-edit" onClick={(_) => this.editPasswordBtnhandler()}>Edit Password</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="home-right-image">
                                    <img src={hallo} alt="" width="500px"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal toggle={this.toggleModalProfil} isOpen={this.state.modalOpenProfil} className="edit-modal">
                        <ModalHeader toggle={this.toggleModalProfil}>
                            <caption>
                                <h3>Edit Profile</h3>
                            </caption>
                        </ModalHeader>
                        <ModalBody>
                            Edit Nama
                            <TextField value={this.state.editProfileForm.name} onChange={(e) => this.inputHandler(e, "name", "editProfileForm")} placeholder="Edit Name"/>
                            Edit Username
                            <TextField value={this.state.editProfileForm.username} onChange={(e) => this.inputHandler(e, "username", "editProfileForm")} placeholder="Edit Username"/>
                            Edit Email
                            <TextField value={this.state.editProfileForm.email} onChange={(e) => this.inputHandler(e, "email", "editProfileForm")} placeholder="Edit Email"/>
                            Edit Phone
                            <TextField value={this.state.editProfileForm.phone} onChange={(e) => this.inputHandler(e, "phone", "editProfileForm")} placeholder="Edit Phone"/>
                            Edit Address
                            <TextField value={this.state.editProfileForm.address} onChange={(e) => this.inputHandler(e, "address", "editProfileForm")} placeholder="Edit Address"/>
                            <div className="row">
                                <div className="col-6">
                                    Edit Distric
                                    <TextField value={this.state.editProfileForm.district} onChange={(e) => this.inputHandler(e, "district", "editProfileForm")} placeholder="Edit Distric"/>
                                </div>
                                <div className="col-6">
                                    Edit City
                                    <TextField value={this.state.editProfileForm.city} onChange={(e) => this.inputHandler(e, "city", "editProfileForm")} placeholder="Edit City"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Edit Province
                                    <TextField value={this.state.editProfileForm.province} onChange={(e) => this.inputHandler(e, "province", "editProfileForm")} placeholder="Edit Province"/>
                                </div>
                                <div className="col-6">
                                    Edit ZipCode
                                    <TextField value={this.state.editProfileForm.zipCode} onChange={(e) => this.inputHandler(e, "zipCode", "editProfileForm")} placeholder="Edit ZipCode"/>
                                </div>
                            </div>
                            <div className="d-flex mt-3">
                                <ButtonUI className="mr-2" onClick={this.toggleModalProfil} type="outlined">Cancel</ButtonUI>
                                <ButtonUI onClick={this.saveEditBtnHandler} type="contained">Save</ButtonUI>
                            </div>
                        </ModalBody>
                    </Modal>
                    <Modal toggle={this.toggleModalPassword} isOpen={this.state.modalOpenPassword} className="edit-modal">
                        <ModalHeader toggle={this.toggleModalPassword}>
                            <caption>
                                <h3>Change Password</h3>
                            </caption>
                        </ModalHeader>
                        <ModalBody>
                            Old Password
                            <TextField onChange={(e) => this.inputHandler(e, "password", "editPasswordForm")} placeholder="Old Password"/>
                            New Password
                            <TextField onChange={(e) => this.inputHandler(e, "newPassword", "editPasswordForm")} placeholder="New PasswordEdit"/>
                            Confirm New Password
                            <TextField onChange={(e) => this.inputHandler(e, "confirmPassword", "editPasswordForm")} placeholder="Confirm Password"/>
                            <Link to="/forgotpassword">Lupa Password</Link>
                            <div className="d-flex mt-3">
                                <ButtonUI className="mr-2" onClick={this.toggleModalPassword} type="outlined">Cancel</ButtonUI>
                                <ButtonUI onClick={this.saveEditPasswordBtnHandler} type="contained">Save</ButtonUI>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </body>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      user: state.user,
    };
};
const mapDispatchToProps = {
    changeProfilUser,
}
export default connect(mapStateToProps, mapDispatchToProps) (ProfilUser);