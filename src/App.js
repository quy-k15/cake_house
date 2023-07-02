import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import AddressBook from "./pages/AddressBook";
import Detail from "./pages/DetailCake";
import LikedProducts from "./pages/LikedProducts";
import MyCart from "./pages/MyCart";
import AllPurchase from "./pages/AllPurchase";
import CancelledPurchase from "./pages/CancelledPurchase";
import CompletedPurchase from "./pages/CompletedPurchase";
import ReceivePurchase from "./pages/ReceivePurchase";
import ConfirmPurchase from "./pages/ConfirmPurchase";
import CategoryCake from "./pages/CategoryCake";
import Notifications from "./pages/Notifications";
import UnreadNotifications from "./pages/UnreadNotifications";
import ReadNotifications from "./pages/ReadNotifications";
import Voucher from "./pages/Voucher";
import AddCake from "./admin/AddCake";
import SideMenuAdmin from "./admin/SideMenuAdmin";
import Order from "./admin/Order";
import Dashboard from "./admin/Dashboard";
import ProductList from "./admin/ProductList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./pages/Payment";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/SideMenuAdmin" component={SideMenuAdmin} />
          <Route path="/productlist" component={ProductList} />
          <Route path="/addcake" component={AddCake} />
          <Route path="/order" component={Order} />
          <Route path="/dashboard" component={Dashboard} />
          <Route>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/CategoryCake" exact component={CategoryCake} />
              <Route path="/about" exact component={About} />
              <Route path="/contact" exact component={Contact} />
              {/* <Route path="/profile" exact component={Profile} /> */}
              <Route path="/login" exact component={Login} />
              <Route path="/addressbook" exact component={AddressBook} />
              {/* <Route path="/detail" exact component={Detail} /> */}
              <Route path="/detail/:idcake" exact component={Detail} />
              <Route path="/likedproducts" exact component={LikedProducts} />
              <Route path="/myCart" exact component={MyCart} />
              <Route path="/Payment" exact component={Payment} />
              <Route path="/AllPurchase" exact component={AllPurchase} />
              <Route path="/ConfirmPurchase" exact component={ConfirmPurchase} />
              <Route path="/ReceivePurchase" exact component={ReceivePurchase} />
              <Route path="/CancelledPurchase" exact component={CancelledPurchase} />
              <Route path="/CompletedPurchase" exact component={CompletedPurchase} />
              <Route path="/Notifications" exact component={Notifications} />
              <Route path="/UnreadNotifications" exact component={UnreadNotifications} />
              <Route path="/ReadNotifications" exact component={ReadNotifications} />
              <Route path="/Voucher" exact component={Voucher} />
              <Route path="/EditProfile" exact component={EditProfile} />
              <Route path="/profile" exact>
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              </Route>
              
            </Switch>
            <Footer />
          </Route>
        </Switch>
      </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;

