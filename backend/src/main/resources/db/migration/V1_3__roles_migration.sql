CREATE TYPE role_names AS ENUM ('ROLE_USER', 'ROLE_ADMIN')

CREATE TABLE IF NOT EXISTS roles (
    id UUID,
    name role_names
    PRIMARY KEY (id)
);