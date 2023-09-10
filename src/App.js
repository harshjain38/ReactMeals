import { useState } from "react";
import Header from "./components/Header/header";
import Cart from "./components/Cart/cart";
import Meals from "./components/Meals/meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown , setCartIsShown ] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
