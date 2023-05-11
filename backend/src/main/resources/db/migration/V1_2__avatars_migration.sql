CREATE TYPE valid_rarities AS ENUM ('common', 'rare', 'epic', 'legendary');

CREATE TABLE IF NOT EXISTS avatars (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    rarity VALID_RARITIES NOT NULL,
    picture_name TEXT NOT NULL
);

with avatars_json (doc) as (
    values
        ('
        [
          {
            "id": 1,
            "name": "Bear1",
            "rarity": "rare",
            "picture_name": "Bear1-01.png"
          },
          {
            "id": 2,
            "name": "Bear2",
            "rarity": "common",
            "picture_name": "Bear2-01.png"
          },
          {
            "id": 3,
            "name": "Bunny1",
            "rarity": "common",
            "picture_name": "Bunny1-01.png"
          },
          {
            "id": 4,
            "name": "Cat1",
            "rarity": "common",
            "picture_name": "Cat1-01.png"
          },
          {
            "id": 5,
            "name": "Cat2",
            "rarity": "common",
            "picture_name": "Cat2-01.png"
          },
          {
            "id": 6,
            "name": "Dog1",
            "rarity": "rare",
            "picture_name": "Dog1-01.png"
          },
          {
            "id": 7,
            "name": "Dog2",
            "rarity": "common",
            "picture_name": "Dog2-01.png"
          },
          {
            "id": 8,
            "name": "Dog3",
            "rarity": "epic",
            "picture_name": "Dog3-01.png"
          },
          {
            "id": 9,
            "name": "Gorilla1",
            "rarity": "common",
            "picture_name": "Gorilla1-01.png"
          },
          {
            "id": 10,
            "name": "Koala1",
            "rarity": "common",
            "picture_name": "Koala1-01.png"
          },
          {
            "id": 11,
            "name": "Monkey1",
            "rarity": "epic",
            "picture_name": "Monkey1-01.png"
          },
          {
            "id": 12,
            "name": "Monkey2",
            "rarity": "common",
            "picture_name": "Monkey2-01.png"
          },
          {
            "id": 13,
            "name": "Panda1",
            "rarity": "legendary",
            "picture_name": "Panda1-01.png"
          },
          {
            "id": 14,
            "name": "Panda2",
            "rarity": "rare",
            "picture_name": "Panda2-01.png"
          },
          {
            "id": 15,
            "name": "Panda3",
            "rarity": "rare",
            "picture_name": "Panda3-01.png"
          },
          {
            "id": 16,
            "name": "Panda4",
            "rarity": "rare",
            "picture_name": "Panda4-01.png"
          },
          {
            "id": 17,
            "name": "Panda5",
            "rarity": "common",
            "picture_name": "Panda5-01.png"
          },
          {
            "id": 18,
            "name": "Panda6",
            "rarity": "epic",
            "picture_name": "Panda6-01.png"
          },
          {
            "id": 19,
            "name": "Penguin1",
            "rarity": "common",
            "picture_name": "Penguin1-01.png"
          },
          {
            "id": 20,
            "name": "Penguin2",
            "rarity": "rare",
            "picture_name": "Penguin2-01.png"
          },
          {
            "id": 21,
            "name": "Rhino1",
            "rarity": "common",
            "picture_name": "Rhino1-01.png"
          },
          {
            "id": 22,
            "name": "Sloth1",
            "rarity": "legendary",
            "picture_name": "Sloth1-01.png"
          },
          {
            "id": 23,
            "name": "Sloth2",
            "rarity": "epic",
            "picture_name": "Sloth2-01.png"
          },
          {
            "id": 24,
            "name": "Tiger1",
            "rarity": "legendary",
            "picture_name": "Tiger1-01.png"
          }
        ]
        '::json)
)
insert into avatars (id, name, rarity, picture_name)
select p.*
from avatars_json l
         cross join lateral json_populate_recordset(null::avatars, doc) as p
on conflict (id) do update
    set name = excluded.name,
        rarity = excluded.rarity,
        picture_name = excluded.picture_name;