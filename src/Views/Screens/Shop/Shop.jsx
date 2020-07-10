import React from "react";
import Axios from "axios";
import { API_URL } from "../../../Constants/API";
import ProductCard from "../../Components/Cards/ProductCard";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShippingFast,
  faMoneyBillWave,
  faHeadset,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Colors from "../../../Constants/Colors";

import "./Shop.css";
import "../../../bootstrap.css"

class Shop extends React.Component {
  valueCategory = ""
  kondisiHalaman = 0
  state = {
    loadProductNew: [],
    categoryProduct: [],
    minPrice: 0,
    maxPrice: 99999999999999,
    searchProduct: "",
    orderBy: "productName",
    sorting: "asc",
    banyakProduct : 0,
  }

  ubahKategori = (val) =>{
    this.valueCategory = val
    this.getProductsFiltering(this.valueCategory) 
  }

  getProductsFiltering = () => {
    this.countPage()
    Axios.get(`${API_URL}/products/${this.state.minPrice}/${this.state.maxPrice}/${this.state.orderBy}/${this.state.sorting}/${this.kondisiHalaman}/?productName=${this.state.searchProduct}&category=${this.valueCategory}`)
    .then((res) => {
      console.log(res.data)
      this.setState({ loadProductNew: res.data})
    })
    .catch((err) => {
      console.log(err.response)
    })
    this.kondisiHalaman = 0
  }

  countPage = () => {
    Axios.get(`${API_URL}/products/count/${this.state.minPrice}/${this.state.maxPrice}/?productName=${this.state.searchProduct}&category=${this.valueCategory}`)
    .then((res) => {
      this.setState({ banyakProduct: res.data})
      console.log(this.state.banyakProduct)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  renderProducts = () => {
    return this.state.loadProductNew.map((val) => {
        return (
          <Link style={{textDecoration: "none", color: "inhirit"}}
            to={`/products/${val.id}`}
          >
            <ProductCard
              key={val.id}
              data={val}
              className="m-2"
            />
          </Link>
        )
    })
  }

  renderPageHandler = () => {
    let arr = []
    let hal = 0
    for (let i = 0; i < this.state.banyakProduct; i++){
      if ( i % 9 == 0){
        arr.push(<li className="page-item" aria-current="page">
          <span className="page-link active" onClick={() => this.onClickPageHandler(i)}>
            {hal +1}
          </span>
        </li>
        )
        hal += 1
      }
    }
    return arr
  }

  onClickPageHandler = (i) => {
    this.kondisiHalaman= i
    this.getProductsFiltering()
  }
  
  componentDidMount() {
    this.ubahKategori(this.valueCategory)
    this.getProductsFiltering()
    this.countPage()
  }


  render() {
    return(
      <div className="bg-light">
        <div className="container">
          <div className="row mt-2">
            <div className="col-lg-3 col-md-4">
              <div className="title">
                <h5 className="title-menu">FILTERS</h5>
              </div>
              <div className="sf-box">
                <h5 className="sf-title">CATEGORIES</h5>
                <hr/>
                <ul className="list-icons">
                  <li style={{listStyleType: "none"}}>
                    <Link style={{ color: "inhirit", textDecoration: "none" }} value={this.state.categoryFilter} onClick={(_) => this.ubahKategori("")}>
                      <h5>
                        <FontAwesomeIcon icon={faChevronRight} className="mr-2"/>
                        ALL
                      </h5>
                    </Link>
                  </li>
                  <li style={{listStyleType: "none"}}>
                    <Link style={{ color: "inhirit", textDecoration: "none" }} value={this.state.categoryFilter} onClick={()=>this.ubahKategori("Men")}>
                      <h5>
                        <FontAwesomeIcon icon={faChevronRight} className="mr-2"/>
                        MEN
                      </h5>
                    </Link>
                  </li >
                  <li style={{listStyleType: "none"}}>
                    <Link style={{ color: "inhirit", textDecoration: "none" }} value={this.state.categoryFilter} onClick={()=>this.ubahKategori("Woman")}>
                      <h5>
                        <FontAwesomeIcon icon={faChevronRight} className="mr-2"/>
                        WOMAN
                      </h5>
                    </Link>
                  </li>
                  <li style={{listStyleType: "none"}}>
                    <Link style={{ color: "inhirit", textDecoration: "none" }} value={this.state.categoryFilter} onClick={()=>this.ubahKategori("Couple")}>
                      <h5>
                        <FontAwesomeIcon icon={faChevronRight} className="mr-2"/>
                        COUPLE
                      </h5>
                    </Link>
                  </li>
                  <li style={{listStyleType: "none"}}>
                    <Link style={{ color: "inhirit", textDecoration: "none" }} value={this.state.categoryFilter} onClick={()=>this.ubahKategori("Kids")}>
                      <h5>
                        <FontAwesomeIcon icon={faChevronRight} className="mr-2"/>
                        KIDS
                      </h5>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="sf-box mt-3">
                <h5 className="sf-title">PRICE RANGE</h5>
                <hr/>
                  <div className="mt-2 input-group">
                    <span className="input-group-addon">
                      Rp
                    </span>
                    <input className="form-control text-left" type="text" placeholder="Harga Min" onChange={(e) => this.setState({minPrice: 1*e.target.value})}/>
                  </div>
                  <p className="text-center mt-1">To</p>
                  <div className="input-group">
                    <span className="input-group-addon">
                      Rp
                    </span>
                    <input className="form-control text-left" type="text" placeholder="Harga Max" onChange={(e) => this.setState({maxPrice: 1*e.target.value})}/>
                  </div>
                <div className="form-group mt-2 text-center">
                  <buuton className="btn btn-primary" onClick={this.getProductsFiltering}>Process</buuton>
                </div>
              </div>
              <div className="sf-box mt-3">
                <h5 className="sf-title">Sorting</h5>
                <hr/>
                <div className="mt-2 input-group">
                  <div className="select-box">
                    <select className="form-control custom-select" onClick={() => this.getProductsFiltering(this.valueCategory)} onChange={(e) => this.setState({ orderBy: e.target.value })}>
                      <option value="productName">Sort By Name</option>
                      <option value="price">Sort By Price</option>
                    </select>
                  </div>
                  <div className="select-box">
                    <select className="form-control custom-select"  onClick={() => this.getProductsFiltering(this.valueCategory)} onChange={(e) => this.setState({ sorting: e.target.value })}>
                      <option value="asc">A - Z</option>
                      <option value="desc">Z - A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-8">
              <div className="title text-center">
                <h2 className="title-menu font-weight-bolder">Mertlind batik Collections</h2>
              </div>
              <div className="row shop-listing d-flex flex-wrap justify-content-center">
                {this.renderProducts()}
                <div className="col-12 mt-2 mb-2">
                  <nav className="">
                    <ul className="pagination" role="navigation">
                      <li className="page-item disabled" aria-disabled="true" aria-label="&laquo; Previous">
                        <span className="page-link" aria-hidden="true">‹</span>
                      </li>
                      {this.renderPageHandler()}
                      <li className="page-item disabled" aria-disabled="true" aria-label="&laquo; Previous">
                        <span className="page-link" aria-hidden="true">›</span>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    search: state.search,
  }
}

export default connect(mapStateToProps)(Shop);