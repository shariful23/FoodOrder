import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    //check if the item has already on the cart
    const currentCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const currentCartItem = state.items[currentCartItemIndex];

    let updatedItems;

    //if the cart has already the items
    if (currentCartItem) {
      const updatedItem = {
        ...currentCartItem,
        amount: currentCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[currentCartItemIndex] = updatedItem;
    }
    //if the item is new on cart
    else {
      updatedItems = state.items.concat(action.item);
    }

    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: newTotalAmount,
    };
  }
  
  //Item Remove

  if ((action.type = "REMOVE")) {
    const currentCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const currentCartItem = state.items[currentCartItemIndex];
    const updateTotalAmount = state.totalAmount - currentCartItem.price;
    let updatedItems;
    if (currentCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...currentCartItem,
        amount: currentCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[currentCartItemIndex] = updatedItem;
      
    }
    return {
      items: updatedItems,
      totalAmount: updateTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducer, defaultCartState);
  const addItemToCart = (item) => {
    dispatch({
      type: "ADD",
      item: item,
    });
  };
  const removeItemFromCart = (id) => {
    dispatch({
      type: "REMOVE",
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
