import React from "react"
import CanvasJSReact from "../../../../Assets/canvas/canvasjs.react"
import Axios from "axios";
import { API_URL } from "../../../../Constants/API";
import "./Report.css"

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class ReportProduct extends React.Component{
    state ={
        products: {
            animationEnabled: true,
            data: [
                {
                    type: "column",
                    dataPoints: [
                    ]
                }
            ]
        },
        searchProduct: "",
        sorting: "asc",
        valueCategory: "",
    }

    getReportProductAdmin = () => {
        this.setState({ products: {
            data: [{
                dataPoints: [
 
                ]
            }]
        }})
        Axios.get(`${API_URL}/products/report/${this.state.sorting}/?productName=${this.state.searchProduct}&category=${this.state.valueCategory}`)
        .then((res) => {
            console.log(res.data)
            res.data.map((val) => {
                this.setState({ products: {
                    data: [{
                        dataPoints: [
                            ...this.state.products.data[0].dataPoints, {label: val.productName, y: val.sold}
                        ]
                    }]
                }})
            })
        })
    }

    componentDidMount() {
        this.getReportProductAdmin()
    }
    render(){
        return(
            <div className="bg-light">
                <div className="row mt-2">
                    <div className="col-lg-3 col-md-4">
                        <div className="title">
                            <h5 className="title-menu">FILTERS</h5>
                        </div>
                        <div className="sf-box">
                            <div className="input-group">
                                <span className="input-group-addon">Search</span>
                                <input
                                    onKeyUp={() => this.getReportProductAdmin()}
                                    onChange={(e) => this.setState({searchProduct: e.target.value})}
                                    className="form-control text-left"
                                    type="text"
                                />
                            </div>
                            <h5 className="sf-title">CATEGORIES</h5>
                            <hr/>
                            <select className="form-control custom-select" onClick={this.getReportProductAdmin} onChange={(e) => this.setState({ valueCategory: e.target.value})}>
                                <option>All</option>
                                <option>Men</option>
                                <option>Woman</option>
                                <option>Couple</option>
                                <option>Kids</option>
                            </select>
                            <h5 className="sf-title">Sorting</h5>
                            <hr/>
                            <div className="mt-2 input-group">
                                <div className="select-box">
                                    <select className="form-control custom-select"  onClick={() => this.getReportProductAdmin(this.valueCategory)} onChange={(e) => this.setState({ sorting: e.target.value })}>
                                        <option value="asc">A - Z</option>
                                        <option value="desc">Z - A</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-col-md-8">
                        <div className="container mt-5">
                            <div className="title-menu text-center">
                                <h4 className="title-report font-weight-bolder">Data Penjualan</h4>
                            </div>
                            <CanvasJSChart options={this.state.products}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportProduct;