import { useRef } from 'react';
import TextInput from '../inputs/TextInput';
import useForm from '../../hooks/useForm';
const Form = () => {
  const { formData, error, register } = useForm({ textData: '' });

  const lengthValidator = (data) => {
    console.log(data);
    if (data.length <= 7) throw new Error('text length must be over 7');
    return;
  };

  return (
    <form action=''>
      <input type='text' {...register('textData', [lengthValidator])} />
    </form>
  );
};

export default Form;
