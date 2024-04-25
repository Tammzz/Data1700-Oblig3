package com.example.obligdata1700;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class Billett {
    private String film;
    private Integer antall;
    private String fornavn;
    private String etternavn;
    private String telefonnr;
    private String epost;
    private Integer id;
}


