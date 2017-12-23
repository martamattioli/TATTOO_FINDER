import React from 'react';
import Axios from 'axios';

import Form from '../elements/formElements/Form';
import TextInput from '../elements/formElements/TextInput';
import TickSubmitButton from '../elements/formElements/TickSubmitButton';
// import ModalBackground from '../elements/divs/ModalBackground';

class UserForm extends React.Component {
  constructor() {
    super();
    this.state ={
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const user = this.props.user;
    if (!user[this.props.field]) {
      user[this.props.field] = '';
    }
    this.setState({user});
  }

  handleChange({ target: { name, value}}) {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({user});
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = { [this.props.field]: this.state.user[this.props.field]};
    Axios
      .put(`/api/users/${this.props.user.id}`, user)
      .then(() => {
        this.props.fetchArtist();
        this.props.showForm('showUserForm');
      });
  }

  render() {
    if (!this.state.user) return null;
    return(
      <Form
        modal={true}
        onSubmit={this.handleSubmit}
      >
        <TextInput
          type="text"
          name={this.props.field}
          placeholder={this.props.field}
          display="inline-block"
          fontSize="18px"
          fontWeight="normal"
          value={this.state.user[this.props.field]}
          onChange={this.handleChange}
        />
        <TickSubmitButton />
      </Form>
    );
  }
}

export default UserForm;
