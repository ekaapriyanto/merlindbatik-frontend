import React from "react";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { Table } from "reactstrap";
import { priceFormatter } from "../../../supports/helpers/formatter";
import { Redirect, Link } from "react-router-dom";
import { fillCart } from "../../../Redux/Actions";

class Cart extends React.Component {
    state = {
        cartData: [],
        checkOutItems: [],
        jasaPengiriman: "JNT",
        tanggalBeli: new Date(),
        transactionIdGet: 0,
        kondisi: 0
    }

    getCartData = () => {
        Axios.get(`${API_URL}/carts/memberCart/${this.props.user.id}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ cartData: res.data })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderCartData = () => {
        return this.state.cartData.map((val, idx) => {
            const { quantity, size, product, id } = val
            const { productName, price, image, } = product
            return (
                <tr style={{ height: "150px" }}>
                    <td className="text-left">
                        <div className="d-flex align-items-center">
                            <img className="mr-4" src={image} alt="" style={{ width: "100px", height: "150px", objectFit: "contain", }} />
                            <div>
                                <strong>{productName}</strong>
                                <p>Size : {size}</p>
                            </div>
                        </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                        <strong>{priceFormatter(price)}</strong>
                    </td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}><strong>{quantity}</strong></td>
                    <td style={{ verticalAlign: "middle" }}>
                        <strong>{priceFormatter(price * quantity)}</strong>
                    </td>
                    <td>
                        <FontAwesomeIcon onClick={() => this.deleteCarthandler(id)} className="close-icon" icon={faTimesCircle} style={{ fontSize: "30px", color: "red" }} />
                    </td>
                </tr>
            )
        })
    }

    

    renderSubTotalPrice = () => {
        let totalPrice = 0;

        this.state.cartData.forEach((val) => {
            const { quantity, product } = val
            const { price } = product

            totalPrice += price * quantity;
        })
        return totalPrice;
    }

    renderShippingPrice = () => {
        switch (this.state.jasaPengiriman) {
            case "JNT":
                return priceFormatter(50000);
            case "JNE":
                return priceFormatter(60000);
            case "SiCepat":
                return priceFormatter(40000);
            case "POS":
                return priceFormatter(20000)
            default:
                return priceFormatter(0);
        }
    }

    renderTotalPrice = () => {
        let totalPrice = 0;

        this.state.cartData.forEach((val) => {
            const { quantity, product } = val;
            const { price } = product;

            totalPrice += quantity * price;
        });

        let shippingPrice = 0;

        switch (this.state.jasaPengiriman) {
            case "JNT":
                shippingPrice = 50000;
                break;
            case "JNE":
                shippingPrice = 60000;
                break;
            case "SiCepat":
                shippingPrice = 40000;
                break;
            default:
                shippingPrice = 20000;
                break;
        }

        return totalPrice + shippingPrice;
    };

    deleteCarthandler = (id) => {
        // console.log(id)
        Axios.delete(`${API_URL}/carts/deleteCart/${id}`)
        .then((res) => {
            this.getCartData();
            this.props.onFillCart(this.props.user.id)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // checkBoxHandler = (e, idx) => {
    //     const { checked } = e.target;

    //     if (checked) {
    //         this.setState({ checkoutItems: [...this.state.checkOutItems, idx] })
    //     } else {
    //         this.setState({ checkOutItems: [...this.state.checkOutItems.filter((val) => val !== idx)] })
    //     }
    // }

    checkoutBtnHandler = () => {
        Axios.post(`${API_URL}/transaction/addTransaction/${this.props.user.id}`, {
            totalPrice: this.renderTotalPrice(),
            jasaPengiriman: this.state.jasaPengiriman,
            buktiTransfer: "",
            tanggalBeli: this.state.tanggalBeli.toLocaleDateString(),
            tanggalAcc: "",
            status: "Pending",
        })
        .then((res) => {
            console.log(res.data.id)
            this.state.kondisi = 1
            this.state.transactionIdGet = res.data.id
            this.state.cartData.map(val => {
                Axios.post(`${API_URL}/transactionDetails/addTransactionDetails/${res.data.id}/${val.product.id}`, {
                    productName: val.product.productName,
                    size: val.size,
                    price: val.product.price,
                    totalPriceProduct: val.product.price * val.quantity,
                    quantity: val.quantity
                })
                .then((res) => {
                    // console.log(res)
                        })
                .catch((err) => {
                    console.log(err)
                })
            })
            this.state.cartData.map(val => {
                this.deleteCarthandler(val.id)
            })
            this.renderCartData()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidMount() {
        this.getCartData();
    }

    render() {
        if (this.state.kondisi == 0) {
            if (this.state.cartData.length) {
                return (
                    <div className="py-4" style={{ padding: "0px 50px" }}>
                        <div className="row">
                            <div className="col-8">
                                <Table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">Products</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>SubTotal</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.renderCartData()}</tbody>
                                </Table>
                            </div>
                            <div className="col-4">
                                <div className="cart-card">
                                    <div className="cart-card-head p-4">Order Summary</div>
                                    <div className="cart-card-body p-4">
                                        <div className="d-flex justify-content-between my-2">
                                            <div>Subtotal</div>
                                            <strong>
                                                {priceFormatter(this.renderSubTotalPrice())}
                                            </strong>
                                        </div>
                                        <div className="d-flex justify-content-between my-2">
                                            <div>Shipping</div>
                                            <strong>{this.renderShippingPrice()}</strong>
                                        </div>
                                        <div className="d-flex justify-content-between my-2 align-items-center">
                                            <label>Shippig Method</label>
                                            <select onChange={(e) => this.setState({ jasaPengiriman: e.target.value })} className="form-control w-50">
                                                <option value="JNT">J&T</option>
                                                <option value="JNE">JNE</option>
                                                <option value="SiCepat">SI CEPAT</option>
                                                <option value="POS">POS</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="cart-card-foot p-4">
                                        <div className="d-flex justify-content-between my-2">
                                            <div>Total</div>
                                            <div>{priceFormatter(this.renderTotalPrice())}</div>
                                        </div>
                                    </div>
                                </div>
                                    <input onClick={() => this.checkoutBtnHandler()} type="button" value="Checkout" className="btn btn-success btn-block mt-3" />
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-info">Shopping Cart Empty</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
        else{
            return (<Redirect to={`/transaction/${this.state.transactionIdGet}`} />)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    onFillCart: fillCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);