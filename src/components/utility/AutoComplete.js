/* global google */
import React from 'react';

class AutoComplete extends React.Component {
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.input, {
      types: ['establishment']
    });

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      console.log(place);
      // I need website, name, country, address, image, locationId, lat, lng
      const { name, website, place_id } = place;
      const address = place.formatted_address;
      const country = place.address_components.find(component => component.types.includes('country')).long_name;
      const location = place.geometry.location.toJSON();
      this.props.findLocation(name, address, location, website, country, place_id);
    });
  }

  render() {
    return(
      <input className="autocomplete-input" ref={element => this.input = element} />
    );
  }
}

export default AutoComplete;
