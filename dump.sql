create database dindin;

create table usuarios (
	id serial primary key,
	nome text not null,
	email varchar(40) not null unique,
	senha text not null
);

create table categorias (
	id serial primary key,
  	descricao text not null
);

create table transacoes (
	id serial primary key,
	descricao text not null,
	valor numeric check(valor > 0) not null,
	data date default now(),
	categoria_id integer not null,
	usuario_id integer not null,
	tipo text not null,
  	FOREIGN KEY (categoria_id) references categorias(id),
  	FOREIGN KEY (usuario_id ) references usuarios(id)
);

insert into categorias (descricao)
values
('Alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras receitas'),
('Outras despesas');