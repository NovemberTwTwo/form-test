import useForm from '../../hooks/useForm';
const Form = () => {
  const { handleSubmit, error, register } = useForm({ textData: '' }, () =>
    console.log('Success'),
  );

  const lengthValidator = (data) => {
    if (data.length <= 7) throw new Error('text length must be over 7');
    return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' {...register('textData', [lengthValidator])} />
      <div>{error.textData.errorMessage}</div>
      <button type='submit'>submit</button>
    </form>
  );
};

export default Form;
