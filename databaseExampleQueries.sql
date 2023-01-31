-- Create a table for storing the events
CREATE TABLE events (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY, -- unique identifier for the event
  season integer NOT NULL, -- the season of the event
  event_status_id integer REFERENCES event_status (id) ,-- the status of the event
  time_venue_utc time, -- the time of the event
  date_venue date NOT NULL, -- the date of the event
  stadium_id integer REFERENCES stadiums (id), -- the stadium of the event
  home_goals integer NOT NULL, -- the goals made by home team in the event
  away_goals integer NOT NULL,  -- the goals made by home team in the event
  winner_team varchar(100), -- the winner team of the event
  message varchar(200),  -- the message made by the event
  stage_id integer REFERENCES stages (id), -- the stage id of the event from the joint table
  group_name VARCHAR(100), -- the group of the event
  origin_competition_id integer REFERENCES origin_competition (id)  -- the origin competion id of the event
);
-- Create the event status table
CREATE TABLE event_status (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(200) NOT NULL
);

-- Create the stadiums table
CREATE TABLE stadiums (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   stadium_name VARCHAR(200)
);
-- Create the origin competition table
CREATE TABLE origin_competition (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    origin_competition_name VARCHAR(200) NOT NULL
);

-- Create the teams events table
CREATE TABLE teams_events (
id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
team_id  integer REFERENCES teams (id),
team_type varchar(50) NOT NULL,
events_id integer REFERENCES events (id),
user_id integer REFERENCES users (id)
);


--  Create the teams table
CREATE TABLE teams (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(200),
    official_name VARCHAR(200),
    slug VARCHAR(200),
    abbreviation VARCHAR(200),
    team_country_code VARCHAR(100),
    stage_position VARCHAR(100)
);

-- Create the score by period table
CREATE TABLE score_by_period (
 id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
 periods_id  integer REFERENCES periods (id),
 home integer,
 away integer,
 events_id integer REFERENCES events (id)
);

-- Create the periods table
CREATE TABLE periods (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   periods_name VARCHAR(200)
);

-- Create the card_types table
CREATE TABLE card_types (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   card_name varchar(100)
);

-- Create the cards table
  CREATE TABLE cards (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    card_type_id integer,
    scorer VARCHAR(200),
    time timestamp,
    events_id integer
);

-- Create the stages table
CREATE TABLE stages (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    stage_name VARCHAR(100),
    ordering VARCHAR(100)
);
-- Create the sport status table
CREATE TABLE sports (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    sport_name VARCHAR(200) NOT NULL
);

-- Create the user role table
CREATE TABLE roles (
   id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(100) NOT NULL
);

-- Create the users table
CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username varchar(70) NOT NULL UNIQUE,
    password_hash varchar(70) NOT NULL UNIQUE,
    role_id integer REFERENCES roles (id) ON DELETE CASCADE
);

-- Create the session table
 CREATE TABLE sessions (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      token varchar(110) NOT NULL UNIQUE,
      expiry_timestamp timestamp NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
      user_id integer REFERENCES users (id) ON DELETE CASCADE

    );
