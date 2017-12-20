import React from 'react';
// import InstaAuth from '../../lib/InstaAuth';
import OAuth from '../../lib/OAuth';
import queryString from 'query-string';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';

class InstaFeed extends React.Component {
  componentWillMount() {
    this.provider = OAuth.getProvider(this.props.provider);
    if(!this.props.location.search.match(/code/) || localStorage.getItem('provider') !== this.props.provider) return false;
    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;
    Axios
      .post(this.provider.url, data, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        Auth.setToken(res.data.token);
        return res;
      })
      .then(res => {
        localStorage.removeItem('provider');
        return res;
      })
      .then(res => {
        this.props.history.push({
          pathname: `/artists/${Auth.getPayload().userId}`,
          state: { message: res.data.message }
        });
      })
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

export default withRouter(InstaFeed);
