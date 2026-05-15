import { Link, NavLink, useNavigate, useSearchParams } from 'react-router';
import { useState } from 'react';
import WhiteLogo from '../assets/images/logo-white.png';
import MobileWhiteLogo from '../assets/images/mobile-logo-white.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import CartIcon from '../assets/images/icons/cart-icon.png';
import './Header.css';

type HeaderProps = {
 cart: {
  productId: string;
  quantity: number;
  deliveryOptionId: string;
 }[];
};

export function Header({ cart }: HeaderProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');
  const [searchText, setSearchText] = useState(search ?? '');

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
   totalQuantity += cartItem.quantity;
  });

  const trackSearch = (event) => {
    setSearchText(event.target.value);
  };

  const searchProducts = () => {
    console.log(searchText);
    navigate(`/?search=${searchText}`);
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={WhiteLogo} />
            <img className="mobile-logo" src={MobileWhiteLogo} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={searchText} onChange={trackSearch} />

          <button className="search-button" onClick={searchProducts}>
            <img className="search-icon" src={SearchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={CartIcon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
