import { useEffect, useState } from 'react';
import { useForm, UseFormRegister, ValidationRule } from 'react-hook-form';

import { InputContent } from './styles';

interface IProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  valueDefault?: string;
  pattern?: ValidationRule<RegExp>;
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
  valueDefault,
  pattern,
  ...rest
}: InputProps) {
  const {
    formState: { errors },
  } = useForm();
  const [labelStyle, setLabelStyle] = useState({});

  const sty = {
    background: '#FAFAFA',
    fontSize: '0.875rem',
    top: '-0.5rem',
    left: '0.8rem',
    zIndex: 2,
  };

  function handleBlur(value: string) {
    if (value) {
      setLabelStyle(sty);
    } else {
      setLabelStyle({});
    }
  }

  useEffect(() => {
    if (valueDefault) {
      setLabelStyle(sty);
    }
  }, []);

  return (
    <InputContent>
      {label && (
        <label style={labelStyle} className="label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        {...register(name, {
          required: isRequired,
          pattern,
        })}
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
