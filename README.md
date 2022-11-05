# OnlineShopNodeJS

Proof of concept Node JS app based on MVC pattern.

# Used languages and tech: 
Node JS, Express, Express Session, MySql + Sequilize, MongoDB + Mongoose, 
Ejs for templating, Multer to handle file upload, TypeScript.

# User Stories:

- login and signup, send email on successful signup. 
- Reset password functionality based on link via email + token concept.
- search products, see product details and add to cart functionality.
- user can upload images with multipart form and multer
- login as admin role, manage products, add and edit existing products. 
- Authentication is based on cookies + session concept.
- Data access module implemented with NoSql (Mongo) and Sql (MySql) databases.
- Data access module is hidden behind interfaces, so that user can switch between DB implementations.
- authrization based on roles, admin and user roles are implemented.
- switch between dark\white themes using css variables and theme cookie to preserve selected theme
- generate pdf invoice when an order is created
- allow user to download invoice file from orders page

WIP:

- connected stripe for payments
- used Docker to contanerize the app
- start the app with dockercompose
