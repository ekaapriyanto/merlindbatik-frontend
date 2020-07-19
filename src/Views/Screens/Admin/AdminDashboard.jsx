import React from "react";
import "./AdminDashboard.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";

import { API_URL } from "../../../Constants/API"

import ButtonUI from "../../Components/Buttons/Button"
import TextField from "../../Components/TextField/TextField"

import swal from "sweetalert";
import { priceFormatter } from "../../../supports/helpers/formatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-regular-svg-icons"

class AdminDashboard extends React.Component {
  kondisiHalaman = 0
  state = {
    productList: [],
    createForm: {
      productName: "",
      price: 0,
      category: "Men",
      stockSizeS: "",
      stockSizeM: "",
      stockSizeL: "",
      image: "",
      description: "",
    },
    editForm: {
      id: 0,
      productName: "",
      price: 0,
      category: "Men",
      stockSizeS: "",
      stockSizeM: "",
      stockSizeL: "",
      image: "",
      description: "",
    },
    minPrice: 0,
    maxPrice: 99999999999999,
    searchProduct: "",
    orderBy: "productName",
    sorting: "asc",
    valueCategory: "",
    banyakProduct : 0,
    activeProducts: [],
    modalOpen: false,
    activePage: "filter",
    
  };

  inputHandler = (e, field, form) => {
    let {value} = e.target
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      }
    })
  }

  toggleModal = () => {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  getProductsFiltering = () => {
    console.log(this.state.ubahKategori)
    this.countPage()
    Axios.get(`${API_URL}/products/${this.state.minPrice}/${this.state.maxPrice}/${this.state.orderBy}/${this.state.sorting}/${this.kondisiHalaman}/?productName=${this.state.searchProduct}&category=${this.state.valueCategory}`)
    .then((res) => {
      console.log(res.data)
      this.setState({ productList: res.data})
    })
    .catch((err) => {
      console.log(err.response)
    })
    this.kondisiHalaman = 0
  }

  countPage = () => {
    Axios.get(`${API_URL}/products/count/${this.state.minPrice}/${this.state.maxPrice}/?productName=${this.state.searchProduct}&category=${this.state.valueCategory}`)
    .then((res) => {
      this.setState({ banyakProduct: res.data})
      console.log(this.state.banyakProduct)
    })
    .catch((err) => {
      console.log(err)
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

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, productName, price, category, stockSizeS, stockSizeM, stockSizeL, image, description} = val
      return (
        <>
        <tr className="tr-shadow">
          <td>
            <img src={image} className="mr-3" alt="" width="60px"/>
            {productName}
          </td>
          <td>{category}</td>
          <td><h6>size S: {stockSizeS} | size M: {stockSizeM} | size L: {stockSizeL}</h6></td>
          <td>{description}</td>
          <td>{priceFormatter(price)}</td>
          <td>
            <div style={{justifyContent: "flex-end"}}>
              <FontAwesomeIcon icon={faEdit} className="mr-3" style={{cursor: "pointer"}} onClick={(_) => this.editBtnHandler(idx)}/>
              <FontAwesomeIcon icon={faTrashAlt} style={{cursor: "pointer"}} className="mt-3" type="textual" onClick={(_) => this.deleteProductHandler(id)}/>
            </div>
          </td>
        </tr>
        </>
      )
    })
  }

  createProductHandler = () => {
    // console.log(this.state.createForm)
    Axios.post(`${API_URL}/products/addproducts`, this.state.createForm)
    .then((res) => {
      swal("Success!","Your item has been added to the list","success")
      this.setState({ ...this.state.createForm})
      this.getProductsFiltering()
    })
    .catch((err) => {
      swal("Error!","Your item could not be added to the list","error")
      console.log(err)
    })
  }

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.productList[idx],
      },
      modalOpen: true,
    })
  }

  editProductHandler = () => {
    Axios.put(`${API_URL}/products/editproduct/${this.state.editForm.id}`, this.state.editForm)
      .then((res) => {
        console.log(res.data)
        swal("Success!", "Your item has been edited", "success");
        this.setState({ modalOpen: false });
        this.getProductsFiltering()
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  }

  deleteProductHandler = (id) => {
    Axios.delete(`${API_URL}/products/deleteproduct/${id}`)
      .then((res) => {
        console.log(res.data)
        swal("Success!", "Your item has been delete", "success");
        this.getProductsFiltering()
      })
      .catch((err) => {
        console.log(err)
        swal("Error!", "Your item could not be delete", "error")
      })
  }

  renderAddAndFilter = () => {
    const { activePage } = this.state;
    if (activePage == "filter"){
      return (
        <div className="container">
          <h3>Filtering</h3>
          <div className="row mb-5">
            <div className="col-2">
              <select className="form-control custom-select" onClick={this.getProductsFiltering} onChange={(e) => this.setState({ valueCategory : e.target.value})} >
              <option value="">All</option>
                <option value="Men">Men</option>
                <option value="Woman">Woman</option>
                <option>Couple</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            <div className="col-3">
              <div className="input-group">
                <span className="input-group-addon">
                  Search
                </span>
                <input
                  className="form-control text-left"
                  type="text"
                  onKeyUp={() => this.getProductsFiltering()}
                  onChange={(e) => this.setState({ searchProduct: e.target.value })}
                />
              </div>
            </div>
            <div className="col-5">
              <div className="input-group">
                <span className="input-group-addon">Rp</span>
                <input className="form-control text-left mr-2" type="text" placeholder="Min Price" onChange={(e) => this.setState({minPrice: 1*e.target.value})}/>
                <p>to</p>
                <span className="input-group-addon ml-2">Rp</span>
                <input className="form-control text-left" type="text" placeholder="Max Price" onChange={(e) => this.setState({maxPrice: 1*e.target.value})}/>
                <button className="btn btn-primary" onClick={this.getProductsFiltering}>Process</button>
              </div>
            </div>
            <div className="col-2">
              <div className="input-group">
                <span className="input-group-addon">Sort By</span>
                <select className="form-control custom-select" onClick={() => this.getProductsFiltering(this.valueCategory)} onChange={(e) => this.setState({ sorting: e.target.value })}>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="">
          <h3>Add Product</h3>
          <div className="row">
            <div className="col-8">
              <input
                className="form-control"
                value={this.state.createForm.productName}
                type="text"
                placeholder="Product Name"
                onChange={(e) => this.inputHandler(e, "productName", "createForm")}
              />
              
            </div>
            <div className="col-4">
            <input
                className="form-control"
                value={this.state.createForm.price}
                type="text"
                placeholder="Price"
                onChange={(e) => this.inputHandler(e, "price", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <textarea
                value={this.state.createForm.description}
                onChange={(e) => this.inputHandler(e, "description", "createForm")}
                style={{ resize: "none" }}
                placeholder="Description"
                className="form-control"
              ></textarea>
            </div>
            <div className="col-2 mt-3">
              <input
                className="form-control"
                value={this.state.createForm.stockSizeS}
                type="text"
                placeholder="Stock Size S"
                onChange={(e) => this.inputHandler(e, "stockSizeS", "createForm")}
              />
            </div>
            <div className="col-2 mt-3">
              <input
                className="form-control"
                value={this.state.createForm.stockSizeM}
                type="text"
                placeholder="Stock Size M"
                onChange={(e) => this.inputHandler(e, "stockSizeM", "createForm")}
              />
            </div>
            <div className="col-2 mt-3">
              <input
                className="form-control"
                value={this.state.createForm.stockSizeL}
                type="text"
                placeholder="Stock Size L"
                onChange={(e) => this.inputHandler(e, "stockSizeL", "createForm")}
              />
            </div>
            <div className="col-3 mt-3">
              <select
                value={this.state.createForm.category}
                className="form-control h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "category", "createForm")}
              >
                <option value="Men">Batik Men</option>
                <option value="Woman">Batik Woman</option>
                <option value="Couple">BatikCouple</option>
                <option value="Kids">Batik Kids</option>
              </select>
            </div>
            <div className="col-3 mt-3">
            <input
                className="form-control"
                value={this.state.createForm.image}
                type="text"
                placeholder="Image Source"
                onChange={(e) => this.inputHandler(e, "image", "createForm")}
              />
            </div>
            <div className="col-12 mt-3 mb-5">
              <ButtonUI onClick={this.createProductHandler} type="contained">
                Create Product
              </ButtonUI>
            </div>
          </div>
        </div>
      )
    }
  }

  renderModal = () => {
    return (
      <Modal
      toggle={this.toggleModal}
      isOpen={this.state.modalOpen}
      className="edit-modal"
    >
      <ModalHeader toggle={this.toggleModal}>
        <caption>
          <h3>Edit Product</h3>
        </caption>
      </ModalHeader>
      <ModalBody>
        <div className="row">
          <div className="col-8">
            <TextField
              value={this.state.editForm.productName}
              placeholder="Product Name"
              onChange={(e) =>
                this.inputHandler(e, "productName", "editForm")
              }
            />
          </div>
          <div className="col-4">
            <TextField
              value={this.state.editForm.price}
              placeholder="Price"
              onChange={(e) => this.inputHandler(e, "price", "editForm")}
            />
          </div>
          <div className="col-12 mt-3">
            <textarea
              value={this.state.editForm.description}
              onChange={(e) => this.inputHandler(e, "description", "editForm")}
              style={{ resize: "none" }}
              placeholder="Description"
              className="custom-text-input"
            ></textarea>
          </div>
          <div className="col-4 mt-3">
            Stock Size S
            <TextField
              value={this.state.editForm.stockSizeS}
              onChange={(e) => this.inputHandler(e, "stockSizeS", "editForm")}
              placeholder="Stock Size S"
            />
          </div>
          <div className="col-4 mt-3">
            Stock Size M
            <TextField
              value={this.state.editForm.stockSizeM}
              onChange={(e) => this.inputHandler(e, "stockSizeM", "editForm")}
              placeholder="Stock Size M"
            />
          </div>
          <div className="col-4 mt-3">
            Stock Size L
            <TextField
              value={this.state.editForm.stockSizeL}
              onChange={(e) => this.inputHandler(e, "stockSizeL", "editForm")}
              placeholder="Stock Size L"
            />
          </div>
          <div className="col-6 mt-3">
            <TextField
              value={this.state.editForm.image}
              placeholder="Image Source"
              onChange={(e) => this.inputHandler(e, "image", "editForm")}
            />
          </div>
          <div className="col-6 mt-3">
            <select
              value={this.state.editForm.category}
              className="custom-text-input h-100 pl-3"
              onChange={(e) => this.inputHandler(e, "category", "editForm")}
            >
              <option value="Men">Batik Men</option>
              <option value="Woman">Batik Woman</option>
              <option value="Couple">Batik Couple</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="col-12 text-center my-3">
            <img src={this.state.editForm.image} alt="" />
          </div>
          <div className="col-5 mt-3 offset-1">
            <ButtonUI
              className="w-100"
              onClick={this.toggleModal}
              type="outlined"
            >
              Cancel
            </ButtonUI>
          </div>
          <div className="col-5 mt-3">
            <ButtonUI
              className="w-100"
              onClick={this.editProductHandler}
              type="contained"
            >
              Save
            </ButtonUI>
          </div>
        </div>
      </ModalBody>
    </Modal>
    )
  }

  componentDidMount() {
    this.getProductsFiltering()
  }

  render(){
    return(
      <div className="container py-4">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <caption className="mr-5 textHover"><h3 onClick={() => this.setState({ activePage: "filter"})}>Filltering</h3></caption>
          <h3>|</h3>
          <caption className="ml-5 textHover"><h3 onClick={() => this.setState({ activePage: "add"})}>Add Products</h3></caption>
        </div>
        {this.renderAddAndFilter()}
        <div className="">
            <div className="">
              <div className="">
                <table className="dashboard-table">
                  <thead>
                    <tr className="table100-head">
                      <th className="column1">Product</th>
                      <th className="column2">Category</th>
                      <th className="column3">Stock</th>
                      <th className="column3">Desc</th>
                      <th className="column2">Price</th>
                      <th className="column2">Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderProductList()}</tbody>
                </table>
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
        {this.renderModal()}
      </div>
    )
  }
}
export default AdminDashboard;