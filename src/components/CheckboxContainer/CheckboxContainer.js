import './CheckboxContainer.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function CheckboxContainer({onFilterClick, filterIsOn}) {
  return (
    <div className="checkbox-container">
      <FilterCheckbox onFilterClick={onFilterClick} filterIsOn={filterIsOn} />
      <p className="checkbox-container__desc">Короткометражки</p>
    </div>
  );
}

export default CheckboxContainer;
