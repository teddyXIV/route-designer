interface ButtonProps {
  text: string;
  containerStyles: string;
  textStyles: string;
  handleClick: () => void | Promise<void>
}

const Button: React.FC<ButtonProps> = ({ text, containerStyles, textStyles, handleClick }) => {

  return (
    <button
      className={`rounded-lg justify-center items-center px-2 py-1 ${containerStyles}`}
      onClick={handleClick}>
      <p
        className={`text-lg text-${textStyles} `}>
        {text}
      </p>
    </button>
  )
}

export default Button;