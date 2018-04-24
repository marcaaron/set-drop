import React, { Component } from 'react';

class VenueInfo extends Component {
  render() {
    const {handleChange} = this.props;
    const {location} = this.props.json;
    const {street_number, street, city, state, country, postal_code} = location.address;
    const {venue, phone, website} = location;

    return (
          <div className="venue-info">
            <h2>Venue Information</h2>
            <input
              type="text"
              placeholder="Venue Name"
              onChange={(e)=>handleChange(e, 'location','venue')}
              value={venue && venue}
              required
            />
            <input
              type="text"
              placeholder="Street Number"
              onChange={(e)=>handleChange(e, 'location','address','street_number')}
              value={street_number && street_number}
              required
            />
            <input
              type="text"
              placeholder="Street"
              onChange={(e)=>handleChange(e, 'location','address','street')}
              value={street && street}
              required
            />
            <input
              type="text"
              placeholder="City"
              onChange={(e)=>handleChange(e, 'location','address','city')}
              value={city && city}
              required
            />
             <input
               type="text"
               placeholder="State"
               onChange={(e)=>handleChange(e, 'location','address','state')}
               value={state && state}
               required
             />
             <input
               type="text"
               placeholder="Country"
               onChange={(e)=>handleChange(e, 'location','address','country')}
               value={country && country}
               required
             />
             <input
               type="text"
               placeholder="Postal Code"
               onChange={(e)=>handleChange(e, 'location','address','postal_code')}
               value={postal_code && postal_code}
               required
             />
             <input
               type="text"
               placeholder="Phone"
               onChange={(e)=>handleChange(e, 'location','phone')}
               value={phone && phone}
               required
             />
             <input
               type="text"
               placeholder="Website"
               onChange={(e)=>handleChange(e, 'location','website')}
               value={website && website}
               required
             />
          </div>
    );
  }
}

export default VenueInfo;
