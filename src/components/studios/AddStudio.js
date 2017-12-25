import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

import Form from '../elements/formElements/Form';
import TickSubmitButton from '../elements/formElements/TickSubmitButton';
import AutoComplete from '../utility/AutoComplete';

class AddStudio extends React.Component {
  constructor() {
    super();
    this.state = {
      studios: null,
      locations: [],
      location: {
        resident: true
      }
    };

    this.findLocation = this.findLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    Axios
      .get('/api/studios')
      .then(res => this.setState({studios: res.data, locations: this.props.locations}))
      .catch(err => console.log(err));
  }

  findLocation(name, address, location, website, country, locationId, image) {
    // console.log('finding location', 'name =>', name, 'address =>', address, 'location =>', location, 'website =>', website, 'country =>', country, 'locationId =>', locationId);
    console.log('IMAGEEE', image);
    const studio = this.state.studios.find(studio => studio.locationId === locationId);

    if (!studio) {
      const newStudio = {
        name,
        address,
        location,
        website,
        country,
        locationId,
        image,
        type: this.state.location.type
      };

      Axios
        .post('/api/studios', newStudio)
        .then(res => {
          const studios = this.state.studios.concat(res.data);
          const location = Object.assign({}, this.state.location, { studioEvent: res.data.id });
          this.setState({location, studios});
        })
        .catch(err => console.log(err));
    } else {
      const location = Object.assign({}, this.state.location, { studioEvent: studio.id });
      this.setState({location});
    }
  }

  handleChange({target: {name, value}}) {
    // const showDate = value === 'event' || value === 'false';
    // console.log(showDate);
    let location;
    if (name === 'resident') {
      const trueFalse = value === 'true' ? true : false;
      location = Object.assign({}, this.state.location, {[name]: trueFalse});
    } else {
      location = Object.assign({}, this.state.location, {[name]: value});
    }

    this.setState({location});
  }

  handleSubmit(e) {
    e.preventDefault();
    Axios
      .post(`/api/artists/${Auth.getPayload().userId}/locations`, this.state.location, {
        headers: { 'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        this.props.fetchArtist();
        this.props.showForm('showStudioForm');
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <Form
        modal={true}
        onSubmit={this.handleSubmit}
      >
        <h1>Add a workplace:</h1>
        <p>What is it?</p>
        <input type="radio" name="type" value="studio" onChange={this.handleChange} /> Studio
        <input type="radio" name="type" value="event" onChange={this.handleChange} /> Event
        { this.state.location.type && <div>
          <p>Search for the {this.state.location.type}:</p>
          <AutoComplete
            findLocation={this.findLocation}
          />
          { this.state.location.type === 'studio' && <div><p>Resident:</p>
            <input type="radio" name="resident" value={true} onChange={this.handleChange} /> Yes
            <input type="radio" name="resident" value={false} onChange={this.handleChange} /> No
          </div>}
          { (this.state.location.type === 'event' || (this.state.location.type === 'studio' && !this.state.location.resident)) && <div>
            <input
              type="date"
              name="startDate"
              onChange={this.handleChange}
            />
            <input
              type="date"
              name="endDate"
              onChange={this.handleChange}
            />
          </div>}
          <TickSubmitButton />
        </div>}
        <p onClick={() => this.props.showForm('showStudioForm')}>CANCEL</p>
      </Form>
    );
  }
}

export default AddStudio;
