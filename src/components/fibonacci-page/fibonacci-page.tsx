import style from "./fibonacci-page.module.css";
import { FC, FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { useForm } from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { INPUT_MAX, INPUT_MIN } from "../../constants/InputLength";
import { getFibonacciNumbers } from "./utils"; 


export const FibonacciPage: FC = () => {

  const [ array, setArray ] = useState<Array<number>>();
  const { values, onChange } = useForm({ fibNum: '' });
  const [ loader, setLoader ] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoader(true);

    const data = getFibonacciNumbers(Number(values.fibNum));

    for (let i = 0; i < data.length; i++) {
      await setDelay(SHORT_DELAY_IN_MS);
      setArray(data.slice(0, i + 1));
    }

    setLoader(false);
  };
  

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          name="fibNum" 
          type="number" 
          isLimitText
          max={INPUT_MAX}
          min={INPUT_MIN}
          value={values.fibNum} 
          onChange={onChange}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={loader}
          disabled={ !values.fibNum || Number(values.fibNum) > INPUT_MAX }
        />
      </form>
      <ul className={style.list}>
        {array?.map((item, index) => {
          return (
            <li key={index}>
              <Circle letter={String(item)} index={index} />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
