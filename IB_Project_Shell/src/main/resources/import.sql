INSERT INTO USERS (id, email, password, certificate, active, last_password_reset_date) VALUES (1,'nina','$2a$04$NmL03K72D1B1UqoqF.yC5.kdp9xIf8xqdWVuQ7QL8MMYLylqJL8YG', 'path',TRUE, '2019-07-01 21:56:56.508-07');
INSERT INTO USERS (id, email, password, certificate, active, last_password_reset_date) VALUES (2,'ana','$2a$04$WHnRdDI8vefqTpSnqr0wiulOb96/TgrbGTIMiXWrVEqZWrI3m09nm', 'path',TRUE, '2019-03-01 21:56:56.508-07');




INSERT INTO AUTHORITY (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO AUTHORITY (id, name) VALUES (2, 'ROLE_ADMIN');

INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (1, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 1);
INSERT INTO USER_AUTHORITY (user_id, authority_id) VALUES (2, 2);




