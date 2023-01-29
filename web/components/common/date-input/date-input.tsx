import React from 'react';
import {
  useOutsideClick,
  useDisclosure,
  Box,
  Popover,
  PopoverTrigger,
  Input,
  InputGroup,
  InputRightElement,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import {
  Calendar,
  CalendarControls,
  CalendarDate,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek,
} from '@uselessdev/datepicker';
import { format, isValid, parse, isAfter } from 'date-fns';
import { enAU } from 'date-fns/locale';
import { FiCalendar } from 'react-icons/fi';

export interface DateInputProps extends Omit<Calendar, 'value' | 'onSelectDate'> {
  date: CalendarDate;
  onDateChange: (date: CalendarDate) => void;
}
export const DateInput = (props: DateInputProps) => {
  const { date, onDateChange } = props;

  const [value, setValue] = React.useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const calendarRef = React.useRef(null);

  const handleSelectDate = (date: CalendarDate) => {
    onDateChange(date);
    setValue(() => (isValid(date) ? format(date, 'dd/MM/yyyy') : ''));
    onClose();
  };

  const match = (value: string) => value.match(/(\d{2})\/(\d{2})\/(\d{4})/);

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);

    if (match(target.value)) {
      onClose();
    }
  };

  useOutsideClick({
    ref: calendarRef,
    handler: onClose,
    enabled: isOpen,
  });

  React.useEffect(() => {
    if (match(value)) {
      const _date = parse(value, 'dd/MM/yyyy', new Date());

      if (isAfter(_date, new Date())) {
        return onDateChange(_date);
      } else {
        setValue('');
        onDateChange(null);
      }
    }
  }, [value]);

  return (
    <Box>
      <Popover
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        isLazy
      >
        <PopoverTrigger>
          <Box onClick={onOpen} ref={initialRef}>
            <InputGroup>
              <Input placeholder="Select date" value={value} onChange={handleInputChange} />
              <InputRightElement>
                <FiCalendar />
              </InputRightElement>
            </InputGroup>
          </Box>
        </PopoverTrigger>

        <PopoverContent
          p={0}
          w="min-content"
          border="none"
          outline="none"
          _focus={{ boxShadow: 'none' }}
          ref={calendarRef}
        >
          <Calendar
            locale={enAU}
            value={{ start: date }}
            onSelectDate={handleSelectDate}
            singleDateSelection
            {...props}
          >
            <PopoverBody p={0}>
              <CalendarControls>
                <CalendarPrevButton />
                <CalendarNextButton />
              </CalendarControls>

              <CalendarMonths>
                <CalendarMonth>
                  <CalendarMonthName />
                  <CalendarWeek />
                  <CalendarDays />
                </CalendarMonth>
              </CalendarMonths>
            </PopoverBody>
          </Calendar>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
