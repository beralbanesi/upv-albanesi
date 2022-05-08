# UPV ( Usalo Publicalo Vendelo)

 
E-commerce UPV es un sitio destinado a facilitar la venta de productos usados.

 
## Motivación del proyecto
  

UPV es el proyecto final realizado dentro del contexto de curso de React en la plataforma CoderHouse.
  
  
## Librerías externas utilizadas
  
En el proyecto se utiliza la librería Material UI (https://mui.com/)
 

## Barra de navegación

La barra de navegación de la aplicación se denomina NavBar y está implementada utilizando el componente AppBar (https://mui.com/material-ui/react-app-bar/) perteneciente a la librería MUI. La barra de navegación se carga dinámicamente a partir de las rutas almacenadas en la base de datos firebase. La aplicación permite agregar nuevas rutas desde la consola de administración. Las rutas que posee la aplicación por defecto son:

- **Home**: muestra la lista completa de productos.

- **Productos**: permite filtrar la lista de productos por una categoría.

- **Nosotros**: historia del emprendimiento.

- **FAQ**: preguntas frecuentes.

- **Contacto**: formulario de contacto.

  

La barra de navegación contiene diferentes componentes, los cuáles se detallan a continuación.

-  ### Search bar

La barra de búsqueda fue implementada mediante el componente InputBase que provee la librería MUI (https://mui.com/material-ui/api/input-base/). Utilizando esta barra de búsqueda es posible realizar búsquedas de productos. Si bien en un proyecto real no es recomendable implementar esta funcionalidad desde el front-end, se realizó de esta forma a modo de ejemplo.

En el caso de que el texto ingresado en el campo de búsqueda es exactamente el nombre de una categoría, entonces el resultado serán los productos de dicha categoría.

En el caso de que el texto ingresado en el campo de búsqueda no sea el nombre de una categoría, entonces el resultado serán los productos que contengan dicho texto en su descripción.

-  ### CartWidget

El componente CartWidget utiliza un icono perteneciente a la librería MUI ShoppingCart (https://mui.com/material-ui/material-icons/). El icono del carrito de compras solo se visualiza en la barra de navegación si contiene algún producto.

El CartWidget presenta los productos que fueron agregados al carrito. Es posible visualizar para cada producto su imagen y la cantidad de unidades seleccionadas. Además, es posible eliminar cada producto de forma independiente.

Finalmente, el CartWidget presenta la cantidad total de unidades seleccionadas, el monto total y permite iniciar la compra.

Cabe destacar que el contenido del carrito de compras no se pierde aunque se recargue la página, ya que está implementado mediante el uso de **LocalStorage**. El contenido del carrito de compras se vacía en el caso de que el usuario cierre su sesión.
  

-  ### Account (Log-in)

El componente Account permite iniciar sesión a un usuario.

En el caso de que no haya un usuario logueado aparecerá el boton *INGRESAR* para que el usuario pueda iniciar sesión.

Si existe un usuario logueado aparecera el icono AccountCircle de la librería MUI (https://mui.com/material-ui/material-icons/), que al ser presionado desplegará un breve menú en donde se visualiza el nombre del usuario, y se le permite ir a ver las órdenes de compra que posee y cerrar su sesión.

  

## Funcionalidad

  

-  ### Registrar un usuario

Mediante el botón **INGRESAR** de la barra de navegación se puede acceder al formulario de Log-in. Si aún no se encuentra registrado, entonces se debe clickear en el link **¿No estas registrado? [Regístrate acá]**. Para proceder con el proceso de registración, se debe completar los siguientes campos: nombre y apellido, email, teléfono y password.

  

-  ### Iniciar sesión

Mediante el botón **INGRESAR** de la barra de navegación se puede acceder al formulario de Log-in. Si ya se encuentra registrado, entonces se debe indicar el email y la password correspondiente.

  

-  ### Seleccionar los productos a comprar

Desde la pagina principal **HOME** es posible agregar al carrito los productos que se desea, pudiendo en cada caso elegir la cantidad de unidades. La cantidad de unidades seleccionada nunca podrá exceder el límite del stock del producto. Además, si un producto no tiene stock, aparece informado en color rojo y dicho producto no puede ser agregado al carrito.

En cualquier momento se puede visualizar el estado del carrito presionando sobre el icono del carrito que se encuentra en la barra de navegación.

Es posible ver los datos completos de un producto al presionar el botón*Ver Detalle*. Desde la pagina de detalle del producto también es posible agregarlo al carrito y proceder con la compra del mismo.

Si se desea ver los productos de una categoría en particular, es posible elegirla desde el menú *Productos*. También es posible buscar un producto por cualquier palabra clave desde la barra de búsqueda.

-  ### Realizar una compra

  

Una vez que se han seleccionado todos los productos deseados, se debe iniciar la compra. Para esto se debe presionar sobre el botón *Iniciar la compra* que se encuentra en el carrito de compras, Otra posibilidad es presionar dicho botón desde la página de detalle de un producto.

Antes de finalizar la compra es posible visualizar el detalle de la orden que se generará. Si todo es correcto se procede a presionar el botón *Completar compra*. Si el usuario estaba logueado, entonces se carga automáticamente la información de la orden que se generará y sólo es necesario presionar sobre el botón *Enviar orden*. Si le usuario desea realizar la compra sin iniciar sesión, entonces debe completar la orden de compra con su nombre y apellido, teléfono y email.

-  ### Visualizar órdenes de compra

Desde el menú de la cuenta del usuario es posible presionar sobre la opción *Mis ordenes* para ver el detalle de todas las ordenes realizadas por el usuario logueado.

  

## Consola de administración

  

Es posible acceder a la consola de administración a través de: http://localhost:3000/admin. Esta url no es pública, ya que la consola fue implementada con el fin de facilitar las pruebas en la aplicación.

  

Por un lado, la consola permite agregar nuevos productos, categorías y rutas. Los datos requeridos para el alta de un nuevo producto son: categoría, titulo, color, descripción, nombre de imagen, precio, tamaño, puntuación y stock. Para dar de alta una nueva categoría solo se necesita su nombre. Para agregar una nueva ruta se necesita un título y una url.

  

Por otro lado, la consola de administración permite ver los mensajes generados a través del formulario de contacto.

  
  

## Scripts

  

In the project directory, you can run:

  

  

### `npm start`

  

  

Runs the app in the development mode.\

  

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

  

  

The page will reload when you make changes.\

  

You may also see any lint errors in the console.

  

  

### `npm test`

  

  

Launches the test runner in the interactive watch mode.\

  

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

  

  

### `npm run build`

  

  

Builds the app for production to the `build` folder.\

  

It correctly bundles React in production mode and optimizes the build for the best performance.

  

  

The build is minified and the filenames include the hashes.\

  

Your app is ready to be deployed!

  

  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

  

  

### `npm run eject`

  

  

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

  

  

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

  

  

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

  

  

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

  

  

## Learn More

  

  

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

  

  

To learn React, check out the [React documentation](https://reactjs.org/).

  

  

### Code Splitting

  

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

  

  

### Analyzing the Bundle Size

  

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

  

  

### Making a Progressive Web App

  

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

  

  

### Advanced Configuration

  

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

  

  

### Deployment

  

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

  

  

### `npm run build` fails to minify

  

  

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)