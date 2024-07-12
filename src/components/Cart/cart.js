import React,{ useContext, useState } from "react";
import classes from "./cart.module.css";
import Modal from "../UI/modal";
import CartItem from "./cartItem";
import Checkout from "./checkout";
import CartContext from "../../store/cart-context";

const Cart = props => {
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit]= useState(false);

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0; 

    const totalAmount= `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemRemovehandler= (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddhandler=(item) => {
        cartCtx.addItem({...item,amount:1})
    };

    const submitOrderHandle = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://reactmeals-ac0f7-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item)=> 
            <CartItem 
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemovehandler.bind(null,item.id)}
                onAdd={cartItemAddhandler.bind(null,item)}
            />
        )}
    </ul>;

    const modalActios = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandle} />}
        {!isCheckout && modalActios}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order Data...</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>

    return <Modal onClose={props.onClose} >
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {didSubmit && !isSubmitting && didSubmitModalContent}
    </Modal>
}

export default Cart;