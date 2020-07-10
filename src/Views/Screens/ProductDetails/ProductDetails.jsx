import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import "./ProductDetails.css";
import ButtonUI from "../../Components/Buttons/Button";
import TextField from "../../Components/TextField/TextField";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
//import { fillCart } from "../../../Redux/Actions";

const styles = {
  bgContainer: {
    backgroundImage: `url(https://n6-img-fp.akamaized.net/free-vector/ethnic-floral-seamless-pattern_1159-3574.jpg?size=338&ext=jpg)`
  }
}

class ProductDetails extends React.Component {
  state = {
    productData: {
      image: "",
      productName: "",
      price: 0,
      stockSizeS: "",
      stockSizeM: "",
      stockSizeL: "",
      description: "",
      category: "",
      id: 0,
    },
    stock: ""
  };

  changeStock = (val) => {
    this.setState({
      stock : val
    })
    console.log(this.state.stock)
  }

//   addToCartHandler = () => {
//     // POST method ke /cart
//     // Isinya: userId, productId, quantity
//     // console.log(this.props.user.id);

//     Axios.get(`${API_URL}/carts`, {
//       params: {
//         userId: this.props.user.id,
//         productId: this.state.productData.id,
//       },
//     }).then((res) => {
//       if (res.data.length) {
//         Axios.put(`${API_URL}/carts/${res.data[0].id}`, {
//           userId: this.props.user.id,
//           productId: this.state.productData.id,
//           quantity: res.data[0].quantity + 1,
//         })
//           .then((res) => {
//             swal(
//               "Add to cart",
//               "Your item has been added to your cart",
//               "success"
//             );
//             this.props.onFillCart(this.props.user.id);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       } else {
//         Axios.post(`${API_URL}/carts`, {
//           userId: this.props.user.id,
//           productId: this.state.productData.id,
//           quantity: 1,
//         })
//           .then((res) => {
//             swal(
//               "Add to cart",
//               "Your item has been added to your cart",
//               "success"
//             );
//             this.props.onFillCart(this.props.user.id);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     });
//   };

  componentDidMount() {
    Axios.get(`${API_URL}/products/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ productData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {
      productName,
      image,
      price,
      description,
      stockSizeS,
      stockSizeM,
      stockSizeL,
      id,
    } = this.state.productData;
    return (
      <div style={styles.bgContainer}>
        <div className="container">
        <div className="row py-4">
          <div className="col-6 text-center">
            <img
              style={{ width: "100%", objectFit: "contain", height: "550px" }}
              src={image}
              alt=""
            />
          </div>
          <div className="col-6 d-flex flex-column justify-content-center">
            <h3>{productName}</h3>
            <p>{description}</p>
            <h4>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}
            </h4>
            <p>choose size</p>
            <select onChange={(e) => this.changeStock(e.target.value)} className="custom-text-input">
              <option value={stockSizeS}>Size S</option>
              <option value={stockSizeM}>Size M</option>
              <option value={stockSizeL}>Size L</option>
            </select>
            <p>stock : {this.state.stock}</p>
            {/* <TextField type="number" placeholder="Quantity" className="mt-3" /> */}
            <div className="d-flex flex-row mt-4">
              <ButtonUI>Add To Cart</ButtonUI>
              <ButtonUI className="ml-4" type="outlined">
                Add To Wishlist
              </ButtonUI>
            </div>
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
  //onFillCart: fillCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);