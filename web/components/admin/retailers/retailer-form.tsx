import React from 'react';
import { Heading } from '@chakra-ui/react';

import { Form, FormLayout, Field } from '@components/common/form';

export interface RetailerFormProps {
  children?: React.ReactNode;
  onSubmit?: (data) => void;
  initValues?: any;
}

export const RetailerForm = (props: RetailerFormProps) => {
  const { children, onSubmit, initValues } = props;

  return (
    <Form onSubmit={onSubmit} defaultValues={{ deliveryState: 'QLD', ...initValues }}>
      <FormLayout>
        <Heading size="md">Retailer details</Heading>
        <Field
          name="tradingName"
          label="Tranding name"
          type="text"
          rules={{ required: 'Trading entity is required' }}
        />
        <Field
          name="corporateEntity"
          label="Corporate Entity"
          type="text"
          rules={{ required: 'Corporate name is required' }}
        />
        <Field name="abn" label="ABN" type="text" />
        <FormLayout columns={{ sm: 2 }}>
          <Field name="emailAddress" label="Business email" type="text" />
          <Field name="phoneNumber" label="Business phone" type="text" />
        </FormLayout>
        <Heading size="md" mt="4">
          Address
        </Heading>
        <Field
          name="deliveryLine1"
          label="Address line 1"
          type="text"
          rules={{ required: 'Line 1 is required' }}
        />
        <Field name="deliveryLine2" label="Address line 2" type="text" />
        <Field
          name="deliverySuburd"
          label="Suburb"
          type="text"
          rules={{ required: 'Suburb is required' }}
        />
        <FormLayout columns={{ sm: 2 }}>
          <Field
            name="deliveryState"
            label="State"
            type="native-select"
            options={['QLD', 'NSW'].map((item) => ({ value: item }))}
          />
          <Field name="deliveryPostcode" label="Postcode" type="number" hideStepper />
        </FormLayout>
        {children}
      </FormLayout>
    </Form>
  );
};
