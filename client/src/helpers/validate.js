const validate = (json) => {

  const badListItems = json.list.map((item,index)=>{
    if(item.artist.name === '') return [index, 'artist'];
    if(item.title.name === '') return [index, 'title'];
    return undefined;
  }).filter(item=>item !== undefined);

   // console.log(json);
   // console.log(badListItems.length === 0);
   // console.log(json.username === null)
   // console.log(json.date === '')
   // console.log(json.location.venue === '')
   // console.log(json.location.address.street_number === '')
   // console.log(json.location.address.city === '')
   // console.log(json.location.address.state === '')
   // console.log(json.location.address.country === '')
   // console.log(json.location.address.postal_code === '')
   // console.log(json.list.length === 0)
   // console.log(badListItems);
  if(
    badListItems.length === 0 &&
    json.username !== null &&
    json.date !== '' &&
    json.location.venue !== '' &&
    // json.location.address.street_number !== '' &&
    // json.location.address.street !== '' &&
    json.location.address.city !== '' &&
    json.location.address.state !== '' &&
    json.location.address.country !== '' &&
    // json.location.address.postal_code !== '' &&
    // json.location.website !== '' &&
    // json.location.phone !== '' &&
    json.list.length !== 0
  ){
    console.log('form is valid');
    return undefined;
  }else{
    console.log('form is invalid');
    const err = {};

    if(badListItems.length !== 0){
      let listItem = {};
      for(let i=0; i<badListItems.length; i++){
        let fieldFormat = badListItems[i][1].split('');
        fieldFormat[0] = fieldFormat[0].toUpperCase();
        fieldFormat = fieldFormat.join('');
        const message =
        `${fieldFormat} field can not be left blank!`;
        listItem[`${badListItems[i][0]}`] = {field: badListItems[i][1], message};
      }
      err.listItem = listItem;
    }

    if(json.location.venue === ''){
      err.venue = `Venue field can not be left blank!`;
    }

    // if(json.location.address.street_number === ''){
    //   err.street_number = `Street number field can not be left blank!`;
    // }
    //
    // if(json.location.address.street === ''){
    //   err.street = `Street field can not be left blank!`;
    // }

    if(json.location.address.city === ''){
      err.city = `City field can not be left blank!`;
    }

    if(json.location.address.state === ''){
      err.state = `State field can not be left blank!`;
    }

    if(json.location.address.country === ''){
      err.country = `Country field can not be left blank!`;
    }
    // if(json.location.address.postal_code === ''){
    //   err.postal_code = `Postal Code field can not be left blank!`;
    // }
    console.log(err);
    return err;
  }
};

export default validate;
