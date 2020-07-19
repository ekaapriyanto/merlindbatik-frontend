import React from "react"
import "./Payment.css"
import Axios from "axios"
import { API_URL } from "../../../../Constants/API"
import { connect } from "react-redux"
import ButtonUI from "../../../Components/Buttons/Button"
import swal from "sweetalert"

class PaymentAdmin extends React.Component{
    state= {
        dataPending: [],
        dataAccept: [],
        dataOther: [],
        pageCondition: 1,
        activeTransaction: []
    }

    getTransactionPayment = () => {
        Axios.get(`${API_URL}/transaction`)
        .then((res) => {
            console.log(res.data)
            res.data.map((val) => {
                if (val.status == "Pending"){
                    this.setState({dataPending: [...this.state.dataPending, val]})
                } else if (val.status == "Accepted"){
                    this.setState({dataAccept: [...this.state.dataAccept, val]})
                } else {
                    this.setState({ dataOther: [...this.state.dataOther, val ]})
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    transactionAccepted = (transactionId) => {
        console.log(transactionId)
        Axios.put(`${API_URL}/transaction/accept/${transactionId}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ dataPending: [] })
            this.getTransactionPayment()
            swal("Success","Transaction Accepted","succes")
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    transactionRejected = (transactionId) => {
        Axios.put(`${API_URL}/transaction/reject/${transactionId}`)
        .then((res) => {
            console.log(res.data)
            this.setState({ dataPending: [], dataAccept: [], dataOther: []})
            this.getTransactionPayment()
            swal("Succes", "Transaction Rejected","info")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    renderPaymentPending = () => {
        return (
            <>
            {this.state.dataPending.map((val, idx) => {
                return (
                    <>
                    <tr className="thead3-trx">
                        <td className="th-trx">{idx + 1}</td>
                        <td className="th-trx"> <img src={val.buktiTransfer} alt="" width="100px"/></td>
                        <td className="th-trx">{val.member.username}</td>
                        <td className="th-trx">{val.totalPrice}</td>
                        <td className="th-trx">{val.jasaPengiriman}</td>
                        <td className="th-trx">{val.tanggalBeli}</td>
                        <td className="th-trx">{val.tanggalAcc}</td>
                        <td className="th-trx">{val.status}</td>
                        <td className="th-trx">
                            <div className="d-flex">
                                <button className="btn btn-primary" onClick={() => this.transactionAccepted(val.id)}>accept</button>
                                <button className="btn btn-danger" onClick={() => this.transactionRejected(val.id)}>Reject</button>
                            </div>
                        </td>
                    </tr>
                    <tr className="collapse-pay thead2-trx">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>ProductName</td>
                        <td>Size</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total Price</td>
                    </tr>
                    {val.transactionDetails.map((value) => {
                        return (
                            <>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{value.productName}</td>
                                <td>{value.size}</td>
                                <td>{value.price}</td>
                                <td>{value.quantity}</td>
                                <td>{value.totalPriceProduct}</td>
                            </tr>
                            </>
                        )
                    })}
                    </>
                )
            })}
            </>
        )
    }

    renderPaymentAccepted = () => {
        return (
            <>
            {this.state.dataAccept.map((val, idx) => {
                return (
                    <>
                    <tr className="thead3-trx">
                        <td className="th-trx">{idx + 1}</td>
                        <td className="th-trx"> <img src={val.buktiTransfer} alt="" width="100px"/></td>
                        <td className="th-trx">{val.member.username}</td>
                        <td className="th-trx">{val.totalPrice}</td>
                        <td className="th-trx">{val.jasaPengiriman}</td>
                        <td className="th-trx">{val.tanggalBeli}</td>
                        <td className="th-trx">{val.tanggalAcc}</td>
                        <td className="th-trx">{val.status}</td>
                        <td className="th-trx">
                        </td>
                    </tr>
                    <tr className="collapse-pay thead2-trx">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>ProductName</td>
                        <td>Size</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total Price</td>
                    </tr>
                    {val.transactionDetails.map((value) => {
                        return (
                            <>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{value.productName}</td>
                                <td>{value.size}</td>
                                <td>{value.price}</td>
                                <td>{value.quantity}</td>
                                <td>{value.totalPriceProduct}</td>
                            </tr>
                            </>
                        )
                    })}
                    </>
                )
            })}
            </>
        )
    }

    renderPaymentRejected = () => {
        return (
            <>
            {this.state.dataOther.map((val, idx) => {
                return (
                    <>
                    <tr className="thead3-trx">
                        <td className="th-trx">{idx + 1}</td>
                        <td className="th-trx"> <img src={val.buktiTransfer} alt="" width="100px"/></td>
                        <td className="th-trx">{val.member.username}</td>
                        <td className="th-trx">{val.totalPrice}</td>
                        <td className="th-trx">{val.jasaPengiriman}</td>
                        <td className="th-trx">{val.tanggalBeli}</td>
                        <td className="th-trx">{val.tanggalAcc}</td>
                        <td className="th-trx">{val.status}</td>
                        <td className="th-trx">
                        </td>
                    </tr>
                    <tr className="collapse-pay thead2-trx">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>ProductName</td>
                        <td>Size</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Total Price</td>
                    </tr>
                    {val.transactionDetails.map((value) => {
                        return (
                            <>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{value.productName}</td>
                                <td>{value.size}</td>
                                <td>{value.price}</td>
                                <td>{value.quantity}</td>
                                <td>{value.totalPriceProduct}</td>
                            </tr>
                            </>
                        )
                    })}
                    </>
                )
            })}
            </>
        )
    }

    renderPayment = () => {
        if (this.state.pageCondition == 1){
            if(this.state.dataPending.length !== 0){
                return (
                    <tbody>{this.renderPaymentPending()}</tbody>
                )
            } else {
                return(
                    <h1 className="App">EMPETY</h1>
                )
            }
        } else if (this.state.pageCondition == 2){
            if(this.state.dataAccept.length !== 0){
                return (
                    <tbody>{this.renderPaymentAccepted()}</tbody>
                )
            } else {
                return (
                    <h1 className="App">EMPETY</h1>
                )
            }
        } else if (this.state.pageCondition == 3){
            if(this.state.dataAccept.length !== 0){
                return (
                    <tbody>{this.renderPaymentRejected()}</tbody>
                )
            } else {
                return (
                    <h1 className="App">EMPETY</h1>
                )
            }
        }
    }

    componentDidMount(){
        this.getTransactionPayment()
        this.transactionAccepted()
    }
    render(){
        return(
            <div>
                <div className="d-flex flex-row justify-content-center align-items-center py-2 navbar-container" style={{backgroundColor: "#47a3da", color: "#fff"}}>
                    <div className="mr-3">
                        <ButtonUI type="textual" onClick={() => this.setState({ pageCondition: 1})} className="textHover" style={{color: "#fff"}}>Pendding</ButtonUI>
                    </div>
                    <div className="mr-1 ml-1">
                        <ButtonUI type="textual" onClick={() => this.setState({ pageCondition: 2})} className="textHover" style={{color: "#fff"}}>Accepted</ButtonUI>
                    </div>
                    <div className="ml-3">
                        <ButtonUI type="textual" onClick={() => this.setState({ pageCondition: 3})} className="textHover" style={{color: "#fff"}}>Reject</ButtonUI>
                    </div>
                </div>
                <div className="mt-3">
                <table className="table-transaction">
                    <thead className="thead-trx">
                        <tr>
                            <th className="th-trx">No</th>
                            <th className="th-trx">Bukti Transfer</th>
                            <th className="th-trx">Username</th>
                            <th className="th-trx">Total Price</th>
                            <th className="th-trx">Jasa Pengiriman</th>
                            <th className="th-trx">Tanggal Beli</th>
                            <th className="th-trx">Tanggal Acc</th>
                            <th className="th-trx">Status</th>
                            <th className="th-trx">Action</th>
                        </tr>
                    </thead>
                        {this.renderPayment()}
                </table>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};
export default connect(mapStateToProps) (PaymentAdmin);