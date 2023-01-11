import { useContext } from "react";
import CartContext from "../context/CartProvider";
import { UserCartContextType } from "../context/CartProvider";

const useCart = (): UserCartContextType => {
  return useContext(CartContext);
};

export default useCart;
