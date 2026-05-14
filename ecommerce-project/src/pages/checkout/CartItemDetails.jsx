import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [updatingQuantity, setUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
   await axios.delete(`/api/cart-items/${cartItem.productId}`);
   await loadCart();
  };

  const showUpdatingQuantity = () => {
   setUpdatingQuantity(updatingQuantity ? false : true);
  };

  const trackQuantity = (event) => {
   setQuantity(event.target.value);
  };

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {updatingQuantity
             ? <input type="text" className="quantity-input" value={quantity} onChange={trackQuantity} />
             : <span className="quantity-label"> {cartItem.quantity} </span>
            }
          </span>
          <span className="update-quantity-link link-primary" onClick={showUpdatingQuantity}>Update</span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>Delete</span>
        </div>
      </div>
    </>
  );
}
