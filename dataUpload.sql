INSERT INTO categories (id, name)
VALUES (1, 'accessory');

INSERT INTO categories (id, name)
VALUES (2, 'urban');

INSERT INTO categories (id, name)
VALUES (3, 'ride');


INSERT INTO colors (id, name, valueColor)
VALUES (1, 'beige', 'rgb(207, 185, 151)');

INSERT INTO colors (id, name, valueColor)
VALUES (2, 'waterGreen', 'rgb(84, 201, 130)');

INSERT INTO colors (id, name, valueColor)
VALUES (3, 'black', 'rgb(30, 30, 30)');

INSERT INTO colors (id, name, valueColor)
VALUES (4, 'pink', 'rgb(255, 192, 203)');


INSERT INTO users (id, email, password, image)
VALUES (1, 'jeff.bezos@roda.com.ar', '$2a$10$fuFtfuACzWEIssrHGuISRO97Tmj4ze/CL9dHTdLsdfaGVaJLwlvyi', 'avatar-1627177096321.jpg');

INSERT INTO users (id, email, password, image)
VALUES (2, 'warren.buffet@roda.com.ar', '$2a$10$waa5Ka6vGKWJR3Kw2DARm.m3mqiBrYvyCAiQmEjYTn8hPuib/mevy', 'avatar-1627177179720.jpg');

INSERT INTO users (id, email, password, image)
VALUES (3, 'steve.jobs@roda.com.ar', '$2a$10$yqBSgTAXUkNE/FfxEGy1jOthAC/w9hS1oM14UqXSjrI7x9QwTNQnG', 'avatar-1627177232947.jpg');

INSERT INTO users (id, email, password, image)
VALUES (4, 'gonzalo.kesy@gmail.com', '$2a$10$C1ZjifK6f7sf5SG4a3rtlum4zM/6iZDARO5raFz.G/Z/ofrJ.02ni', 'avatar-1627177397180.jpg');

INSERT INTO users (id, email, password, image)
VALUES (5, 'andreaeichenberger.ae@gmail.com', '$2a$10$suJ14zmRcMfXXEk7yjAQ2OK4T8gg8egtKJ2gGrgeekkuRzE9da2dK', 'avatar-1627177490780.jpg');

INSERT INTO users (id, email, password, image)
VALUES (6, 'vicente.macchione1@gmail.com', '$2a$10$.WYxwyQqUishb1VQi6hHs.NEu7CY.vm7gDj8vAW6IVPg.eqnv8ewy', 'avatar-1627177623662.jpg');


INSERT INTO products (id, name, description, price, quantity, category_id)
VALUES (1, 'Bicicleta 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 50000, DEFAULT, 3);

INSERT INTO products (id, name, description, price, quantity, category_id)
VALUES (2, 'Bicicleta 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 60000, DEFAULT, 2);

INSERT INTO products (id, name, description, price, quantity, category_id)
VALUES (3, 'Accesorio 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.', 500, 2, 1);


INSERT INTO images (id, filename)
VALUES (1, 'gallery-1625761759733.jpg');

INSERT INTO images (id, filename)
VALUES (2, 'gallery-1625761820052.jpg');

INSERT INTO images (id, filename)
VALUES (3, 'gallery-1625762699571.jpg');


INSERT INTO products_images (id, product_id, image_id)
VALUES (1, 1, 1);

INSERT INTO products_images (id, product_id, image_id)
VALUES (2, 2, 2);

INSERT INTO products_images (id, product_id, image_id)
VALUES (3, 3, 3);


INSERT INTO products_colors (id, product_id, color_id)
VALUES (1, 1, 4);

INSERT INTO products_colors (id, product_id, color_id)
VALUES (2, 2, 2);

INSERT INTO products_colors (id, product_id, color_id)
VALUES (3, 3, 3);


INSERT INTO shoppingCart (id, user_id, product_id, quantity, totalPrice, active, date)
VALUES (1, 6, 1, 1, 50000, 1, 2021-09-23);

INSERT INTO detailCart (id, shoppingCart_id, quantity, actualPrice)
VALUES (1, 1, 1, 50000);