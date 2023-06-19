import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AddressBook from "./pages/AddressBook";
import Detail from "./pages/DetailCake";
import LikedProducts from "./pages/LikedProducts";
import MyCart from "./pages/MyCart"
import AllPurchase from "./pages/AllPurchase"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/login" exact component={Login} />
          <Route path="/addressbook" exact component={AddressBook} />
          <Route path="/detail" exact component={Detail} />
          <Route path="/likedproducts" exact component={LikedProducts} />
          <Route path="/myCart" exact component={MyCart} />
          <Route path="/AllPurchase" exact component={AllPurchase} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );

}


export default App;
