create table items
(
    id serial,
    name varchar(100) not null,
    description varchar(500) not null,
    quantity int not null,
    purchased bool default false not null
);
