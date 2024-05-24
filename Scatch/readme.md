npm i express ejs mongoose nodemon

npm i jsonwebtoken cookie-parser bcrypt

npm i multer

folder-names:
-------------

views -> ejs pages

routes -> routes

public -> to store static files such as images

models -> to create models (userModel, productModel) for mongoose database

utils -> minor adjustments

gkeep => vs code extension

npm i debug => for debugging instead of console

userModel
---------

full name - string
email - string
password - string
cart - array
isadmin - boolean
contact - number
picture - string

productModel:
-------------

image
name
price
discount
bgcolor
textcolor
panelcolor