/*----------*/
CREATE TABLE user_s (
    id integer primary key auto_increment,
    foto varchar(255) not null,
	name varchar(255) not null,
	surname varchar(255) not null,
    username varchar(16) not null unique,
	email varchar(255) not null unique,
    password varchar(255) not null
)engine = 'innoDB';

/*----------*/

CREATE TABLE pref (
    user varchar(255) not null,
    id_canzone integer primary key auto_increment,
	id_pref varchar(255) not null,
    track_img varchar(255) not null,
    track_title varchar(255) not null,
    track_author varchar(255) not null,
    track_link varchar(255) not null,
    foreign key(user) references user_s(username) on delete cascade on update cascade
)engine = 'innoDB';

CREATE TABLE play (
    user varchar(255) not null,
    id_canzone integer primary key auto_increment,
	id_play varchar(255)  not null,
    track_img varchar(255) not null,
    track_title varchar(255) not null,
    track_author varchar(255) not null,
    track_link varchar(255) not null,
    foreign key(user) references user_s(username) on delete cascade on update cascade
)engine = 'innoDB';

/*----------*/

CREATE TABLE posts (
    id integer primary key auto_increment,
    user integer not null,
    nlikes integer default 0,
    content varchar(255) not null,
    foreign key(user) references user_s(id) on delete cascade on update cascade
) Engine = 'InnoDB';

/*----------*/

CREATE TABLE likes (
    id_like INT PRIMARY KEY AUTO_INCREMENT,
    username varchar(255) not null,
    post_id int NOT NULL,

    foreign key(post_id) references posts(id) on delete cascade on update cascade,
    foreign key(username) references user_s(username) on delete cascade on update cascade
) engine = 'InnoDB';

/*----------*/

/*---TRIGGER LIKE---*/
DELIMITER //
CREATE TRIGGER likes_trigger
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
UPDATE posts 
SET nlikes = nlikes + 1
WHERE id = new.post_id;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER unlikes_trigger
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
UPDATE posts 
SET nlikes = nlikes - 1
WHERE id = old.post_id;
END //
DELIMITER ;
drop trigger names;
