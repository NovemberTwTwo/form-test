import { useEffect, useRef } from 'react';

const useForm = (initialFormData) => {
  const formData = useRef(initialFormData);
  const error = useRef({});

  useEffect(() => {
    Object.keys(formData.current).forEach((key) => {
      error.current[key] = '';
    });
    console.log(error.current);
  }, []);

  const register = (key, validators = []) => {
    const onChange = (e) => {
      try {
        validators.forEach((validator) => {
          validator(e.target.value);
        });
        formData.current[key] = e.target.value;
        error.current[key] = '';
      } catch (e) {
        error.current[key] = e.message;
      }
    };
    return { onChange };
  };

  return { formData: formData.current, error: error.current, register };
};

export default useForm;
