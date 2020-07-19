import React from "react"
import "./History.css"
import Axios from "axios"
import { API_URL } from "../../../../Constants/API"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { priceFormatter } from "../../../../supports/helpers/formatter"

class HistoryUser extends React.Component{
  state = {
    dataTransactionUser : [],
  }

  getTransactionUser = () => {
    Axios.get(`${API_URL}/transaction/history/${this.props.user.id}`)
    .then((res) => {
      this.setState({ dataTransactionUser: res.data })
      console.log(this.state.dataTransactionUser)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getTransactionUser()
  }

  renderHistory = () => {
    return (
      <>
       {this.state.dataTransactionUser.map((val, idx) => {
          return(
            <>
              <li className="table-row">
                <div className="col-his col-his1">{idx + 1}</div>
                <div className="col-his col-his2"><img src={val.buktiTransfer} width="50px" /></div>
                <div className="col-his col-his3">{val.tanggalBeli}</div>
                <div className="col-his col-his3">{val.tanggalAcc}</div>
                <div className="col-his col-his2">{val.jasaPengiriman}</div>
                <div className="col-his col-his4">{priceFormatter(val.totalPrice)}</div>
                <div className="col-his col-his4">{val.status}</div>
                <div className="col-his col-his2">
                  <Link to={`/transaction/${val.id}`}>
                    <button className={!val.buktiTransfer ? (`btn btn-warning`) : (`btn btn-info`)}>{!(val.buktiTransfer) ? (
                      <p>Konfirmasi ulang</p>
                    ) : (
                      <p>Transaction Details</p>
                    )}
                    </button>
                  </Link>
                </div>
              </li>
            </>
          )
        })}
      </>
    )
  }
    
    render(){
        return(
          <div className="container-history">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col-his col-his1">ID</div>
                <div class="col-his col-his2">Bukti Transfer</div>
                <div class="col-his col-his3">Tanggal Beli</div>
                <div class="col-his col-his3">Tanggal ACC</div>
                <div class="col-his col-his2">Jasa Pengiriman</div>
                <div class="col-his col-his4">Total Harga</div>
                <div class="col-his col-his4">Status</div>
                <div class="col-his col-his2"></div>
              </li>
              {this.renderHistory()}
            </ul>
          </div>
        
        )
    }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
  };
}
export default connect(mapStateToProps)(HistoryUser);