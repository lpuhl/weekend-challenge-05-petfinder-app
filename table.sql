CREATE TABLE pets (
	id serial primary key,
	name varchar(100),
	image varchar(200),
	description varchar(100),
	petfinder_id varchar(10) NOT NULL
	);
