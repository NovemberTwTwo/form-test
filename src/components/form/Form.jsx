import useForm from '../../hooks/useForm';
const Form = () => {
  const { handleSubmit, error, register } = useForm(
    { textData: null, radioData: 'A' },
    () => console.log('Success'),
  );

  const lengthValidator = (data) => {
    if (data.length <= 7) throw new Error('text length must be over 7');
    return;
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' {...register('textData', [lengthValidator])} />
      <div>{error.textData.errorMessage}</div>
      <fieldset {...register('radioData')}>
        <legend>Radio select test</legend>
        <div>
          <input
            type='radio'
            name='radioData'
            id='a'
            value={'A'}
            defaultChecked
          />
          <label htmlFor='A'>A data</label>
        </div>
        <div>
          <input type='radio' name='radioData' id='b' value={'B'} />
          <label htmlFor='B'>B data</label>
        </div>
        <div>
          <input type='radio' name='radioData' id='c' value={'C'} />
          <label htmlFor='C'>C data</label>
        </div>
      </fieldset>
      <button type='submit'>submit</button>
    </form>
  );
};

export default Form;
