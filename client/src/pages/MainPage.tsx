import QuoteBlock from "../components/QuoteBlock";
import Button from "../components/Button";
import { Link } from "react-router-dom";


const MainPage = (props: any) => {
    return (
        <>
            <div id="landing-image"> 
            <HeaderTitle/>
            <QuoteBlock author="StackTraceCo" styles="void-one">Every luxury must be paid for, and everything is a luxury, starting with being in this world. In today's life, luxury is time and space. The future is the most expensive luxury in the world.</QuoteBlock>
            <QuoteBlock author="Marc Jacobs" styles="void-two">Being anonymous is a great luxury. It’s a big loss to lose that. Mostly, the loss is the ability to observe others without being observed yourself.</QuoteBlock>
            </div>
            <QuoteText>There is no greater luxury than the feeling of contentful lonliness.</QuoteText>
            <p style={{fontFamily: "Montserrat", margin: "0 0 36px 0", color: "white", fontSize: "1.5em"}}>Experience the ownership of Nothing.</p>
            
            <Link to="shop"><Button>SHOP</Button></Link>
            <br/><br/><br/><br/>
            <p style={{fontFamily: "Montserrat", margin: "0 0 36px 0", color: "white", fontSize: "1.5em"}}>View the Nothing Collective at global art exhibitions.</p>
            <Button>EXHIBITION</Button>
        </>
    );
}

const HeaderTitle = (props: any) => {
    return <h2 id="landing-heading" className="void-text quote-text">The opportunity to purchase nothing.</h2>
  }
  
  
  const QuoteText = (props: any) => {
    return (
      <p style={{fontFamily: "Oooh Baby", fontSize: "2.5em", color: 'white', margin: "48px 0 96px 0"}}>{props.children}</p>
    )
  }

export default MainPage;