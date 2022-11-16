import './CheckboxContainer.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function CheckboxContainer() {
  return (
    <div className="checkbox-container">
      <FilterCheckbox />
      <p className="checkbox-container__desc">Короткометражки</p>
    </div>
  );
}

export default CheckboxContainer;
