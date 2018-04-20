import React, { Component } from 'react';

class VenueInfo extends Component {
  render() {
    const {handleChange} = this.props;
    const {location} = this.props.json;
    const {address_line, city, state, country, postal_code} = location.address;
    const {venue} = location;

    return (
          <div className="venue-info">
            <h2>Venue Information</h2>
            <input
              type="text"
              placeholder="Venue Name"
              onChange={(e)=>handleChange(e, 'location','venue')}
              value={venue && venue}
            />
            <input
              type="text"
              placeholder="Street Address"
              autoComplete='address-line1'
              onChange={(e)=>handleChange(e, 'location','address','address_line')}
              value={address_line && address_line}
            />
            <input
              type="text"
              autoComplete='address-level2'
              placeholder="City"
              onChange={(e)=>handleChange(e, 'location','address','city')}
              value={city && city}
            />
             <input
               type="text"
               autoComplete='address-level1'
               placeholder="State"
               onChange={(e)=>handleChange(e, 'location','address','state')}
               value={state && state}
             />
             <input
               type="text"
               autoComplete='country-name'
               placeholder="Country"
               onChange={(e)=>handleChange(e, 'location','address','country')}
               value={country && country}
             />
             <input
               type="text"
               autoComplete='postal-code'
               placeholder="Postal Code"
               onChange={(e)=>handleChange(e, 'location','address','postal_code')}
               value={postal_code && postal_code}
             />
          </div>
    );
  }
}

export default VenueInfo;
