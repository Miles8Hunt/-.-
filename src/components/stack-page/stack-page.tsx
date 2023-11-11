import style from './stack-page.module.css';
import { FC, FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { useForm } from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { INPUT_LENGTH } from "../../constants/InputLength";
import { stack } from "./Stack";


export const StackPage: FC = () => {

  const [ indexTop, setIndexTop ] = useState(0);
  const [ array, setArray ] = useState<Array<string>>([]);
  const { values, setValues, onChange } = useForm({ stack: ''});
  const [ loader, setLoader ] = useState({ add: false, delete: false, clear: false, });

  const addElement = async () => {
    setLoader({ ...loader, add: true });

    setValues({ stack: '' });
    stack.push(values.stack);
    setArray([...stack.getArray()]);
    setIndexTop(stack.index);
    await setDelay(SHORT_DELAY_IN_MS);
    setIndexTop(-1);

    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });

    setIndexTop(stack.index);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArray([...stack.getArray()]);
    setIndexTop(-1);
    
    setLoader({ ...loader, delete: false });
  };

  const clearElements = async () => {
    setLoader({ ...loader, clear: true });

    await setDelay(SHORT_DELAY_IN_MS);
    stack.clear();    
    setArray([...stack.getArray()]);
    setIndexTop(0)

    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Стек">
      <form className={style.form} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <Input 
          name='stack'
          maxLength={INPUT_LENGTH}
          value={values.stack}
          onChange={onChange}
          isLimitText={true} 
        />
        <Button 
          text='Добавить' 
          type='submit' 
          onClick={addElement} 
          isLoader={loader.add} 
          disabled={!values.stack} 
        />
        <Button 
          text='Удалить' 
          type='button'
          onClick={deleteElement} 
          isLoader={loader.delete} 
          disabled={indexTop === 0}
        />
        <Button 
          text='Очистить' 
          type='reset' 
          extraClass={style.reset} 
          onClick={clearElements}
          isLoader={loader.clear} 
          disabled={indexTop === 0}
        />
      </form>
      <ul className={style.list}>
        {array.map((el, index) => {
          return (
            <li key={index} >
              <Circle
                index={index}
                letter={el}
                head={ index === array!.length - 1 ? "top" : undefined }
                state={ index === indexTop ? ElementStates.Changing : ElementStates.Default } 
              />
            </li>
          )
        }
        )}
      </ul>
    </SolutionLayout>
  );
};
