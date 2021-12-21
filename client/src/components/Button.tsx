

const Button = (props: any) => {
    const shopButtonStyle = {
      width: "480px",
      height: "192px",
      fontSize: "1.25em",
      fontFamily: "Montserrat",
      padding: "16px",
      color: "white",
      backgroundColor: "transparent",
      border: "2px solid white",
      boxShadow: "4px 4px 0px 0px #011627",
      letterSpacing: "0.08em",
      animationName: "animate-shop-button",
      animationDuration: "1s",
      animationIterationCount: "infinite",
      animationDirection: "alternate",
      cursor: "pointer"
    };
  
    return (
      <button style={shopButtonStyle}>{props.children}</button>
    )
  }

  export default Button;