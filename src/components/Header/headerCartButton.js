import { useContext, useEffect, useState } from "react";
import classes from "./headerCartButton.module.css";
import CartIcon from "../../assests/carticon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [isBtnAnimated,SetIsBtnAnimated]=useState(false);
    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    const noCartItems = items.reduce((curNum,item)=>{return curNum+item.amount},0);

    const btnClasses=`${classes.button} ${isBtnAnimated ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length===0){
            return;
        }
        SetIsBtnAnimated(true);

        const timer = setTimeout(()=>{
            SetIsBtnAnimated(false);
        },300);

        return ()=>{
            clearTimeout(timer);
        }
    },[items]);

    return <button className={btnClasses} onClick={props.onShowCart}>
        <span className={classes.icon} >
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{noCartItems}</span>
    </button>
};

export default HeaderCartButton;