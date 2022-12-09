import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
  useNumberInput,
  UseCounterProps,
  StyleProps,
  ThemingProps,
} from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';

export interface MobileNumberInputProps
  extends StyleProps,
    ThemingProps<'InputNumber'>,
    UseCounterProps {}

export const MobileNumberInput = (props: MobileNumberInputProps) => {
  const { step, value, defaultValue, min, max, precision, onChange, ...rest } = props;
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step,
    value,
    defaultValue,
    min,
    max,
    precision,
    onChange,
  });
  return (
    <InputGroup {...rest}>
      <InputLeftElement>
        <IconButton
          aria-label="Search database"
          icon={<FiMinus />}
          variant="ghost"
          size="sm"
          {...getDecrementButtonProps()}
        />
      </InputLeftElement>
      <Input
        type="number"
        textAlign="center"
        {...getInputProps()}
        onFocus={(e) => e.target.select()}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search database"
          icon={<FiPlus />}
          variant="ghost"
          size="sm"
          {...getIncrementButtonProps()}
        />
      </InputRightElement>
    </InputGroup>
  );
};
