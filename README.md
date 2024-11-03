# cajaRegistradora

### JS, ES6, Node.js, Frontend, Backend, Express, React, MERN, testing, DevOps

## EJERCICIO: Biblioteca :octocat: :scroll: :bangbang: :books: :book:

Utilizando la [API del NYTimes](https://developer.nytimes.com/apis) vamos a crear una biblioteca de los libros más vendidos por temática

![NYT_logo](../../assets/js_avanzado/biblioteca/nyt.svg)

Ofreceremos al cliente un dashboard con la listas disponibles en *[Books API](https://developer.nytimes.com/docs/books-product/1/overview)*.


**Requisitos para este proyecto**
- Manipulación dinámica del **DOM**
- Manejo de **ES6**
- **Asincronía**
- Sin frameworks ni librerias externas en la medida de lo posible
- Gestión del proyecto en **Github** desde el principio. Uso de ramas.
- Código limpio, **buenas prácticas**
- Diseño responsive, mobile first, semántica HTML5

**Opcional**
- Otras APIs, Local Storage, Firebase, PWA...
- En general, cualquier extra será bien recibido para que investiguéis por vuestra cuenta, siempre y cuando tenga sentido

**Especificaciones(Fase I):**
- Incluir una animación mientras esperamos la carga del contenido.
- Al cargar la web deben de aparecer todas las listas con los siguientes datos:
	- Nombre completo de la lista
	- Fecha del libro más antiguo en la lista
	- Fecha del último libro incorporado
	- Frecuencia de actualización
	- Link para poder cargar la lista
- Al pinchar en el link de una lista especifica, el DOM debe cambiar e incluir los siguientes datos:
- Un botón para *volver atras* y recargar la disposición anterior
- Los libros deben estar organizados según el orden de la lista oficial
- Incluir 
    - Carátula del libro
    - Cantidad de semanas que lleva en la lista
    - Descripción
    - Titulo y la posición que ocupa en la lista ( #1 titulo.... #2 titulo....)
    - Link para poder comprar el libro en amazon (debe abrirse en otra pestaña)

**Especificaciones (Fase II - Firebase):**

- Autenticación con Firebase auth: Los usuarios que se autentiquen podrán guardar sus favoritos
- Añadir un botón de favoritos en cada libro
- Los favoritos se guardarán en en Firebase Firestore
- Necesitarás una vista extra en el front para que cada usuario pueda ver sus favoritos

**Extra (Fase III - Firebase cloud Storage):**

- Los usuarios que se registren podrán subir su foto al sistema
- La foto se guardará en Firebase Cloud Storage y la URL de la foto en el documento del usuario en Firebase Firestore


**Ejemplos de vistas:**
- Dashboard:

![NYTimes.png](../../assets/js_avanzado/biblioteca/best_sellers1.png)

- Dentro de una lista:

![NYTimes.png](../../assets/js_avanzado/biblioteca/best_sellers2.png)

**Trucos:**
- Mira en detalle la [documentación oficial](http://developer.nytimes.com/docs)
- Usa el *[Books API](https://developer.nytimes.com/docs/books-product/1/overview)*


### A por ello!!!

![Logo](../../assets/js_avanzado/biblioteca/catbooks_meme.jpg)
