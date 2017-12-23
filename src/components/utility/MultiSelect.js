import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const MultiSelect = ({ value, styles, removeSelected, handleSelectChange, stayOpen }) => {
  console.log(styles);
  return (
    <Select
      name="form-field-name"
      placeholder="Select one or more styles to add"
      closeOnSelect={!stayOpen}
      onChange={handleSelectChange}
      options={styles}
      removeSelected={removeSelected}
      multi
      matchPos="start"
      value={value}
    />
  );
};

export default MultiSelect;
