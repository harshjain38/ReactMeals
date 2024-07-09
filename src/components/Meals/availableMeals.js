import { useEffect, useState } from "react";
import classes from "./availableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
    const [meals,setMeals] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState();

    useEffect(()=>{
        const fetchMeals = async() => {
            const response=await fetch('https://reactmeals-ac0f7-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
            if(!response.ok){
                throw new Error('Something went wrong!');
            }

            const responseData= await response.json();

            const loadedIteams=[];
            for (const key in responseData){
                loadedIteams.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                })
            }
            setMeals(loadedIteams);
            setIsLoading(false);
        }

        fetchMeals().catch(error => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    },[]);

    if(isLoading){
        return <section className={classes.MealsLoading}> 
            <p>Loading...</p>
        </section>
    }
    if(httpError){
        return <section className={classes.MealsError}> 
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map((meal) => 
    <MealItem 
        key={meal.id} 
        id={meal.id}
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
    /> );

    return <section className={classes.meals} >
        <Card>
            <ul>{mealsList}</ul>
        </Card>
    </section>
};

export default AvailableMeals;