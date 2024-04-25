package com.example.obligdata1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate bookingSystem;

    public void lagreBillett(Billett billett) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        bookingSystem.update(sql, billett.getFilm(), billett.getAntall(), billett.getFornavn(), billett.getEtternavn(), billett.getTelefonnr(), billett.getEpost());
    }


    public List<Billett> visAlleBilletter() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn";
        List<Billett> alleBilletter = bookingSystem.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettAlleBilletter() {
        String sql = "DELETE FROM Billett";
        bookingSystem.update(sql);
    }

    public void slettBillett(int id){
        String sql = "DELETE FROM Billett WHERE id = ?";
        bookingSystem.update(sql,id);
    }

}
