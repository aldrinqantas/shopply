import React from 'react';

import {
  forwardRef,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  InputProps,
} from '@chakra-ui/react';
import { __DEV__ } from '@chakra-ui/utils';
import { FiSearch, FiX } from 'react-icons/fi';

export interface SearchInputProps extends InputProps {
  /**
   * The placeholder text for the input
   * @type string
   * @default Search
   */
  placeholder?: string;
  /**
   * The icon to render before the input text
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * The icon to render in the reset button
   * @type React.ReactElement
   */
  resetIcon?: React.ReactElement;
  /**
   * Right element rendered when the value is empty
   * @type React.ReactElement
   */
  rightElement?: React.ReactElement;
  /**
   * Callback to trigger when the reset button is clicked or escape key is pressed
   */
  onReset?: () => void;
  /**
   * Callback to trigger when the reset button is clicked or escape key is pressed
   */
  onSearch?: (value: string | number | readonly string[]) => void;
}

export const SearchInput = forwardRef<SearchInputProps, 'input'>((props, ref) => {
  const { value, size, variant, icon, resetIcon, rightElement, onReset, onSearch, ...inputProps } =
    props;

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && onReset) {
        onReset();
      }
      if (event.key === 'Enter' && onSearch) {
        onSearch(value);
      }
    },
    [onReset],
  );

  const btnSize = size === 'lg' ? 'sm' : 'xs';

  return (
    <InputGroup size={size}>
      <InputLeftElement>{icon || <FiSearch />}</InputLeftElement>
      <Input
        type="text"
        size={size}
        value={value}
        ref={ref}
        onKeyDown={onKeyDown}
        {...inputProps}
      />
      <InputRightElement>
        {value ? (
          <IconButton
            onClick={onReset}
            size={btnSize}
            variant="ghost"
            aria-label="Reset search"
            icon={resetIcon || <FiX />}
          />
        ) : (
          rightElement
        )}
      </InputRightElement>
    </InputGroup>
  );
});

SearchInput.defaultProps = {
  placeholder: 'Search',
};

if (__DEV__) {
  SearchInput.displayName = 'SearchInput';
}
