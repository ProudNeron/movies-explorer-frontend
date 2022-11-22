import './FilterCheckbox.css';

function FilterCheckbox({onFilterClick}) {
  return (
    <div className="filter-checkbox">
      <input onClick={onFilterClick} type="checkbox" className="filter-checkbox__switcher" />
    </div>
  );
}

export default FilterCheckbox;
