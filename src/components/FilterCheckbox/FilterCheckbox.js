import './FilterCheckbox.css';

function FilterCheckbox({onFilterClick, filterIsOn}) {
  return (
    <div className="filter-checkbox">
      <input onClick={onFilterClick} type="checkbox" checked={filterIsOn} className="filter-checkbox__switcher" />
    </div>
  );
}

export default FilterCheckbox;
