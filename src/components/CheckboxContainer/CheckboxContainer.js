import './CheckboxContainer.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function CheckboxContainer({onFilterClick}) {
  return (
    <div className="checkbox-container">
      <FilterCheckbox onFilterClick={onFilterClick} />
      <p className="checkbox-container__desc">Короткометражки</p>
    </div>
  );
}

export default CheckboxContainer;
