
let arr_monedas = [
    { moneda: 2, cantidad: 5 },
    { moneda: 1, cantidad: 4 },
    { moneda: 0.50, cantidad: 0 },
    { moneda: 0.20, cantidad: 0 },
    { moneda: 0.10, cantidad: 1 },
    { moneda: 0.05, cantidad: 2 },
    { moneda: 0.02, cantidad: 3 },
    { moneda: 0.01, cantidad: 1 }
];

// Definimos los billetes y monedas en arrays de objetos
let arr_billetes = [
    { billete: 500, cantidad: 0 },
    { billete: 200, cantidad: 0 },
    { billete: 100, cantidad: 0 },
    { billete: 50, cantidad: 1 },
    { billete: 20, cantidad: 4 },
    { billete: 10, cantidad: 8 },
    { billete: 5, cantidad: 2 }
];

let arr_monedasCopia;
let arr_billetesCopia;

// variable que obtiene el total dinero de la caja
let dineroCaja = getCantidadActualCaja().totBilletes + getCantidadActualCaja().totMonedas;

/*
Tengo 5 euros en caja
El cliente me da un billete de 50 euros
Ahora tengo un billete de 5 euros
y un billete de 50 euros

Tengo que cobrar 10 euros
Le tengo que devolver 40 euros
No puedo porque no tengo cambio de billetes y monedas
*/
function getCantidadActualCaja(){
    let totBilletes = 0;
    let totMonedas = 0;

    totMonedas = arr_monedas.reduce((acum, item) => {
        return acum + (item.moneda * item.cantidad);
    }, 0)

    totBilletes = arr_billetes.reduce((acum, item) => {
        return acum + (item.billete * item.cantidad);
    }, 0);

    return {totMonedas, totBilletes}
}

// funcion principal realizarCompra()
// que ejecuta todos los pasos de la compra
function realizarCompra(){

    console.clear(); // limpiamos consola

    try {
        /*
        PASO 1
        obtenemos cuanto dinero total nos ha pagado el cliente
        */
        let dineroCliente = recibirDineroCliente();

        /* 
        PASO 2
        Obtenemos el total de dinero que el vendedor tiene que devolver al cliente.
        Si el importe es menor que el precio del artículo
        entonces le diremos al cliente que no tiene suficiente dinero.
        Si es correcto, obtenemos el importe que tenemos que devolver al cliente
        */
        let precioArticulo = getById("precio").value;
        let cambio = calcularCambio(dineroCliente, precioArticulo);
        
        /* 
        PASO 3
        Actualizamos una caja Virtual Copia con el dinero que nos 
        ha dado el Cliente en billetes y en monedas
        */
        llenarCajaCopia(); // modificamos las variables en una copia

        /* 
        PASO 4
        Calculos infernales.
        Ahora tenemos que saber si con el dinero en Caja actual
        podemos devolverle al Cliente la vuelta con los billetes
        y monedas que tenemos en la Caja Copia.
        Después de hacer el calculo, devolveremos el cambio
        o le diremos al Cliente que no podemos darle cambio
        */
        let transacion = devolverDineroCliente(cambio);

        // PASO 5
        // Mostramos los resultados
        mostrarInfo(transacion); // informamos de la transacion actual
    } 

    // tratamiento de errores
    catch (error) {
        if (error.warning) {
            // Control PASO 1
            if (error.warning.includes("ERROR_PAGO")) {
                console.error("Error en el pago:", error.message);
                console.trace();
                mostrarModal(error.message);
            }

            // Control PASO 2
            else if (error.warning.includes("ERROR_CAMBIO")) {
                console.error("Error en el cálculo del cambio:", error.message);
                console.trace();
                mostrarModal(error.message);
            } 

            // Control PASO 3
            // no es necesario hacer ningún control importante

            // Control PASO 4
            else if (error.warning.includes("ERROR_VUELTAS")) {
                console.error("Error en la Caja:", error.message);
                console.trace();
                mostrarModal(error.message);
            }

            // Control por defecto
            else {
                console.error("Error desconocido:", error.message);
                console.trace();
                mostrarModal(error.message);
            }
        } else {
            // Caso de errores inesperados sin 'warning'
            console.error("Excepción inesperada:", error);
            console.trace();
            mostrarModal("Ha ocurrido un error inesperado." + error);
        }
    }
}

// PASO 1
// función para calcular el dinero pagado por el cliente
function recibirDineroCliente() {
    let total = 0;

    let selectorClienteInputs = qSelectorAll(".dineroCliente .linea > input");
    selectorClienteInputs.forEach(item => {
        let valor = parseFloat(item.value);
        let calculo = valor * parseFloat(item.id.split('_')[1]);
        total += calculo;
    });

    // si el cliente no ha dado dinero
    if (total <= 0) {
        throw { 
            warning: "ERROR_PAGO", 
            message: "Lo sentimos.\nNo ha proporcionado dinero"
        }; 
    } else {
        // retornamos el dinero con el que va a pagar el cliente
        return total;
    }
}

