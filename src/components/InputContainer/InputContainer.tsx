import type { InputContainerProps } from './interfaces/InputContainerProps';

const InputContainer = ({ children, label, id }: InputContainerProps) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  );
};

export default InputContainer;
