import { Header } from "../components/Header";
import './NotFoundPage.css';

export function NotFoundPage() {
 return (
  <>
   <Header />

   <p className="page-not-found-message">Page not found.</p>
  </>
 );
}