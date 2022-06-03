import { useState, useEffect } from 'react';

type Option = {
  id: string;
  description: string;
}

interface ISelectProps {
  handleSelect: (option: Option) => void;
  options: Option[];
  defaultSelected: string;
  name: string;
}

export const AddressSelect = ({ handleSelect, defaultSelected, options, name }: ISelectProps) => {
  const [selected, setSelected] = useState(defaultSelected || options[0].id);

  const handleChangeSelected = (optionId: string) => {
    setSelected(optionId);
  };

  useEffect(() => {
    if (selected) {
      const option = options.find(item => item.id === selected);
      if (option) handleSelect(option);
    }
  }, [selected])

  return (
    <div>
      {options.map(option => (
        <div key={option.id}>
          <input
            type="radio"
            id={option.id}
            name={option.id}
            value={option.id}
            checked={selected === option.id}
            onChange={(e) => handleChangeSelected(e.target.value)} />
          <label htmlFor={option.id}>{option.description}</label>
        </div>
      ))}
    </div>
  )
}; 