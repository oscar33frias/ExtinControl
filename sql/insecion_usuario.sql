select * from Usuario

INSERT INTO Usuario (nombre, password, email, token, confirmado)
OUTPUT INSERTED.*
VALUES
  ('Juan Pérez', '123456', 'juanperez@example.com', '', 1),
  ('María García', '123456', 'mariagarcia@example.com', '', 1),
  ('Luis Rodríguez', '123456', 'luisrodriguez@example.com', '', 1),
  ('Ana Martínez', '123456', 'anamartinez@example.com', '', 1),
  ('Carlos Sánchez', '123456', 'carlossanchez@example.com', '', 1),
  ('Sofía López', '123456', 'sofialopez@example.com', '', 1),
  ('Pedro Ramírez', '123456', 'pedroramirez@example.com', '', 1),
  ('Laura González', '123456', 'lauragonzalez@example.com', '', 1),
  ('Miguel Torres', '123456', 'migueltorres@example.com', '', 1),
  ('Carmen Ruiz', '123456', 'carmenruiz@example.com', '', 1),
  ('Javier Vargas', '123456', 'javiervargas@example.com', '', 1),
  ('Isabel Díaz', '123456', 'isabeldiaz@example.com', '', 1),
  ('Diego Herrera', '123456', 'diegoherrera@example.com', '', 1),
  ('Patricia Castro', '123456', 'patriciacastro@example.com', '', 1),
  ('Manuel Jiménez', '123456', 'manueljimenez@example.com', '', 1),
  ('Rosa Flores', '123456', 'rosaflores@example.com', '', 1),
  ('Alejandro Ortega', '123456', 'alejandroortega@example.com', '', 1),
  ('Lucía Paredes', '123456', 'luciaparedes@example.com', '', 1),
  ('Andrés Mendoza', '123456', 'andrés@example.com', '', 1),
  ('Elena Navarro', '123456', 'elenanavarro@example.com', '', 1);
