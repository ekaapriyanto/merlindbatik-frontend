import React from "react"
import { Table } from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import swal from "sweetalert"
import "./Transaction.css"
import { priceFormatter } from "../../../supports/helpers/formatter";

class Transaction extends React.Component{
    state = {
        detailsCheckOut : [],
        selectedFile: null,
        detailsTransaction: [],
    }

    fileChangeHandler = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });
    }

    detailTransaction = () => {
        console.log(this.props.match.params.id)
        Axios.get(`${API_URL}/transaction/uploadTransaction/${this.props.match.params.id}`)
        .then((res)=>{
            this.setState({detailsCheckOut: res.data})
            Axios.get(`${API_URL}/transactionDetails/checkout/${this.props.match.params.id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({detailsTransaction: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    uploadTransaction = (transactionsId) =>{
        console.log(this.state.selectedFile)
        if (this.state.selectedFile == null) {
            swal("Failed","Anda Belum Memilih File","error")
        }
        else{
            let formData = new FormData();
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            )
            
            Axios.put(`${API_URL}/transaction/uploadTransaction/${transactionsId}`,formData)
            .then((res) => {
                console.log(res.data);
                swal("Sukses","Sent","success")
            })
            .catch((err) => {
                console.log(err);
            })
        }

    }

    renderDetailTransaction = () => {
        return this.state.detailsTransaction.map((val) => {
            const {productName, size, price, quantity, totalPriceProduct} = val
            return(
                <>
                <tr>
                    <td className="th-trx">{productName}</td>
                    <td className="th-trx">{size}</td>
                    <td className="th-trx">{priceFormatter(price)}</td>
                    <td className="th-trx">{quantity}</td>
                    <td className="th-trx">{priceFormatter(totalPriceProduct)}</td>
                </tr>
                </>
            )
        })
    }    

    renderDetailCheckOut = () => {
        return this.state.detailsCheckOut.map((val) => {
            const {totalPrice, jasaPengiriman, tanggalBeli, tanggalAcc, status, buktiTransfer} = val
            return (
                <>
                <div className="order-totals-column">
                    <h3>Your Order</h3>
                    <div className="woocommerce-checkout-review-order">
                        <table style={{width: "100%"}}>
                            <tbody>
                                <tr>
                                    <td style={{textAlign: "left"}}>
                                        <span className="name">Total Price : </span>
                                    </td>
                                    <td style={{textAlign: "right"}}>
                                        {priceFormatter(totalPrice)}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "left", paddingTop: "10px"}}>
                                        <span className="name">Jasa Pengiriman : </span>
                                    </td>
                                    <td style={{textAlign: "right", paddingTop: "10px"}}>
                                        {jasaPengiriman}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "left", paddingTop: "10px"}}>
                                        <span className="name">Tanggal Beli : </span>
                                    </td>
                                    <td style={{textAlign: "right", paddingTop: "10px"}}>
                                        {tanggalBeli}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "left", paddingTop: "10px"}}>
                                        <span className="name">Tanggal Acc : </span>
                                    </td>
                                    <td style={{textAlign: "right", paddingTop: "10px"}}>
                                        {tanggalAcc}
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{textAlign: "left", paddingTop: "10px"}}>
                                        <span className="name">Status : </span>
                                    </td>
                                    <td style={{textAlign: "right", paddingTop: "10px"}}>
                                        {status}
                                    </td>
                                </tr>
                                <tr>
                                <td style={{textAlign: "left", paddingTop: "10px"}}>
                                        <span className="name">Upload Bukti Transfer : </span>
                                    </td>
                                </tr>
                                <tr>
                                    {!(val.buktiTransfer) ? (
                                        <input onChange={(e)=>this.fileChangeHandler(e)} className="form-control-file" type="file" />
                                    ) : (
                                        <h3>Terkirim</h3>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                        {!(val.buktiTransfer) ? (
                             <input onClick={()=>this.uploadTransaction(this.props.match.params.id)} className="btn btn-primary" style={{ width: "50%", marginTop: "20px" }} type="button" value="Confirm" />
                        ) : null }
                    </div>
                </div>
                </>
            )
        })
    }

    componentDidMount(){
        this.detailTransaction()
    }
    render(){
        return(
            <body className="bg-transaction">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <table className="table-transaction">
                                <thead className="thead-trx">
                                    <tr>
                                        <th className="th-trx">Product</th>
                                        <th className="th-trx">Size</th>
                                        <th className="th-trx">Price</th>
                                        <th className="th-trx">Quantity</th>
                                        <th className="th-trx">Sub Total Proce</th>
                                    </tr>
                                </thead>
                                <tbody height="60px">
                                    {this.renderDetailTransaction()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            {this.renderDetailCheckOut()}
                        </div>
                    </div>
                </div>
            </body>
        )
    }
}

export default Transaction;