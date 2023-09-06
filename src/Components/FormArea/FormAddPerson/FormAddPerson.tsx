import { ChangeEvent, useState } from "react";
import Button from "../../Reusables/Button/Button";
import "./FormAddPerson.css";
import PersonModel from "../../../Models/PersonModel";

interface FormAddPersonProps {
  onHandleSubmit: (person: PersonModel) => void;
  colorMode: string;
}

function FormAddPerson(props: FormAddPersonProps): JSX.Element {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("https://i.pravatar.cc/48");

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newPerson: PersonModel = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    props.onHandleSubmit(newPerson);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className={`FormAddPerson ${props.colorMode}-mode`} onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

export default FormAddPerson;
