import { useEffect, useRef, useState } from 'react';

const useForm = (initialFormData) => {
  const formData = useRef(initialFormData);
  const [error, setError] = useState(initialFormData);

  const register = (key, validators = []) => {
    const onChange = (e) => {
      try {
        validators.forEach((validator) => {
          validator(e.target.value);
        });
        formData.current[key] = e.target.value;
      } catch (e) {}
    };
    return { onChange };
  };

  return { formData: formData.current, error: '', register };
};

export default useForm;
