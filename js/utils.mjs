// retrieve data from localstorage
export function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}

export async function loadHeaderFooter() {
	const headerTemplate = await loadTemplate("../partials/header.html");
	const headerElement = document.querySelector("#main-header");

	const footerTemplate = await loadTemplate("../partials/footer.html");
	const footerElement = document.querySelector("#main-footer");

	renderWithTemplate(headerTemplate, headerElement);
	renderWithTemplate(footerTemplate, footerElement);
}

export function capFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lastUpdate() {
	currentyear.innerHTML = new Date().getFullYear();
	lastModified.innerHTML = `Last Modification: ${document.lastModified}`;
}