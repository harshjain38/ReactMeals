import { Fragment } from "react";

import classes from "./header.module.css";
import mealsImg from "../../assests/meals.jpg";
import HeaderCartButton from "./headerCartButton";

const Header = props => {
    return <Fragment>
        <header className={classes.header} >
            <h1>ReactMeals</h1>
            <HeaderCartButton onShowCart={props.onShowCart} />
        </header>
        <div className={classes['main-image']} >
            <img src={mealsImg} alt="Meals Img"/>
        </div>
    </Fragment>
};

export default Header;