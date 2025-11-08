import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuItemList from "./MenuItemList";
import { clearCart } from "../utilities/cartSlice";

const CartComponent = () => {
    const catItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    const handleClearCart =() => {
        dispatch(clearCart());
    }
  
    const cartItems = useSelector((store) => store.cart.items);
    console.log('CartComponent',cartItems);
    
  
  return cartItems.length <= 0 ? 
  <div>
    <h1>Add items to cart</h1>
  </div>
  :(
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl bold"> CART </h1>
      <div className="w-6/12 m-auto">
      <button className="px-2 m-2 text-xl font-black hover:cursor-auto" onClick={handleClearCart}>Clear Cart</button>
        <MenuItemList dishes={cartItems}/>
      </div>
    </div>
  );
};

export default CartComponent;
