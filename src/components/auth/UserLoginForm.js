import React from 'react';
import styled from 'styled-components';

import Form from '../elements/formElements/Form';
import Label from '../elements/formElements/Label';
import TextInput from '../elements/formElements/TextInput';
import SubmitButton from '../elements/formElements/SubmitButton';

const UserLoginForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Email or Username"
        />
      </div>
      <div>
        <TextInput
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <SubmitButton>Sign in</SubmitButton>
    </Form>
  );
};

export default UserLoginForm;
