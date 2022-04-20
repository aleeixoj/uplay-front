import { useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';

import { InputContent } from './styles';

interface IProps {
  name: string;
  label?: string;
  isRequired?: boolean;
}

type InputProps = JSX.IntrinsicElements['input'] &
  IProps & {
    register: UseFormRegister<any>;
  };

export default function Input({
  register,
  name,
  isRequired = false,
  label,
  children,
  ...rest
}: InputProps) {
  const {
    formState: { errors },
  } = useForm();
  const [labelStyle, setLabelStyle] = useState({});

  function handleBlur(value: string) {
    const sty = {
      background: '#FAFAFA',
      fontSize: '0.875rem',
      top: '-0.5rem',
      left: '0.8rem',
      zIndex: 2,
    };
    if (value) {
      setLabelStyle(sty);
    } else {
      setLabelStyle({});
    }
  }

  return (
    <InputContent>
      {label && (
        <label style={labelStyle} className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...register(name, { required: isRequired })}
        {...rest}
        onBlur={({ target }) => {
          handleBlur(target.value);
        }}
      />
      {children ? <span className="inputIcon">{children}</span> : null}
      {errors.name && <span>This field is required</span>}
    </InputContent>
  );
}
