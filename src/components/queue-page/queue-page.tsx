import style from './queue-page.module.css';
import { FC, FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TAIL, HEAD } from "../../constants/element-captions";
import { INPUT_LENGTH  } from "../../constants/InputLength";
import { queue } from "./Queue";

import { validate } from "../../utils/validate";


export const QueuePage: FC = () => {

  const [ array, setArray ] = useState<string[]>(queue.getArray());
  const [ currentIndex, setCurrentIndex ] = useState<number | null>(null);
  const { values, onChange, setValues } = useForm({ value: '' });
  const [ loader, setLoader ] = useState({ add: false, delete: false, clear: false });

  const addElement = async () => {
    setLoader({ ...loader, add: true });

    setCurrentIndex(queue.getTail());
    await setDelay(SHORT_DELAY_IN_MS);
    queue.enqueue(values.value);
    setArray([...queue.getArray()]);
    setValues({ ...values, value: '' });
    setCurrentIndex(null);

    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });

    setCurrentIndex(queue.getHead());
    await setDelay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArray([...queue.getArray()]);
    setCurrentIndex(null);

    setLoader({ ...loader, delete: false });
  };

  const clearElements = async () => {
    setLoader({ ...loader, clear: true });

    await setDelay(SHORT_DELAY_IN_MS);
    queue.clear();
    setArray([...queue.getArray().fill('')]);

    setLoader({ ...loader, clear: false });
  };

  validate(values)


  return (
    <SolutionLayout title="Очередь">
      <form className={style.form} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <fieldset className={style.fieldset} >
          <Input
            name='value'
            maxLength={INPUT_LENGTH}
            isLimitText={true}
            value={values.value}
            disabled={queue.isFull()}
            onChange={onChange}
          />
          <Button 
            text="Добавить" 
            type='button' 
            onClick={addElement} 
            isLoader={loader.add} 
            disabled={loader.delete || loader.clear || !values.value} 
          />
          <Button 
            text="Удалить" 
            type='button' 
            onClick={deleteElement} 
            isLoader={loader.delete} 
            disabled={loader.add || loader.clear || queue.isEmpty()} 
          />
        </fieldset>
        <Button 
          text="Очистить" 
          type='button' 
          extraClass={style.reset} 
          onClick={clearElements} 
          isLoader={loader.clear} 
          disabled={loader.add || loader.delete || queue.isEmpty()} 
        />
      </form>
      <ul className={style.list}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Circle
                letter={item}
                index={index}
                state={
                  index === currentIndex
                    ? ElementStates.Changing
                    : ElementStates.Default
                }
                head={ index === queue.getHead() && !queue.isEmpty() ? HEAD : "" }
                tail={ index === queue.getTailIndex() && !queue.isEmpty() ? TAIL : "" }
              />
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
