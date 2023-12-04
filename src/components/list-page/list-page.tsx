import style from './list-page.module.css';
import { FC, FormEvent, useState } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { ElementStates, NodeTypes, CircleTypes } from "../../types/element-states";
import { useForm } from "../../utils/hooks/useForm";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { TAIL, HEAD } from "../../constants/element-captions";
import { linkedList } from "./LinkedList";
import { INPUT_LENGTH  } from "../../constants/InputLength";

import { validate } from "../../utils/validate";


export const ListPage: FC = () => {

  const [ array, setArray ] = useState<NodeTypes<string>[]>(linkedList.getArray());
  const [ circleState, setCircleState ] = useState({ modifiedIndex: -1, changingIndex: -1, });
  const [ circleIndex, setCircleIndex ] = useState(-1);
  const [ circlePosition, setCirclePosition ] = useState('');
  const [ circleCurrent, setCircleCurrent ] = useState('');
  const { values, onChange, setValues } = useForm({ index: '', value: '' });
  const [ loader, setLoader ] = useState({
    addHead: false,
    addTail: false,
    deleteHead: false,
    deleteTail: false,
    addIndex: false,
    deleteIndex: false,
    disabled: false,
  });

  const addHead = async () => {
    setLoader({ ...loader, addHead: true, disabled: true });
    
    setCircleCurrent(values.value);
    setValues({ value: '', index: '' });
    setCircleIndex(0);
    setCirclePosition(HEAD);
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    linkedList.addHead(values.value);
    setArray([...linkedList.getArray()]);
    setCircleState({ ...circleState, modifiedIndex: 0 });
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleState({ ...circleState, modifiedIndex: -1 });
    setValues({ value: '', index: '' });
    
    setLoader({ ...loader, addHead: false, disabled: false });
  };

  const addTail = async () => {
    setLoader({ ...loader, addTail: true, disabled: true });

    setCircleCurrent(values.value);
    setCircleIndex(linkedList.getSize() - 1);
    setCirclePosition(HEAD);
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    linkedList.addTail(values.value);
    setArray([...linkedList.getArray()]);
    setCircleState({ ...circleState, modifiedIndex: linkedList.getSize() - 1 });
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleState({ ...circleState, modifiedIndex: -1 });
    setValues({ value: '', index: '' });

    setLoader({ ...loader, addTail: false, disabled: false });
  };

  const deleteHead = async () => {
    setLoader({ ...loader, deleteHead: true, disabled: true });

    setCircleCurrent(linkedList.getFirstNode()!.value);
    linkedList.getFirstNode()!.value = '';
    setCircleIndex(0);
    setCirclePosition(TAIL);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    setValues({ value: '', index: '' });

    setLoader({ ...loader, deleteHead: false, disabled: false });
  };

  const deleteTail = async () => {
    setLoader({ ...loader, deleteTail: true, disabled: true });
    setCircleCurrent(linkedList.getLastNode()!.value);
    linkedList.getLastNode()!.value = '';
    setCircleIndex(linkedList.getSize() - 1);
    setCirclePosition(TAIL);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    setValues({ value: '', index: '' });
    setLoader({ ...loader, deleteTail: false, disabled: false });
  };

  const addIndex = async () => {
    setLoader({ ...loader, addIndex: true, disabled: true });

    for (let i = -1; i <= Number(values.index); i++) {
      setCircleCurrent(values.value);
      setCirclePosition(HEAD);
      setCircleIndex(i);
      setCircleState({ ...circleState, changingIndex: i - 1 });
      await setDelay(SHORT_DELAY_IN_MS);
    }
    linkedList.addIndex(Number(values.index), values.value);
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    setCircleState({ ...circleState, modifiedIndex: Number(values.index) });
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleState({ ...circleState, modifiedIndex: -1 });
    setValues({ value: '', index: '' });

    setLoader({ ...loader, addIndex: false, disabled: false });
  };

  const deleteIndex = async () => {
    setLoader({ ...loader, deleteIndex: true, disabled: true });

    for (let i = 0; i <= Number(values.index); i++) {
      setCircleState({ ...circleState, changingIndex: i });
      await setDelay(SHORT_DELAY_IN_MS);
    }

    setCircleState({ ...circleState, changingIndex: Number(values.index) - 1 });
    setCircleCurrent( String(linkedList.getIndexNode(Number(values.index))?.value) );
    linkedList.getIndexNode(Number(values.index))!.value = "";
    setArray([...linkedList.getArray()]);
    setCircleIndex(Number(values.index));
    setCirclePosition(TAIL);
    linkedList.deleteIndex(Number(values.index));
    await setDelay(SHORT_DELAY_IN_MS);
    setArray([...linkedList.getArray()]);
    setCircleState({ ...circleState, changingIndex: -1 });
    setCircleIndex(-1);
    setValues({ value: '', index: '' });

    setLoader({ ...loader, deleteIndex: false, disabled: false });
  };

  const setCircle = ( index: number, circleState: CircleTypes): ElementStates => {
    return circleState.modifiedIndex === index
      ? ElementStates.Modified
      : circleState.changingIndex >= index
      ? ElementStates.Changing
      : ElementStates.Default;
  };

  const showHead = (index: number) => {
    if (circleIndex === index && circlePosition === HEAD) {
      return (
        <Circle isSmall letter={circleCurrent} state={ElementStates.Changing} />
      );
    } else if (index === 0) {
      return "head";
    } else {
      return undefined;
    }
  };

  const showTail = (index: number) => {
    if (circleIndex === index && circlePosition === TAIL) {
      return (
        <Circle isSmall letter={circleCurrent} state={ElementStates.Changing} />
      );
    } else if (index === array.length - 1) {
      return "tail";
    } else {
      return undefined;
    }
  };

  validate(values)


  return (
    <SolutionLayout title="Связный список">
      <form className={style.form} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} >
        <fieldset className={style.fieldset} name='tailhead' >
          <Input
            placeholder="Введите значение"
            name="value"
            type="text"
            data="input-value"
            extraClass={style.input}
            maxLength={INPUT_LENGTH}
            isLimitText={true}
            value={values.value}
            onChange={onChange}
            required
          />
          <Button
            text="Добавить в head"
            type="button"
            data="add-at-head-button"
            extraClass={style.smallButton}
            onClick={addHead}
            isLoader={loader.addHead}
            disabled={!values.value || loader.disabled}
          />
          <Button
            text="Добавить в tail"
            type="button"
            data="add-at-tail-button"
            extraClass={style.smallButton}
            onClick={addTail}
            isLoader={loader.addTail}
            disabled={!values.value || loader.disabled}
          />
          <Button
            text="Удалить из head" 
            type="button"
            data="delete-at-head-button"
            extraClass={style.smallButton}
            onClick={deleteHead}
            isLoader={loader.deleteHead}
            disabled={array.length === 0 || loader.disabled}
          />
          <Button
            text="Удалить из tail"
            type="button"
            data="delete-at-tail-button"
            extraClass={style.smallButton}
            onClick={deleteTail}
            isLoader={loader.deleteTail}
            disabled={array.length === 0 || loader.disabled}
          />
        </fieldset>
        <fieldset className={style.fieldset} name='atIndex'>
          <Input 
            placeholder="Введите индекс"  
            name="index" 
            type="number" 
            data="index-value"         
            extraClass={style.input} 
            value={values.index} 
            onChange={onChange} 
            required
          />
          <Button
            text="Добавить по индексу"
            type="button"
            data="add-at-index-button"
            extraClass={style.button}
            onClick={addIndex}
            isLoader={loader.addIndex}
            disabled={ 
              !!!(values.index && values.value) ||
              loader.disabled ||
              Number(values.index) > array.length - 1 ||
              Number(values.index) < 0
            }
          />
          <Button
            text="Удалить по индексу"
            type="button"
            data="delete-at-index-button"
            extraClass={style.button}
            onClick={deleteIndex}
            disabled={!values.index || loader.disabled || Number(values.index) > array.length - 1}
            isLoader={loader.deleteIndex}
          />
        </fieldset>
      </form>
      <ul className={style.list}>
        {array.map((item, index) => {
          return (
            <li className={style.listItem} key={index} >
              
              <Circle
                letter={item.value}
                index={index}
                head={showHead(index)}
                tail={showTail(index)}
                state={setCircle(index, circleState)}
              />
              
              { index !== array.length - 1 && <ArrowIcon /> }
            </li>
          )
        })}
      </ul>
    </SolutionLayout>
  );
};
