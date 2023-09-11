use ControlSeg;
/*CREACION DE TABLAS*/
CREATE TABLE Extintores(
	noExtintor int primary key not null,
	marca varchar(50) not null,
	tipo varchar(50) not null,
	capacidad decimal(2,2) not null,
	fecha datetime,
	ubicacionId int not null
);

CREATE TABLE ubicaciones(
	idUbicacion int primary key not null,
	cordenadasX int not null,
	cordenadasy int not null,
	direccion varchar(50) not null,
	noExtintor int not null,
)

create table checklist(
	idCheckList int primary key identity(1,1) not null,
	noExtintor int not null,
	idUsuario int not null
	obstruido tinyint not null,
	instrucciones tinyint not null,
	senalamiento tinyint not null,
	manometro tinyint not null,
	sello tinyint not null,
	condFis tinyint not null,
	manguera tinyint not null,
	boquilla tinyint not null,
	etiqueta tinyint not null,
	fechaRevision datetime not null
)

create table fechaPruebas (
	idPrueba int primary key not null,
	ultimaPrueba datetime not null
	proximaPrueba datetime not null
	noExtintor int not null
)
create table fechaRecargas(
	idRecarga int primary key not null,
	ultimaRecarga datetime not null,
	primeraRecarga datetime not null,
	idExtintor int not null
)

create table usuario(
	noReloj int primary key not null,
	nombre varchar(30) not null,
	apellidos varchar(30) not null
	puesto varchar(30) not null,
	contra varchar(40) not null
)
