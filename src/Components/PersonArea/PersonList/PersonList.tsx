import PersonModel from "../../../Models/PersonModel";
import Person from "../Person/Person";
import "./PersonList.css";

interface PersonListProps {
  people: PersonModel[];
  onPersonSelect: (person: PersonModel) => void;
  selectedPerson: PersonModel;
  colorMode: string;
}

function PersonList(props: PersonListProps): JSX.Element {  
  return (
    <div className="PersonList">
      <ul>
        {props.people &&
          props.people?.map((person, index) => (
            <Person colorMode={props.colorMode} selectedPerson={props.selectedPerson} onPersonSelect={props.onPersonSelect} key={index} person={person} />
          ))}
      </ul>
    </div>
  );
}

export default PersonList;
