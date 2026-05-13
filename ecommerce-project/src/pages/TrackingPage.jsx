import axios from 'axios';
import dayjs from 'dayjs';
import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import './TrackingPage.css'

export function TrackingPage({ cart }) {
 const {orderId, productId} = useParams();
 const [order, setOrder] = useState(null);

 useEffect(() => {
  const fetchTrackingData = async () => {
    const response = await axios.get(`api/orders/${orderId}?expand=products`);
    setOrder(response.data);
  };

  fetchTrackingData();
 }, [orderId]);

 if (!order) {
  return null;
 }

 const matchingProduct = order.products.find((ordersProduct) => {
  return ordersProduct.productId === productId;
 });

 const totalDeliveryTimeMs = matchingProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
 const timePassedMs = dayjs.valueOf() - order.orderTimeMs;
 const deliveryPecent = (timePassedMs/totalDeliveryTimeMs) * 100;

 return (
  <>
    <title>Tracking</title>
    <link rel="icon" href="/images/tracking-favicon.png" />

    <Header cart={cart} />

    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          {deliveryPecent >= 100 ? 'Delivered on': 'Arriving on'} {dayjs(matchingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="product-info">
          {matchingProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {matchingProduct.quantity}
        </div>

        <img className="product-image" src={matchingProduct.product.image} />

        <div className="progress-labels-container">
          <div className="progress-label">
            Preparing
          </div>
          <div className="progress-label current-status">
            Shipped
          </div>
          <div className="progress-label">
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width: `${deliveryPecent}%`}}></div>
        </div>
      </div>
    </div>
  </>
 );
}