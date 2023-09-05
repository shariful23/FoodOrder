import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef, useState } from "react";

const MealItemform = (props) => {
  const inputAmountRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    //Get the Entered amount value from refs
    const enteredAmount = inputAmountRef.current.value;

    //conversion from string to number
    const enteredAmountNumber = +enteredAmount;

    if (enteredAmount.length === 0) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={inputAmountRef}
        label="Quantity:"
        input={{
          id: "quantity" + props.id,
          type: "number",
          min: "1",
          max: "50",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add to Cart</button>
      {!amountIsValid && <p>Please Enter a valid amount</p>}
    </form>
  );
};
export default MealItemform;
