import React from 'react';
import styled from 'styled-components';

import Label from '../elements/formElements/Label';
import TextInput from '../elements/formElements/TextInput';
import SubmitButton from '../elements/formElements/SubmitButton';

const Form = styled.form`
  max-width: 500px;
  margin-bottom: 30px;
`;

const UserRegisterForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <TextInput
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
        />
      </div>
      <div>
        <TextInput
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
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
      <div>
        <TextInput
          type="password"
          name="passwordConfirmation"
          value={user.passwordConfirmation}
          onChange={handleChange}
          placeholder="Confirm your password"
        />
      </div>
      <SubmitButton>Sign up</SubmitButton>
    </Form>
  );
};

export default UserRegisterForm;
