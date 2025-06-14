// retrieve data from localstorage
export function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

// capitalize the first letter of a string
export function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// gets the current year and the time of the last update
export function lastUpdate() {
	currentyear.innerHTML = new Date().getFullYear();
	lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
}