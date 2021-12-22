
import ReactDOM from 'react-dom';
import GlobalStateProvider from './contexts/GlobalAppStateContext';
import "./assets/styles/styles.css";
import { NavBar } from './components/NavBar';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingPage from './pages/ShoppingPage';
import SignInPage from './pages/SignInPage';
import BasketPage from './pages/BasketPage';


const App = () => {

  return (
    <div id="app-container">
      <BrowserRouter>
      <NavBar/>
      <div id="main-page-container">
      
        <Routes>
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


const rootElem = document.getElementById('root');
const GlobalStateWrappedApp = () => (
  <>
    <GlobalStateProvider>
      <App/>
    </GlobalStateProvider>
  </>
);

ReactDOM.render(<GlobalStateWrappedApp/>,  rootElem);