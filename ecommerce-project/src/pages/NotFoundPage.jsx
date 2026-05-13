import { Header } from "../components/Header";
import './NotFoundPage.css';

export function NotFoundPage({ cart }) {
 return (
  <>
   <Header cart={cart}/>

   <p className="page-not-found-message">Page not found.</p>
  </>
 );
}