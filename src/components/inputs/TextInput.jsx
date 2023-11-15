import { useState } from 'react';

const lengthValidator = (inputData) => {
  if (inputData.length >= 8) return true;
  throw new Error('Text length must be over 7');
};

const TextInput = ({ dataRef }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const inputChangeHandler = (e) => {
    try {
      lengthValidator(e.target.value);
      dataRef.current = e.target.value;
    } catch (e) {
      setErrorMessage(e.message);
    }
  };
  return (
    <div>
      <input type='text' onChange={inputChangeHandler} />
      {errorMessage.length !== 0 && <div>{errorMessage}</div>}
    </div>
  );
};

export default TextInput;
