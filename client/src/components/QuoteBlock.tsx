const QuoteBlock = (props: any) => {
    let className = "void-segment ".concat(props.styles);
    console.log(`ClassName: ${className}`);
  
    const animationStyle = {
      animationName: "animate-quote-blocks",
      animationDuration: "10s",
      animationIterationCount: "infinite",
      animatioDirection: "normal"
    }
  
    return (
      <div className={className} style={animationStyle}>
        <p>{props.children}</p>
        <p className="quote-text">{props.author}</p>
      </div>
    );
  }
  
export default QuoteBlock;