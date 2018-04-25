import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import googleLogo from './powered_by_google_on_non_white_hdpi.png';
class Autocomplete extends Component {
  constructor(props){
    super(props);
    this.state = {
      address: ''
    }
  }

  componentDidMount(){
    if (typeof window !== 'undefined') {
      this.placesService = new window.google.maps.places.PlacesService(document.createElement('div'));
    }
  }

  handleAddressChange = (address) => {
    this.setState({address});
  }

  handleSelect = (address, placeId) => {
    this.placesService.getDetails({placeId}, (result) => {
      // const results = {...result};
      console.log(result);
      let location = {
        venue: '',
        address: {
          street_number: '',
          city: '',
          state: '',
          country: '',
          postal_code: ''
        },
        coords: {
          lng: '',
          lat: ''
        },
        website:'',
        phone:''
      };

      if(result.name){
        location.venue = result.name;
      }else{
        location.venue = '';
      }

      if(result.address_components){
        let street_number = result.address_components.filter(component=>component.types.includes('street_number'));
        if(street_number.length>0){
          street_number = street_number[0].short_name;
        }else{
          street_number = ''
        }
        location.address.street_number = street_number;

        let street = result.address_components.filter(component=>component.types.includes('route'));
        if(street.length>0){
          street = street[0].short_name;
        }else{
          street = ''
        }
        location.address.street = street;

        let city = result.address_components.filter(component=>component.types.includes('locality'));
        if(city.length>0){
          city = city[0].short_name;
        }else{
          city = ''
        }
        location.address.city = city;

        let state = result.address_components.filter(component=>component.types.includes('administrative_area_level_1'));
        if(state.length>0){
          state = state[0].short_name;
        }else{
          state = ''
        }
        location.address.state = state;

        let country = result.address_components.filter(component=>component.types.includes('country'));
        if(country.length>0){
          country = country[0].short_name;
        }else{
          country = ''
        }
        location.address.country = country;

        let postal_code = result.address_components.filter(component=>component.types.includes('postal_code'));
        if(postal_code.length>0){
          postal_code = postal_code[0].short_name;
        }else{
          postal_code = ''
        }
        location.address.postal_code = postal_code;
      }
      location.coords.lng = result.geometry.location.lng();
      location.coords.lat = result.geometry.location.lat();
      if(result.website){
        location.website = result.website;
      }
      if(result.formatted_phone_number){
        location.phone = result.formatted_phone_number;
      }
      this.props.populate(location);
    });
  }

  render() {
    // const searchOptions = {
    //   types: ['establishment']
    // };
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleAddressChange}
        onSelect={this.handleSelect}
        // searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div {...getSuggestionItemProps(suggestion, { className, style })}>
                    <span>{suggestion.description}</span>
                  </div>
                )
              })}
              <img className="google-logo" alt="Google Logo" src={googleLogo}/>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default Autocomplete;
