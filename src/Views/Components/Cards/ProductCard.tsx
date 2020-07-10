import React from "react";
import "./ProductCard.css";
import ButtonUI from "../Buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";

interface ProductCardData {
  id?: number;
  productName?: string;
  price: number;
  image?: string;
}

type ProductCardProps = {
  data: ProductCardData;
  className?: string;
};

class ProductCard extends React.Component<ProductCardProps> {
  render() {
    const { productName, price, image } = this.props.data
    
    return (
      <div className={`product-card d-inline-block ${this.props.className}`}>
        <img
          src={image}
          alt={this.props.data?.productName}
          style={{ width: "224px", height: "250px", objectFit: "contain" }}
        />
        <div>
          <p className="mt-3">{productName}</p>
          <h5 style={{ fontWeight: "bolder"}}>
            {new Intl.NumberFormat("id-ID",{style: "currency", currency: "IDR"}).format(price)}
          </h5>
          <p className="small">Yogyakarta</p>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
          <ButtonUI
            type="outlined"
            style={{ fontSize: "15px", padding: "4px 30px", color: "inhirit" }}
          >
            {" "}
            <FontAwesomeIcon icon={faHeart} /> BUY
          </ButtonUI>
        </div>
      </div>
    );
  }
}
export default ProductCard;
