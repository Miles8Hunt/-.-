import renderer from "react-test-renderer";
import { Circle } from "../circle";
import { ElementStates } from "../../../../types/element-states";


describe(' Тест компонента Circle:', () => {

  it('Компонент Circle без буквы отрисован корректно', () => {
    const circle = renderer.create(<Circle />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle c буквой отрисован корректно', () => {
    const circle = renderer.create(<Circle letter='F' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle с head отрисован корректно', () => {
    const circle = renderer.create(<Circle head='F' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle с react-элементом в head отрисован корректно', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle с tail отрисован корректно', () => {
    const circle = renderer.create(<Circle tail='F' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle с react-элементом в tail отрисован корректно', () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle с index отрисован корректно', () => {
    const circle = renderer.create(<Circle index='5' />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle с isSmall === true отрисован корректно', () => {
    const circle = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle в состоянии default отрисован корректно', () => {
    const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle в состоянии changing отрисован корректно', () => {
    const circle = renderer.create(<Circle state={ElementStates.Changing}  />).toJSON();
    expect(circle).toMatchSnapshot();
  });

  it('Компонент Circle в состоянии modified отрисован корректно', () => {
    const circle = renderer.create(<Circle state={ElementStates.Modified}  />).toJSON();
    expect(circle).toMatchSnapshot();
  });
});
