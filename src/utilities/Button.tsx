import { Link } from "react-router-dom";

interface ButtonProps {
  text: string;
  containerStyles: string;
  textStyles: string;
}

const Button: React.FC<ButtonProps> = ({ text, containerStyles, textStyles }) => {

  return (
    <button className={`rounded-lg justify-center items-center px-2 py-1 ${containerStyles}`}>
      <Link to="/create">
        <p
          className={`text-lg text-${textStyles} `}>
          {text}
        </p>
      </Link>
    </button>
  )
}

export default Button;