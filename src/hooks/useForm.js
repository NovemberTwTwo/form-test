import { useRef, useState } from 'react';

const errorObjectGenerator = (initialFormData) => {
  const error = {};
  Object.keys(initialFormData).forEach((key) => {
    error[key] = {
      isValid: false,
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

const useForm = (initialFormData, submitCallback) => {
  const formData = useRef(initialFormData);
  const [error, setError] = useState(errorObjectGenerator(initialFormData));

  const register = (key, validators = []) => {
    const onChange = (e) => {
      formData.current[key] = e.target.value;
    };

    const validateData = () => {
      try {
        validators.forEach((validator) => {
          validator(formData.current[key]);
        });
        setError((prev) => {
          return { ...prev, [key]: { isValid: true, errorMessage: '' } };
        });
      } catch (e) {
        setError((prev) => {
          return {
            ...prev,
            [key]: { isValid: false, errorMessage: e.message },
          };
        });
      }
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
