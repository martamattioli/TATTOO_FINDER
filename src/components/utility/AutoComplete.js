/* global google */
import React from 'react';

class AutoComplete extends React.Component {
  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.input, {
      types: ['establishment']
    });

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      console.log('PLACE===> ', place);
      // I need website, name, country, address, image, locationId, lat, lng
      const { name, website, place_id } = place;
      const address = place.formatted_address;
      let photos = place.photos.map(photo => {
        return photo.getUrl({
          maxWidth: 1920,
          maxHeight: 500
        });
      });
      if (photos.length < 1) photos = ['https://static1.squarespace.com/static/57a236d4d482e929fb22688d/57a38b25414fb54f51f2dca4/57a38c4ab3db2b452529c060/1470336076803/Safe+House-7.jpg'];
      console.log('PHOTOSSSS', photos);
      const country = place.address_components.find(component => component.types.includes('country')).long_name;
      const location = place.geometry.location.toJSON();
      this.props.findLocation(name, address, location, website, country, place_id, photos);
    });
  }

  render() {
    return(
      <input className="autocomplete-input" ref={element => this.input = element} />
    );
  }
}

export default AutoComplete;
