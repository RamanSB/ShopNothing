import ReactDOM from 'react-dom';
import GlobalStateProvider from './contexts/GlobalAppStateContext';
import "./assets/styles/styles.css";
import { NavBar } from './components/NavBar';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingPage from './pages/ShoppingPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import SignInPage from './pages/SignInPage';
import BasketPage from './pages/BasketPage';
import CheckoutPage from './pages/CheckoutPage';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutFailurePage from './pages/CheckoutFailurePage';

const App = () => {

  return (
    <div id="app-container">
      <BrowserRouter>
      <NavBar/>
      <div id="main-page-container">
      
        <Routes>
          <Route path="/checkout/failure" element={<CheckoutFailurePage/>}/>
          <Route path="/checkout/success" element={<CheckoutSuccessPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/basket" element={<BasketPage/>}/>
          <Route path="/shop" element={<ShoppingPage/>}/>
          <Route path="/signin" element={<SignInPage/>}/>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      
      </div>
      </BrowserRouter>
    </div>
  );
}



(async () => {
  let data = await axios.get("https://master--heuristic-davinci-c2b258.netlify.app/stripe-config", {withCredentials: true});
  const stripe = loadStripe(data?.data);

  const rootElem = document.getElementById('root');
  const GlobalStateWrappedApp = () => {

    return (
      <>
        <Elements stripe={stripe}>
          <GlobalStateProvider>
              <App/>
          </GlobalStateProvider>
        </Elements>     
      </>
    );
  };
  ReactDOM.render(<GlobalStateWrappedApp/>,  rootElem);
})();