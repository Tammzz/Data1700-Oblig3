CREATE TABLE Billett
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    film VARCHAR(255) NOT NULL,
    antall VARCHAR(255) NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    telefonnr INT,
    epost VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);