import React from "react";
import "./AdminDashboard.css";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Axios from "axios";

import { API_URL } from "../../../Constants/API"

import ButtonUI from "../../Components/Buttons/Button"
import TextField from "../../Components/TextField/TextField"

import swal from "sweetalert";

class AdminDashboard extends React.Component {
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
    activeProducts: [],
    modalOpen: false,
  };

  inputHandler = (e, field, form) => {
    let { value } = e.target;
    this.setState({
      [form]: {
        ...this.state[form],
        [field]: value,
      },
    });
  };

  toggleModal = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  getProductList = () => {
    Axios.get(`${API_URL}/products`)
      .then((res) => {
        this.setState({ productList: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderProductList = () => {
    return this.state.productList.map((val, idx) => {
      const { id, productName, price, category,stockSizeS, stockSizeM, stockSizeL, image, description } = val;
      return (
        <>
          <tr
            onClick={() => {
              if (this.state.activeProducts.includes(idx)) {
                this.setState({
                  activeProducts: [
                    ...this.state.activeProducts.filter((item) => item !== idx),
                  ],
                });
              } else {
                this.setState({
                  activeProducts: [...this.state.activeProducts, idx],
                });
              }
            }}
          >
            <td> {id} </td>
            <td> {productName} </td>
            <td>{category}</td>
            <td>
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(price)}{" "}
            </td>
          </tr>
          <tr
            className={`collapse-item ${
              this.state.activeProducts.includes(idx) ? "active" : null
            }`}
          >
            <td className="" colSpan={3}>
              <div className="d-flex justify-content-around align-items-center">
                <div className="d-flex">
                  <img src={image} alt="" />
                  <div className="d-flex flex-column ml-4 justify-content-center">
                    <h5>{productName}</h5>
                    <h6 className="mt-2">
                      Category:
                      <span style={{ fontWeight: "normal" }}> {category}</span>
                    </h6>
                    <h6>
                      Price:
                      <span style={{ fontWeight: "normal" }}>
                        {" "}
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(price)}
                      </span>
                    </h6>
                    <h6>
                      Description:
                      <span style={{ fontWeight: "normal" }}> {description}</span>
                    </h6>
                      <h6>Stock: size S: {stockSizeS} , size M: {stockSizeM} , size L: {stockSizeL}</h6>
                  </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <ButtonUI
                    onClick={(_) => this.editBtnHandler(idx)}
                    type="contained"
                  >
                    Edit
                  </ButtonUI>
                  <ButtonUI className="mt-3" type="textual" onClick={(_) => this.deleteProductHandler(id)}>
                    Delete
                  </ButtonUI>
                </div>
              </div>
            </td>
          </tr>
        </>
      );
    });
  };

  createProductHandler = () => {
    Axios.post(`${API_URL}/products/addproducts`, this.state.createForm)
      .then((res) => {
        swal("Success!", "Your item has been added to the list", "success");
        this.setState({ ...this.state.createForm});
        this.getProductList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be added to the list", "error");
      });
  };

  editBtnHandler = (idx) => {
    this.setState({
      editForm: {
        ...this.state.productList[idx],
      },
      modalOpen: true,
    });
  };

  editProductHandler = () => {
    Axios.put(`${API_URL}/products/editproduct/${this.state.editForm.id}`,this.state.editForm)
      .then((res) => {
        console.log(res.data)
        swal("Success!", "Your item has been edited", "success");
        this.setState({ modalOpen: false });
        this.getProductList();
      })
      .catch((err) => {
        swal("Error!", "Your item could not be edited", "error");
        console.log(err);
      });
  };

  deleteProductHandler = (id) => {
    Axios.delete(`${API_URL}/products/deleteproduct/${id}`)
    .then((res) => {
      console.log(res.data)
      swal("Success!", "Your item has been delete", "success");
      this.getProductList();
    })
    .catch((err) => {
      console.log(err)
      swal("Error!", "Your item could not be delete", "error")
    })
  }

  componentDidMount() {
    this.getProductList();
  }

  render() {
    return (
      <div className="container py-4">
        <div className="dashboard-form-container pl-3">
          <caption className="mb-4 mt-2">
            <h2>Add Product</h2>
          </caption>
          <div className="row">
            <div className="col-8">
              <TextField
                value={this.state.createForm.productName}
                placeholder="Product Name"
                onChange={(e) =>
                  this.inputHandler(e, "productName", "createForm")
                }
              />
            </div>
            <div className="col-4">
              <TextField
                value={this.state.createForm.price}
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
                className="custom-text-input"
              ></textarea>
            </div>
            <div className="col-2 mt-3">
              <TextField
                value={this.state.createForm.stockSizeS}
                onChange={(e) => this.inputHandler(e, "stockSizeS", "createForm")}
                placeholder="Stock Size S"
              />
            </div>
            <div className="col-2 mt-3">
              <TextField
                value={this.state.createForm.stockSizeM}
                onChange={(e) => this.inputHandler(e, "stockSizeM", "createForm")}
                placeholder="Stock Size M"
              />
            </div>
            <div className="col-2 mt-3">
              <TextField
                value={this.state.createForm.stockSizeL}
                onChange={(e) => this.inputHandler(e, "stockSizeL", "createForm")}
                placeholder="Stock Size L"
              />
            </div>
            <div className="col-3 mt-3">
              <select
                value={this.state.createForm.category}
                className="custom-text-input h-100 pl-3"
                onChange={(e) => this.inputHandler(e, "category", "createForm")}
              >
                <option value="Men">Batik Men</option>
                <option value="Woman">Batik Woman</option>
                <option value="Couple">BatikCouple</option>
                <option value="Kids">Batik Kids</option>
              </select>
            </div>
            <div className="col-3 mt-3">
              <TextField
                value={this.state.createForm.image}
                placeholder="Image Source"
                onChange={(e) => this.inputHandler(e, "image", "createForm")}
              />
            </div>
            <div className="col-12 mt-3">
              <ButtonUI onClick={this.createProductHandler} type="contained">
                Create Product
              </ButtonUI>
            </div>
          </div>
        </div>
        <div className="dashboard">
          <caption className="pl-3">
            <h2>Products</h2>
          </caption>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{this.renderProductList()}</tbody>
          </table>
        </div>
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
      </div>
    );
  }
}

export default AdminDashboard;