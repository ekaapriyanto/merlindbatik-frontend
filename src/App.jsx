import React from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import Navbar from './Views/Components/Navbar/Navbar';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Views/Screens/Home/Home';
import AuthScreen from './Views/Screens/AuthScreen/AuthScreen';
import Footer from './Views/Components/Footer/Footer';
import Cookies from 'universal-cookie';
import {userKeepLogin, cookieChecker} from "./Redux/Actions";
import { connect } from "react-redux";
import AdminDashboard from './Views/Screens/Admin/AdminDashboard';
import ForgotPassword from './Views/Screens/AuthScreen/ForgotPassword';
import ChangePassword from './Views/Screens/AuthScreen/ChangePassword';
import ProfilUser from './Views/Screens/User/Profil/ProfilUser';
import PageNotFound from './Views/Screens/PageNotFound';
import Shop from './Views/Screens/Shop/Shop';
import ProductDetails from './Views/Screens/ProductDetails/ProductDetails';

const cookieObj = new Cookies();

class App extends React.Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData", {path: "/"});
    if (cookieResult){
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  renderAdminRoutes = () => {
    if (this.props.user.role === "admin"){
      return (
        <>
        <Route exact path="/admin/dashboard" component={AdminDashboard}/>
        </>
      )
    }
  }

  renderProtectedRoutes = () => {
    if (this.props.user.username){
      return(
        <>
        <Route exact path="/userprofil" component={ProfilUser} />
        <Route/>
        </>
      )
    }
  }
  
  render() {
    if (this.props.user.cookieChecked){
      return (
        <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={AuthScreen} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <Route exact path="/changepassword/:email/:verivy" component={ChangePassword} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/products/:id" component={ProductDetails} />
          {this.renderAdminRoutes()}
          {this.renderProtectedRoutes()}
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer />
        </>
      )
    } else{
      return <div>loading...</div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  keepLogin: userKeepLogin,
  cookieChecker,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
