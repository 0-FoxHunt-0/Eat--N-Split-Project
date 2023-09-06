import { ChangeEvent, useState } from "react";
import PersonModel from "../../../Models/PersonModel";
import Button from "../../Reusables/Button/Button";
import "./FormSplitBill.css";

interface FormSplitBillProps {
  selectedPerson: PersonModel;
  onSplitBill: (value: number) => void;
  colorMode: string
}

function FormSplitBill(props: FormSplitBillProps): JSX.Element {
  const [bill, setBill] = useState<number>(0);
  const [userExpense, setUserExpense] = useState<number>(0);
  const [whoIsPaying, setWhoIsPaying] = useState<string>("user");

  const friendExpense: number = bill && bill - userExpense;

  function sanitizeNumberInput(prevValue: number, input: string): number {
    if (!isNaN(+input)) return +input;
    else return prevValue;
  }

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if(bill === 0) return;
    props.onSplitBill(whoIsPaying === 'user' ? friendExpense : -userExpense)
  }

  return (
    <form className={`FormSplitBill ${props.colorMode}-mode`} onSubmit={handleSubmit}>
      <h2>Split a bill with {props.selectedPerson.name}</h2>

      <label>💰 Bill amount</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(sanitizeNumberInput(bill, e.target.value))}
      />

      <label>🙍‍♂️ Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) =>
          setUserExpense(
            +e.target.value > bill
              ? +userExpense
              : sanitizeNumberInput(userExpense, e.target.value)
          )
        }
      />

      <label>👫 {props.selectedPerson.name}'s expense</label>
      <input type="number" disabled value={friendExpense} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{props.selectedPerson.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}

export default FormSplitBill;
