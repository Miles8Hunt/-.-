import { useState, ChangeEvent } from "react";


export function useForm<T>(inputValues: T = {} as T) {

  const [values, setValues] = useState<T>(inputValues);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  
  return { values, onChange, setValues };
};
