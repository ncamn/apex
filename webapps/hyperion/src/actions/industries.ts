import esi from "../esi";

export function fetchFacilities() {
  return async () => {
    const response = await fetch(`${esi.url}/industry/facilities/?${esi.datasource}`);
    const json = await response.json();
    return console.log(json);
  };
}
