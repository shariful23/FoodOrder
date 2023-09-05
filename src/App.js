import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from './store/CartProvider';


function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCarthandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCarthandler} />}
      <Header onShowCart={showCartHandler}></Header>
      <Meals />
    </CartProvider>
  );
}

export default App;
