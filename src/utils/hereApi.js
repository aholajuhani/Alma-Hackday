const APP_ID = "nqsndEx9KQMgagcjb515";
const APP_CODE = "iKhgoYAdRBT5mODgMAyQ4g";

function handleError(error) {
  console.warn(error);
  return null;
}

// async function fetchJSON(uri) {
//   const init = {
//     method: "GET",
//     mode: "cors",
//     cache: "default"
//   };

//   let encodedUri = window.encodeURI(uri);

//   try {
//     let response = await fetch(encodedUri, init);
//     console.log("Response:", response);
//     let json = response.json();
//     console.log("JSON:", json);
//     return json;
//   } catch (error) {
//     handleError(error);
//   }
// }

async function fetchSuggestion(input) {
  let uri = window.encodeURI(
    `https://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json?app_id=${APP_ID}&app_code=${APP_CODE}&query=${input}`
  );
  console.log("Suggestion uri:", uri);
  try {
    let response = await fetch(uri);
    let json = response.json();
    return json;
  } catch (error) {
    handleError(error);
  }
}

async function fetchCoordinates(input) {
  let address = await fetchSuggestion(input);
  console.log("Addresss suggestions:", address);
  try {
    address = address.suggestions[0].label;
  } catch (error) {
    handleError(error);
  }

  let uri = window.encodeURI(
    `https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=${APP_ID}&app_code=${APP_CODE}&searchtext=${address}`
  );
  try {
    let response = await fetch(uri);
    let json = response.json();
    return json;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchRoute(dep, dest) {
  let departure = await fetchCoordinates(dep);
  let destination = await fetchCoordinates(dest);
  console.log("Dep response:", departure, "Dest response:", destination);
  try {
    departure = departure.Response.View[0].Result[0].Location.DisplayPosition;
    destination =
      destination.Response.View[0].Result[0].Location.DisplayPosition;
  } catch (error) {
    handleError(error);
  }

  const uri = window.encodeURI(
    `https://route.cit.api.here.com/routing/7.2/calculateroute.json?app_id=${APP_ID}&app_code=${APP_CODE}&waypoint0=geo!${departure.Latitude},${departure.Longitude}&waypoint1=geo!${destination.Latitude},${destination.Longitude}&departure=now&mode=fastest;publicTransport&combineChange=true`
  );
  try {
    let response = await fetch(uri);
    let json = response.json();
    return json;
  } catch (error) {
    handleError(error);
  }
}
