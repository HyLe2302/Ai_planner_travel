import axios from 'axios';

export const GetPhotoRef = async (placeName: String) => {
  const resp = await fetch(
    "https://maps.googleapis.com/maps/api/place/textsearch/json" +
      "?query=" +
      placeName +
      "&key=" +
      process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
  );

  const result = await resp.json();
  // console.log(result);
  return result;
};

export const GetGeoCoordinates = async (placeName: String) => {
  const resp = 
    "https://maps.googleapis.com/maps/api/geocode/json" +
    "?address=" +
    placeName +
    "&key=" +
    process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY
  ;

  const response = await axios.get(resp);
  if (response.data.status === 'OK') {
    const { lat, lng } = response.data.results[0].geometry.location;
    return({ lat, lng });
  }
}