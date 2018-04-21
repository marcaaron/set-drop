const validate = (json) => {
  const filteredList = json.list.filter(item =>
    item.artist.name === '' ||
    item.genre === '' ||
    item.title.name === ''
  );
   console.log(filteredList);
   console.log(json.username === null)
   console.log(json.date === '')
   console.log(json.location.venue === '')
   console.log(json.location.address.address_line === '')
   console.log(json.location.address.city === '')
   console.log(json.location.address.state === '')
   console.log(json.location.address.country === '')
   console.log(json.location.address.postal_code === '')
   console.log(json.list.length === 0)
   console.log(filteredList.length !== 0);
  if(
    json.username !== null ||
    json.date !== '' ||
    json.location.venue !== '' ||
    json.location.address.address_line !== '' ||
    json.location.address.city !== '' ||
    json.location.address.state !== '' ||
    json.location.address.country !== '' ||
    json.location.address.postal_code !== '' ||
    json.list.length !== 0 ||
    filteredList.length === 0
  ){
    return true;
  }else{
    return false;
  }
};

export default validate;
