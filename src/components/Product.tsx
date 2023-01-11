import React, { ReactElement, memo } from "react";
import { ProductType } from "../context/ProductsContext";
import { ReducerActionType, ReducerAction } from "../context/CartProvider";
type Props = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  REDUCER_ACTIONS: ReducerActionType;
  inCart: boolean;
};

function Product({
  product,
  dispatch,
  REDUCER_ACTIONS,
  inCart,
}: Props): ReactElement {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () =>
    dispatch({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1 } });
  const itemInCart = inCart ? " → Item in Cart: ✔️" : null;
  const content = (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to cart</button>
    </article>
  );
  return content;
}

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: Props,
  { product: nextProduct, inCart: nextInCart }: Props
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}

const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);
export default MemoizedProduct;