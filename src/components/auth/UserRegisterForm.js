import React from 'react';

import Form from '../elements/formElements/Form';
import Label from '../elements/formElements/Label';
import TextInput from '../elements/formElements/TextInput';
import SubmitButton from '../elements/formElements/SubmitButton';
import DragDrop from '../utility/DragDrop';

const UserRegisterForm = ({ user, cta, handleChange, handleSubmit, registrationCode, passwordPlaceholder }) => {
  return (
    <Form onSubmit={handleSubmit}>
      { registrationCode && <div>
        <TextInput
          type="password"
          name="registrationCode"
          value={user.registrationCode}
          onChange={handleChange}
          placeholder="Enter the registration code"
        />
      </div>}
      <div>
        <TextInput
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Choose a username"
        />
      </div>
      <div>
        <TextInput
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Choose an email"
        />
      </div>
      <div>
        <TextInput
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          placeholder={passwordPlaceholder || 'Enter a password'}
        />
      </div>
      <div>
        <TextInput
          type="password"
          name="passwordConfirmation"
          value={user.passwordConfirmation}
          onChange={handleChange}
          placeholder="Confirm password"
        />
      </div>
      <div>
        <Label>Add an image</Label>
        <DragDrop
          onChange={handleChange}
          value={user.base64 || user.imageSRC}
        />
      </div>
      <SubmitButton>{cta}</SubmitButton>
    </Form>
  );
};

export default UserRegisterForm;
