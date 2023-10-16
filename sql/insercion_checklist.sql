-- Declarar una variable de tabla para almacenar el JSON
DECLARE @jsonData NVARCHAR(MAX);

-- Definir el JSON con los valores del checklist
SET @jsonData = '
{
  "boquilla": "Si",
  "codigo": "EXTN1",
  "condFisica": "Buena",
  "estado": false,
  "etiqueta": "Si",
  "extintorId": ,
  "fecha_checklist": "2023-10-15T03:12:06.343Z",
  "id": 1002,
  "instrucciones": "Si",
  "manguera": "Si",
  "manometro": "Si",
  "obstruido": "Si",
  "prioridad": "Baja",
  "sello": "Si",
  "senalamiento": "Si"
}';

-- Declarar una variable para contar las inserciones
DECLARE @i INT = 1;

-- Bucle para insertar 30 registros
WHILE @i <= 30
BEGIN
  INSERT INTO checkList (codigo, obstruido, instrucciones, senalamiento, manometro, sello, condFisica, manguera, boquilla, etiqueta, prioridad, extintorId, fecha_checklist, estado)
  SELECT
    JSON_VALUE(@jsonData, '$.codigo'),
    JSON_VALUE(@jsonData, '$.obstruido'),
    JSON_VALUE(@jsonData, '$.instrucciones'),
    JSON_VALUE(@jsonData, '$.senalamiento'),
    JSON_VALUE(@jsonData, '$.manometro'),
    JSON_VALUE(@jsonData, '$.sello'),
    JSON_VALUE(@jsonData, '$.condFisica'),
    JSON_VALUE(@jsonData, '$.manguera'),
    JSON_VALUE(@jsonData, '$.boquilla'),
    JSON_VALUE(@jsonData, '$.etiqueta'),
    JSON_VALUE(@jsonData, '$.prioridad'),
    JSON_VALUE(@jsonData, '$.extintorId'),
    JSON_VALUE(@jsonData, '$.fecha_checklist'),
    CAST(JSON_VALUE(@jsonData, '$.estado') AS BIT);
  
  SET @i = @i + 1;
END;

-- Verificar que se hayan insertado los registros
SELECT * FROM checkList WHERE fecha_checklist = '2023-10-15T03:12:06.343Z';
