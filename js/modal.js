

const appModal = {
    txtModal: getById('txtModal'),
    closeModal: getById('closeModal'),
    boxModal: getById('boxModal')
}

// Función para mostrar el modal
function mostrarModal(texto) {
    // Reemplazamos las nuevas líneas (\n) por etiquetas <br>
    let textoFinal = texto.replace(/\n/g, '<br>');

    // Usamos innerHTML para permitir el uso de etiquetas HTML
    appModal.txtModal.innerHTML = textoFinal;
    appModal.boxModal.style.display = 'flex';
};

// Función para ocultar el modal
appModal.closeModal.addEventListener('click', () => {
    appModal.boxModal.style.display = 'none';
});

appModal.init = function(){
    appModal.boxModal.style.display = 'none';
}

appModal.init();