// PASO 2
// función para calcular el cambio
function calcularCambio(pagado, precio) {

    // si el cliente nos entrega menos dinero del valor que tiene la camisa
    if (pagado < precio) {
        //throw new Error("ERROR_CAMBIO: Lo sentimos. Falta dinero para comprar la camisa");
        throw { 
            warning: "ERROR_CAMBIO", 
            message: "Lo sentimos.\nFalta dinero para comprar el artículo"
        }; 
    } else{
        // devuelve el cambio a dos cifras
        let cambio = (pagado - precio).toFixed(2); 
        return cambio;
    }
}

// PASO 3
// realizamos una copia superficial de monedas y billetes
// en las variables 'arr_monedasCopia' y 'arr_billetesCopia',
// simulando llenar la Caja con el dinero entregado por el Cliente
function llenarCajaCopia(){

    // realizamos la copia de monedas y billetes
    arr_monedasCopia = arr_monedas.map(obj => ({ ...obj }));
    arr_billetesCopia = arr_billetes.map(obj => ({ ...obj }));

    // actualizamos la variable 'arr_monedasCopia' de la Caja
    // con las monedas entregadas por el Cliente
    arr_monedasCopia.forEach((item) => {
        let objMonedaCliente = getById(`cliente_${item.moneda}`);
        item.cantidad += parseInt(objMonedaCliente.value); 
    });

    // actualizamos la variable 'arr_billetesCopia' de la Caja
    // con los billetes entregados por el Cliente
    arr_billetesCopia.forEach((item) => {
        let objBilleteCliente = getById(`cliente_${item.billete}`);
        item.cantidad += parseInt(objBilleteCliente.value); 
    });

    // mostramos el estado actualizado de las variables copia de monedas y billetes
    console.log("Estado actualizado de la caja copia:", { arr_monedasCopia, arr_billetesCopia });
}

// PASO 4
// realizamos los calculos de monedas y billetes de la caja 
// para devolverselos al Cliente
function devolverDineroCliente(cantidad){

    // Calculamos un ejemplo con monedas de 2 euros
    /* let arr_moneda = arr_monedasCopia[0];
    let valorMoneda = arr_moneda.moneda; // Valor de la moneda
    let monedaCantidad = arr_moneda.cantidad; // Cantidad de monedas disponibles

    while (cantidad >= valorMoneda) {
        if(monedaCantidad > 0){
            cantidad -= valorMoneda;
            arr_moneda.cantidad -= 1;
             monedaCantidad--;
        }
    }
    alert("Cantidad por devolver: " + cantidad + 
        ". Monedas de " + valorMoneda + " euros restantes: " + 
        arr_moneda.cantidad);

    arr_moneda = arr_monedasCopia[1];
    valorMoneda = arr_moneda.moneda; // Valor de la moneda
    monedaCantidad = arr_moneda.cantidad; // Cantidad de monedas disponibles

    while (cantidad >= valorMoneda) {
        if(monedaCantidad > 0){
            cantidad -= valorMoneda;
            arr_moneda.cantidad -= 1;
             monedaCantidad--;
        }
    }
    alert("Cantidad por devolver: " + cantidad + 
        ". Monedas de " + valorMoneda + " euros restantes: " + 
        arr_moneda.cantidad);

    arr_moneda = arr_monedasCopia[2];
    valorMoneda = arr_moneda.moneda; // Valor de la moneda
    monedaCantidad = arr_moneda.cantidad; // Cantidad de monedas disponibles
    */

    let txtResultado = "";

    try {
        let txt = "";

        // recorremos cada elemento de arr_billetesCopia 
        // mientras la cantidad a devolver sea mayor de 0
        for (let i = 0; i < arr_billetesCopia.length && cantidad > 0; i++) {
            let cont = 0;
            let arr_billete = arr_billetesCopia[i];
            let valorBillete = arr_billete.billete; // valor del billete actual
            let billeteCantidad = arr_billete.cantidad; // cantidad del billete actual

            // mientras la cantidad sea mayor o igual al valor del billete actual
            // y tengamos suficientes billetes en Caja de ese valor actual
            while (cantidad >= valorBillete && billeteCantidad > 0) {

                cont++; // cuento las veces que se usa cada billete actual

                cantidad -= valorBillete; // restamos cantidad con el valor actual del billete
                arr_billete.cantidad -= 1; // restamos la cantidad de billetes actuales en el array
                billeteCantidad--; // restamos el contador para el control del bucle
            }
            txt += "Billetes de " + valorBillete + " euros usados: " + cont + "\n" +
            "TOTAL por devolver al Cliente: " + parseFloat(cantidad).toFixed(2) + " euros.\n\n" 
            
            txtResultado += txt;
            console.log(txt);

            txt = "";
            cont = 0;
        }

        txt = "";

        // recorremos cada elemento de arr_monedasCopia 
        // mientras la cantidad a devolver sea mayor de 0
        for (let i = 0; i < arr_monedasCopia.length && cantidad > 0; i++) {
            let cont = 0;
            let arr_moneda = arr_monedasCopia[i];
            let valorMoneda = arr_moneda.moneda; // valor de la moneda actual
            let monedaCantidad = arr_moneda.cantidad; // cantidad de la moneda actual

            // mientras la cantidad sea mayor o igual al valor de la moneda actual
            // y tengamos suficientes monedas en caja de ese valor actual
            while (cantidad >= valorMoneda && monedaCantidad > 0) {

                cont++; // cuento las veces que se usa cada moneda actual

                cantidad -= valorMoneda; // restamos cantidad con el valor actual de la moneda
                arr_moneda.cantidad -= 1; // restamos la cantidad de monedas actuales en el array
                monedaCantidad--; // restamos el contador para el control del bucle
            }
            txt += "Monedas de " + valorMoneda + " euros usadas: " + cont + "\n" +
            "TOTAL por devolver al cliente: " + parseFloat(cantidad).toFixed(2) + " euros.\n\n" 
            
            txtResultado += txt;
            console.log(txt);

            txt = "";
            cont = 0;
        }

        let resultado = parseFloat(cantidad).toFixed(2);
        if(resultado > 0){
            // Como la operacion no ha podido efectuarse
            // volvemos a dejar las variables copia a vacio
            arr_monedasCopia = [];
            arr_billetesCopia = [];
            mostrarModal(`
                No tenemos importes exactos para poder devolver el dinero al Cliente.\n 
                Faltan por devolver ${resultado} euros
            `);
        }
        else if(resultado == 0){
            // copiamos las variablesCopia a las variablesOriginales
            arr_monedas = arr_monedasCopia.map(obj => ({ ...obj }));
            arr_billetes = arr_billetesCopia.map(obj => ({ ...obj }));

            llenarCaja_DOM(); // mostramos la Caja actualizada
            mostrarModal("Compra realizada con éxito!\nDevolución exacta realizada");
        }
        else if(resultado < 0){ // raro que entre aquí
            arr_monedasCopia = [];
            arr_billetesCopia = [];
            mostrarModal("El Cliente le debe dinero a la Caja");
        }
        return txtResultado;
    } catch (error) {
        console.error("Error en la Caja:", error.message);

        throw { 
            warning: "ERROR_VUELTAS", 
            message: "Lo sentimos. Se ha producido un error en la Caja"
        }; 
    }
}

