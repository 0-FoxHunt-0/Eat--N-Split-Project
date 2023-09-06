import { useState } from "react";
import FormAddPerson from "../FormArea/FormAddPerson/FormAddPerson";
import PersonList from "../PersonArea/PersonList/PersonList";
import Button from "../Reusables/Button/Button";
import "./App.css";
import FormSplitBill from "../FormArea/FormSplitBill/FormSplitBill";
import PersonModel from "../../Models/PersonModel";
import appConfig from "../../Utils/AppConfig";

interface AppProps {
  colorMode: boolean;
  setColorMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function App(props: AppProps): JSX.Element {
  const [personFormIsOpen, setPersonFormIsOpen] = useState<boolean>(false);
  const [personData, setPersonData] = useState<PersonModel[]>(
    appConfig.initialFriends
  );
  const [selectedPerson, setSelectedPerson] = useState<PersonModel>(null);

  const color: string = props.colorMode === false ? "dark" : "light";

  function handlePersonFormSubmit(newPerson: PersonModel) {
    setPersonData((state) => [...state, newPerson]);
    setPersonFormIsOpen((state) => !state);
  }

  function handlePersonSelection(person: PersonModel) {
    if (selectedPerson?.id !== person.id) setSelectedPerson(person);
    else setSelectedPerson(null);
    setPersonFormIsOpen(false);
  }

  function handleSplitBill(value: number) {
    setPersonData((people) =>
      people.map((person) =>
        person.id === selectedPerson.id
          ? { ...person, balance: person.balance + value }
          : person
      )
    );
    setSelectedPerson(null);
  }

  return (
    <div className="App">
      <button
        className={`color-mode ${color}-mode`}
        onClick={() => props.setColorMode(!props.colorMode)}
      >{`${color} Mode ${props.colorMode ? "☼" : "☾"}`}</button>

      <div className={`sidebar ${color}-mode`}>
        <PersonList
          selectedPerson={selectedPerson}
          onPersonSelect={handlePersonSelection}
          people={personData}
          colorMode={color}
        ></PersonList>

        {personFormIsOpen && (
          <FormAddPerson
            onHandleSubmit={handlePersonFormSubmit}
            colorMode={color}
          ></FormAddPerson>
        )}

        <Button clickEvent={() => setPersonFormIsOpen((state) => !state)}>
          {personFormIsOpen ? "Close" : "Add people"}
        </Button>
      </div>

      {selectedPerson && (
        <FormSplitBill
          onSplitBill={handleSplitBill}
          selectedPerson={selectedPerson}
          colorMode={color}
        ></FormSplitBill>
      )}
    </div>
  );
}

export default App;
