import style from "./sorting-page.module.css";
import { FC, FormEvent, useState, ChangeEvent } from "react";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { ElementStates, SortingTypes } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { setDelay } from "../../utils/setDelay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { randomArray } from "./utils";
import { swap } from "../../utils/swap";


export const SortingPage: FC = () => {

  const [ array, setArray ] = useState<SortingTypes[]>(randomArray());
  const [ radioInput, setRadioInput ] = useState("select");
  const [ loader, setLoader ] = useState({ loader: false, ascending: false, descending: false, });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioInput(e.target.value);
  };
  const handleSort = (direction: Direction) => {
    if (radioInput === "select") {
      selectionSorting(array, direction);
    } else {
      bubbleSorting(array, direction);
    }
  };
  const setNewArray = () => {
    setArray(randomArray());
  };

  const selectionSorting = async (arr: SortingTypes[], direction: Direction) => {
    if (direction === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }
    const length = arr.length;

    for (let i = 0; i <= length - 1; i++) {
      let maxIndex = i;
      arr[maxIndex].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;

        setArray([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Descending 
          ? arr[j].value > arr[maxIndex].value 
          : arr[j].value < arr[maxIndex].value
        ) {
          maxIndex = j;
          arr[j].state = ElementStates.Changing;
          arr[maxIndex].state = i === maxIndex ? ElementStates.Changing : ElementStates.Default;
        }

        if (j !== i) {
          arr[j].state = ElementStates.Default;
        }
        setArray([...arr]);
      }

      swap(arr, maxIndex, i);
      arr[maxIndex].state = ElementStates.Default;
      arr[i].state = ElementStates.Modified;
      setArray([...arr]);
    }
    setLoader({ ascending: false, descending: false, loader: false });
  };


  const bubbleSorting = async (arr: SortingTypes[], direction: Direction) => {
    if (direction === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }
    const length = arr.length;

    for (let i = 0; i <= length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;

        setArray([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);

        if (direction === Direction.Descending 
          ? arr[j].value < arr[j + 1].value 
          : arr[j].value > arr[j + 1].value) {
          swap(arr, j, j + 1);
          }
          arr[j].state = ElementStates.Default;
        }
        
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArray([...arr]);
      }
    setLoader({ ascending: false, descending: false, loader: false });
  }; 
  
  
  return (
    <SolutionLayout title="Сортировка массива">
      <form className={style.form} onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()} >
        <fieldset name='radios' className={`${style.fieldset} + ${style.radioInput}`} >

          <RadioInput 
            label="Выбор" 
            name='radioInput'
            value='select'
            disabled={loader.loader} 
            onChange={onChange} 
          />

          <RadioInput 
            label="Пузырёк"
            name='radioInput'
            value='bubble'
            disabled={loader.loader}
            onChange={onChange} 
          />

        </fieldset>
        <fieldset name='buttons' className={`${style.fieldset} + ${style.buttons}`} >

          <Button
            text="По возрастанию"
            extraClass={style.button}
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
            isLoader={loader.ascending}
            disabled={loader.descending}
          />

          <Button
            text="По убыванию"
            extraClass={style.button}
            sorting={Direction.Descending}
            onClick={() => handleSort(Direction.Descending)}
            isLoader={loader.descending}
            disabled={loader.ascending}
          />

        </fieldset>

        <Button
          text="Новый массив"
          type="submit"
          extraClass={style.button}
          onClick={setNewArray}
          disabled={loader.loader}
        />

      </form>
      <ul className={style.list}>
        {array.map((item, index) => {
          return (
            <li key={index}>
              <Column index={item.value} state={item.state} />
            </li>
          )})
        }
      </ul>
    </SolutionLayout>
  );
};
