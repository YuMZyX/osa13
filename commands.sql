CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Joni Koskinen', 'www.test.fi', 'Inserting from PSQL');

insert into blogs (url, title) values 
('https://techcrunch.com/2023/10/30/5-things-we-learned-so-far-about-the-google-antitrust-case/', 
'5 things we learned so far about the Google antitrust case');