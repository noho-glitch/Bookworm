USE bookworm_db;

ALTER TABLE books CHANGE COLUMN createdAt createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE books CHANGE COLUMN updatedAt updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE books MODIFY ISBN BIGINT;

INSERT INTO books (ISBN, title, authors, pageCount, userId) VALUES (40, "Bird Box", "Somebody", 300, 1);    