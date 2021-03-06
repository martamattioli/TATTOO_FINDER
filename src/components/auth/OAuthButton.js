import React from 'react';
import Auth from '../../lib/Auth';
import OAuth from '../../lib/OAuth';
import queryString from 'query-string';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class OAuthButton extends React.Component {
  componentWillMount() {
    // console.log('this props', this.props);
    this.provider = OAuth.getProvider(this.props.provider);
    // console.log('this provider', this.provider);
    if(!this.props.location.search.match(/code/) || localStorage.getItem('provider') !== this.props.provider) return false;
    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;
    Axios
      .post(this.provider.url, data)
      .then(res => {
        console.log('res', res);
        Auth.setToken(res.data.token);
        return res;
      })
      .then(res => {
        localStorage.removeItem('provider');
        return res;
      })
      .then(res => {
        this.props.history.replace(this.props.location.pathname);
        return res;
      })
      .then(res => this.props.history.push({
        pathname: '/',
        state: { message: res.data.message }
      }))
      .catch(err => console.log(err));
  }

  setProvider = () => localStorage.setItem('provider', this.props.provider);

  render () {

    return (
      <section>
        <a
          href={this.provider.authLink}
          onClick={this.setProvider}
        >
          {this.props.children}
        </a>
      </section>
    );
  }
}

export default withRouter(OAuthButton);
