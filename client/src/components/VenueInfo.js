import React, { Component } from 'react';
class VenueInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      location: {
        venue: '',
        address: {
          address_line: '',
          city: '',
          state: '',
          country: '',
          postal_code: ''
        },
        coords: {
          lng: '',
          lat: ''
        }
      }
    }
  }

  handleChange = (e, prop, ...args) => {
    const value = e.target.value;
    const location = {...this.state.location};
    if(args.length===0){
      location[prop] = value;
    }else{
      const argument = args[0];
      location[prop][argument] = value;
    }
    this.setState({location})
  }

  render() {
    return (
          <div className="venue-info">
            <h2>Venue Information</h2>
            <input
              type="text"
              placeholder="Venue Name"
              onChange={(e)=>this.handleChange(e, 'venue')}
            />
            <input
              type="text"
              placeholder="Street Address"
              autoComplete='address-line1'
              onChange={(e)=>this.handleChange(e, 'address','address_line')}
            />
            <input
              type="text"
              autoComplete='address-level2'
              placeholder="City"
              onChange={(e)=>this.handleChange(e, 'address','city')}
            />
             <input
               type="text"
               autoComplete='address-level1'
               placeholder="State"
               onChange={(e)=>this.handleChange(e, 'address','state')}
             />
             <input
               type="text"
               autoComplete='country-name'
               placeholder="Country"
               onChange={(e)=>this.handleChange(e, 'address','country')}
             />
             <input
               type="text"
               autoComplete='postal-code'
               placeholder="Postal Code"
               onChange={(e)=>this.handleChange(e, 'address','postal_code')}
             />
          </div>
    );
  }
}

export default VenueInfo;
