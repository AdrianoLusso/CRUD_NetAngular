# CRUD con Angular y .NET

Este repositorio implementa un gestor de stock de ropa. El front-end fue realizado con Angular 19 y el back-end con ASP.NET 9. Se utilizó una base de datos postgre inicializada en el servicio cloud Tembo.

El subproyecto de ASP.NET se encuentra en el directorio 'server'. El subproyecto de Angular se encuentra en directorio 'app'. Las librerías secundarias utilizada son (entre otras):

*  Angular Material para ciertos componentes personalizados.
* SweetAlert2 para un pop-up personalizado.

Por cuestiones de seguridad, no se guardan las credenciales para acceder a la base de datos en la aplicación Angular. Para ingresar credenciales
de tu propia base de datos, puedes ir a app/src/app/environments/environment.development.ts

