import PersonModel from "../../../Models/PersonModel";
import Button from "../../Reusables/Button/Button";
import "./Person.css";

interface PersonProps {
  person: PersonModel;
  onPersonSelect: (person: PersonModel) => void;
  selectedPerson: PersonModel;
  colorMode: string
}

function Person(props: PersonProps): JSX.Element {
  const isSelected: boolean = props.selectedPerson?.id === props.person.id  

  return (
    <div className="PersonProfile">
      <li className={isSelected ? `selected ${props.colorMode}-mode` : ""}>
        <img src={props.person.image} alt={props.person.name} />
        <h3>{props.person.name}</h3>
        {props.person.balance < 0 && (
          <p className="red">
            You owe {props.person.name} ${Math.abs(props.person.balance)}
          </p>
        )}
        {props.person.balance > 0 && (
          <p className="green">
            {props.person.name} owes you ${Math.abs(props.person.balance)}
          </p>
        )}
        {props.person.balance === 0 && <p>You are even</p>}

        <Button clickEvent={() => props.onPersonSelect(props.person)}>{isSelected ? "Close" : "Select"}</Button>
      </li>
    </div>
  );
}

export default Person;
