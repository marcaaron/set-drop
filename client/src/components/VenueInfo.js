import React, { Component } from 'react';

const VenueInfo = (props) => {
  const {handleVenueChange, err} = props;
  const {location} = props.json;
  const {street_number, street, city, state, country, postal_code} = location.address;
  const {venue, phone, website} = location;
  return (
    <div className="venue-info">
      <h2>Venue Information</h2>
      <input
        type="text"
        placeholder="Venue Name"
        onChange={(e)=>handleVenueChange(e, 'location','venue')}
        value={venue || ''}
        required
      />
      {err.venue && <div style={{color:'red'}}>{err.venue}</div>}
      <input
        type="text"
        autoComplete='address-line1'
        placeholder="Street Number"
        onChange={(e)=>handleVenueChange(e, 'location','address','street_number')}
        value={street_number || ''}
      />
      {err.street_number && <div style={{color:'red'}}>{err.street_number}</div>}

      <input
        type="text"
        placeholder="Street"
        onChange={(e)=>handleVenueChange(e, 'location','address','street')}
        value={street || ''}
      />
      {err.street && <div style={{color:'red'}}>{err.street}</div>}

      <input
        type="text"
        placeholder="City"
        onChange={(e)=>handleVenueChange(e, 'location','address','city')}
        value={city || ''}
        required
      />
      {err.city && <div style={{color:'red'}}>{err.city}</div>}

       <input
         type="text"
         placeholder="State"
         onChange={(e)=>handleVenueChange(e, 'location','address','state')}
         value={state || ''}
         required
       />
       {err.state && <div style={{color:'red'}}>{err.state}</div>}

       <input
         type="text"
         placeholder="Country"
         onChange={(e)=>handleVenueChange(e, 'location','address','country')}
         value={country || ''}
         required
       />
       {err.country && <div style={{color:'red'}}>{err.country}</div>}

       <input
         type="text"
         placeholder="Postal Code"
         onChange={(e)=>handleVenueChange(e, 'location','address','postal_code')}
         value={postal_code || ''}
       />
       {err.postal_code && <div style={{color:'red'}}>{err.postal_code}</div>}

       <input
         type="text"
         placeholder="Phone"
         onChange={(e)=>handleVenueChange(e, 'location','phone')}
         value={phone || ''}
       />
       <input
         type="text"
         placeholder="Website"
         onChange={(e)=>handleVenueChange(e, 'location','website')}
         value={website || ''}
       />
    </div>
  );
}

export default VenueInfo;
