import { useRef, useState } from 'react';

const errorObjectGenerator = (initialFormData) => {
  const error = {};
  Object.keys(initialFormData).forEach((key) => {
    error[key] = {
      isValid: initialFormData[key] == null ? false : true,
      errorMessage: '',
    };
  });

  return error;
};

const formDataValidator = (error) => {
  Object.keys(error).forEach((key) => {
    if (!error[key].isValid) throw new Error(`${key}`);
  });
};

const debouncer = (callback, delay, arg) => {
  let timer;
  return (arg) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(callback, delay, arg);
  };
};

const useForm = (initialFormData, submitCallback) => {
  const formData = useRef(initialFormData);
  const [error, setError] = useState(errorObjectGenerator(initialFormData));

  const register = (key, validators = []) => {
    const validateData = () => {
      try {
        validators.forEach((validator) => {
          validator(formData.current[key]);
        });
        if (error[key].isValid !== true)
          setError((prev) => {
            return { ...prev, [key]: { isValid: true, errorMessage: '' } };
          });
      } catch (e) {
        if (formData.current[key].errorMessage !== e.message)
          setError((prev) => {
            return {
              ...prev,
              [key]: { isValid: false, errorMessage: e.message },
            };
          });
      }
    };

    const validateDebounce = debouncer((e) => {
      formData.current[key] = e.target.value;
      validateData();
    }, 300);

    const onChange = (e) => {
      validateDebounce(e);
    };

    return { onChange, onBlur: validateData };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      formDataValidator(error);
      submitCallback(formData.current);
    } catch (e) {
      setError((prev) => {
        return {
          ...prev,
          [e.message]: {
            isValid: false,
            errorMessage: `${e.message} data is not valid.`,
          },
        };
      });
    }
  };

  return { handleSubmit, error, register };
};

export default useForm;
