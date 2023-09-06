import "./Button.css";

interface ButtonProps {
  children: any;
  clickEvent?: (e: any) => void;
}

function Button(props: ButtonProps): JSX.Element {
  return <button onClick={props.clickEvent} className="button">{props.children}</button>;
}

export default Button;
