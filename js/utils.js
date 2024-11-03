
// Funciones de manejo del DOM

// Funcion corta para llamar a 'document.getElementById'
function getById(obj) {
	return document.getElementById(obj);
}

// Funcion corta para llamar a 'document.querySelector'
function qSelector(obj) {
	return document.querySelector(obj);
}

// Funcion corta para llamar a 'document.querySelectorAll'
function qSelectorAll(obj) {
	return document.querySelectorAll(obj);
}

// Funcion corta para llamar a 'document.getElementsByTagName'
function getByTagName(obj) {
	return document.getElementsByTagName(obj);
}

/* ************************************* */

// Funcion para mostrar u ocultar objetos HTML por ID
function MO_objID(obj, modo) {

	let objHTML = getById(obj);

	if (objHTML) {
		objHTML.style.display = modo;
	}
}