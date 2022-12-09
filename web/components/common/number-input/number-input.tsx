import * as React from 'react';

import {
  forwardRef,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputProps as ChakraNumberInputProps,
} from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';

interface NumberInputOptions {
  /**
   * Hide the stepper.
   */
  hideStepper?: boolean;
  /**
   * Render a custom increment icon.
   */
  incrementIcon?: React.ReactNode;
  /**
   * Render a custom decrement icon.
   */
  decrementIcon?: React.ReactNode;
}

export interface NumberInputProps extends ChakraNumberInputProps, NumberInputOptions {}

export const NumberInput = forwardRef<NumberInputProps, 'div'>((props, ref) => {
  const { hideStepper, incrementIcon, decrementIcon, ...rest } = props;

  return (
    <ChakraNumberInput {...rest} ref={ref}>
      <NumberInputField bg="bg-surface" />

      {!hideStepper && (
        <NumberInputStepper>
          <NumberIncrementStepper>{incrementIcon}</NumberIncrementStepper>
          <NumberDecrementStepper>{decrementIcon}</NumberDecrementStepper>
        </NumberInputStepper>
      )}
    </ChakraNumberInput>
  );
});

NumberInput.defaultProps = {
  hideStepper: false,
};

if (__DEV__) {
  NumberInput.displayName = 'NumberInput';
}