/* ************************************** */
//Funciones DOM

// llenamos los valores de la caja en el DOM
// con los valores de 'arr_billetes' y 'arr_monedas'
function llenarCaja_DOM(){
    // rellenamos las monedas
    arr_monedas.forEach((item) => {
        let objMonedaCaja = getById(`caja_${item.moneda}`);
        objMonedaCaja.value = (item.cantidad * 1);
    });

    // rellenamos los billetes
    arr_billetes.forEach((item) => {
        let objBilleteCaja = getById(`caja_${item.billete}`); 
        objBilleteCaja.value = (item.cantidad * 1);
    });
}

function calcularTotal(obj){
    let resultado = (obj.value * obj.id.split('_')[1]).toFixed(2);
    getById(obj.id + "_total").innerHTML = resultado + " €";

    mostrarTotalDineroCliente_DOM();
}

function mostrarTotalDineroCliente_DOM() {

    let total = 0;

    // seleccionamos todos los spans con clase 'totales' dentro de la clase 'span'
    let selectorSPans = qSelectorAll("div.dineroCliente span.totales");

    // iteramos sobre todos los elementos span seleccionados
    for (let i = 0; i < selectorSPans.length; i++) {
        let valor = parseFloat(selectorSPans[i].innerText) || 0; // Si el valor es NaN, lo consideramos como 0
        total += valor;
    }
    // mostramos el total en el span con id 'totalCliente'
    getById("totalCliente").innerHTML = total.toFixed(2) + " €";
}

// función para mostrar los datos de la compra realizada
function mostrarInfo(txt){
    let infoMensaje = getById("infoMensaje");
    let dineroCliente = recibirDineroCliente();
    let precioArticulo = getById("precio").value;

    infoMensaje.innerHTML = "El Cliente ha pagado " + dineroCliente + " euros<br>";
    infoMensaje.innerHTML += "El Precio del artículo es " + precioArticulo + " euros<br>";
    infoMensaje.innerHTML += "La vuelta para el Cliente es de " + calcularCambio(dineroCliente, precioArticulo) + " euros<br><br>";

    infoMensaje.innerHTML += txt.replace(/\n/g, '<br>');
}

/* ************************************** */

// funcion para relacionar el evento onchange para cada input del Cliente
function initInputsCliente(){
    const inputsDineroCliente = document.querySelectorAll('.dineroCliente input[type="number"]');

    // Añadimos el event listener a cada input
    inputsDineroCliente.forEach(input => {
        input.addEventListener('change', function() {
            calcularTotal(this);
        });
    });
}

// evento onclick para el boton 'btn_comprar'
getById("btn_comprar").addEventListener("click", function() {
    realizarCompra();
});

// evento de inicio 'onload'
window.addEventListener("load", function() {
    // llenamos la caja DOM
    llenarCaja_DOM();

    // relacionamos el evento onchange a los input cliente
    initInputsCliente();

    // mostramos el dinero axctual del cliente
    mostrarTotalDineroCliente_DOM();
});