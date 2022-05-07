import { useRef, useCallback, useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs';
import { FiCamera } from 'react-icons/fi';

import { InputContent } from './styles';

interface IProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  onChange: ({ }: any) => void;
}


type InputProps = JSX.IntrinsicElements['input'] &
  IProps & {
    register: UseFormRegister<any>;
  };

const tiposArquivosAceitos = 'image/png, image/jpeg, image/gif, image/bmp';
const errorType = 'type';

export default function ArchInput({
  register,
  name,
  isRequired = false,
  label,
  children,
  onChange,
  ...rest
}: InputProps) {
  const inputRef = useRef<any>(null);

  const {
    formState: { errors },
  } = useForm();

  const [fileName, setFileName] = useState(null);


  const validacaoArquivo = (file: any) => {
    if (!file) return false;
    const { type, size } = file;
    const fileSize = size / 1024 / 1024; // size em MiB
    if (type && tiposArquivosAceitos.indexOf(type) < 0) return { error: errorType };
    return true;
  };

  const onChangeFile = (event: any) => {
    const file = event?.target?.files?.[0];
    const validacao = validacaoArquivo(file);

    if (validacao === true) {
      if (onChange) {
        onChange(file);
      }
    } else {
      onChange(undefined);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };


  return (
    <InputContent>
      <label htmlFor={`${name}-input`} className={fileName ? 'with-file' : ''}>
        <FiCamera />
        <span>{fileName || children}</span>
      </label>
      <input

        {...rest}
        name={name}
        type="file"
        accept={tiposArquivosAceitos}
        id={`${name}-input`}
        onChange={onChangeFile}
        ref={inputRef}
      />
    </InputContent>
  );
}
