import React from 'react';
import Form, { FormItem } from '../components/form';
import Input from '../components/input';

const App = () =>
  (
    <Form>
      <FormItem name="name">
        <Input value="123213" />
      </FormItem>
    </Form>
  );

export default App;
