package com.example.obligdata1700;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    BillettRepository rep;

    @PostMapping("/receiveBillett")
    public void receiveBillett(Billett innBillett) {
        rep.lagreBillett(innBillett);
        System.out.println("Motatt Billett: " + innBillett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle(){
        return rep.visAlleBilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlleBilletter();
    }

    @GetMapping("/slettBillett")
    public void slettBillett(int id){
        rep.slettBillett(id);
    }
}
