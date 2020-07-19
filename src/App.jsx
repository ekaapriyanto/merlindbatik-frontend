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
import DataMember from './Views/Screens/Admin/Members/Member';
import Cart from './Views/Screens/Cart/Cart';
import Transaction from './Views/Screens/Transaction/Transaction';
import PaymentAdmin from './Views/Screens/Admin/Payment/Payment';
import HistoryUser from './Views/Screens/User/History/History';
import ReportProduct from './Views/Screens/Admin/Report/Report';

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
        <Route exact path="/admin/datamember" component={DataMember}/>
        <Route exact path="/admin/payment" component={PaymentAdmin} />
        <Route exact path="/admin/report" component={ReportProduct} />
        </>
      )
    }
  }

  renderProtectedRoutes = () => {
    if (this.props.user.username){
      return(
        <>
        <Route exact path="/userprofil" component={ProfilUser} />
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/transaction/:id" component={Transaction} />
        <Route exact path="/history" component={HistoryUser}/>
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
