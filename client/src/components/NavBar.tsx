import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalAppStateContext } from '../contexts/GlobalAppStateContext';

// ToDo: Handle currency (Show Modal when currency is selected + include currency field in global state context).

export const NavBar = () => {

    const navBarStyle = {
      display: "flex",
      flexFlow: "row nowrap",
      fontFamily: "Montserrat",
      padding: "24px",
      backgroundColor: "#011627",
      alignItems: "center",
      justifyContent: "space-between"
    };
  
    const brandTextStyle = {
      textDecoration: "none",
      letterSpacing: "0.2em",
      fontSize: "1.25em",
      color: "#F4f3ee",
      textShadow: "1px 1px #011627"
    };
  
    const navItemListStyle = {
      paddingInlineStart: "0px",
      listStyleType: "none"
    }
  
    const {globalState, setGlobalState}  = useContext(GlobalAppStateContext);

    const SignInOutElem = (props: any) => <p className="nav-icon inline">{props.children}</p> 

    const handleLoginOrLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (event.currentTarget.innerText === 'SIGN OUT') {
        setGlobalState({
          ...globalState,
          isSignedIn: false
        });
      }
    }

    return (
      <div id="nav-bar" style={navBarStyle}>
        <ul id="nav-action-item-list" style={navItemListStyle}>
          <li></li>
          <li className="nav-icon inline"><Link className="react-router-link" to="/">HOME</Link></li>
          <li className="nav-icon inline"><Link className="react-router-link" to="/shop">SHOP</Link></li>
          <li className="nav-icon inline">ABOUT</li>
        </ul>
        <a href="https://www.instagram.com/stacktraceco" style={brandTextStyle}><p style={{textTransform: "uppercase", display: "inline", margin: "0 8px 0 0"}}>Nothing</p><i className="fas fa-mortar-pestle"></i></a>
        <ul id="nav-action-item-list" className="flex-end" style={navItemListStyle}>
          <li><Link className="react-router-link" to={globalState.isSignedIn ? '/signout' : '/signin'} onClick={handleLoginOrLogout}>{globalState.isSignedIn ? <SignInOutElem>SIGN OUT</SignInOutElem> : <SignInOutElem>SIGN IN</SignInOutElem>}</Link></li>
          <li><Link className="react-router-link" to={globalState.isSignedIn ? "/basket" : "/signin"}><i className="fas fa-shopping-basket nav-icon"></i></Link></li>
          <li><p className="nav-icon inline">CUR</p></li>  
          <li></li>
        </ul>
      </div>
    );
  }



  