const form = document.querySelector("form");
const mapContainer = document.querySelector("#map");

const API_KEY = "at_XnUeRVAWfYFkPRrBTCWwZ6WA0kqmI";

const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: "© OpenStreetMap",
}).addTo(map);

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const input = document.querySelector("input");
  const ipAddress = input.value;

  const ipInfo = await getGeolocation(ipAddress);

  renderInfo(ipInfo);

  renderMap(ipInfo.location.lat, ipInfo.location.lng);

  input.value = "";
}

async function getGeolocation(ipAddress) {
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ipAddress}`
  );

  const data = res.json();

  return data;
}

function renderInfo(data) {
  const ipContainer = document.querySelector(".ip-address");
  const stateContainer = document.querySelector(".state");
  const timezoneContainer = document.querySelector(".timezone");
  const ispContainer = document.querySelector(".isp");

  ipContainer.innerHTML = `${data.ip}`;
  stateContainer.innerHTML = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  timezoneContainer.innerHTML = `UTC ${data.location.timezone}`;
  ispContainer.innerHTML = `${data.isp}`;
}

function renderMap(lat, lng) {
  map.flyTo([lat, lng], 20);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  }).addTo(map);

  L.marker([lat, lng]).addTo(map);
}
