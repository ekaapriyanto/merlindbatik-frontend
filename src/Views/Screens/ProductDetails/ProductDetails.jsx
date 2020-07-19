import React from "react";
import { connect } from "react-redux";
import swal from "sweetalert";

import "./ProductDetails.css";
import ButtonUI from "../../Components/Buttons/Button";
import TextField from "../../Components/TextField/TextField";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { fillCart } from "../../../Redux/Actions";

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
    stock: "",
    size: "",
    cart: [],
  };

  changeStock = (val) => {
    if (val == "S") {
      this.setState({ stock: this.state.productData.stockSizeS })
      this.state.size = val
    } else if (val == "M") {
      this.setState({ stock: this.state.productData.stockSizeM })
      this.state.size = val
    } else {
      this.setState({ stock: this.state.productData.stockSizeL })
      this.state.size = val
    }
    console.log(this.state.stock)
    console.log(this.state.size)
  }

  addToCartHandler = () => {
    if (this.props.user.id < 1) {
      swal("Please login to shop")
    } else {
      if (this.state.size == 0) {
        swal("silahkan pilih size")
      } else {
        if (this.state.stock == 0) {
          swal("stock size "+ this.state.size +" kosong")
        } else {
          Axios.get(`${API_URL}/carts/memberCartSize/${this.props.user.id}/${this.state.size}`)
          .then((res) => {
            this.setState({ cart: res.data })
            let checkItems = this.state.cart.findIndex((val) => {
              return (
                val.product.id == this.state.productData.id
              )
            })
            swal("checkItems")
            
            if (checkItems == -1) {
              Axios.post(`${API_URL}/carts/addToCart/${this.props.user.id}/${this.state.productData.id}/${this.state.size}`, {
                quantity: 1,
              })
              .then((res) => {
                console.log(res.data)
                swal("Add To Cart", "New item has been added to your cart", "success")
                this.props.onFillCart(this.props.user.id)
                  //this.props.cartUpdate(this.props.user.id);
              })
              .catch((err) => {
                console.log(err.response);
              })
            } else {
              swal("Add To Cart", "Quantity item has been added to your cart", "success")
              Axios.put(`${API_URL}/carts/addQuantity/${this.state.cart[checkItems].id}`)
              .then((res) => {
                console.log(res.data)
                this.props.onFillCart(this.props.user.id)
              })
              .catch((err) => {
                console.log(err)
              })
            }
          })
        }
      }
    }
  }

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
              <select onChange={(e) => this.changeStock(e.target.value)} className="custom-text-input">
                <option disabled selected>choose size</option>
                <option value="S">Size S</option>
                <option value="M">Size M</option>
                <option value="L">Size L</option>
              </select>
              <p>stock : {this.state.stock}</p>
              <div className="d-flex flex-row mt-4">
                <ButtonUI onClick={this.addToCartHandler}>Add To Cart</ButtonUI>
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
  onFillCart: fillCart
  
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);