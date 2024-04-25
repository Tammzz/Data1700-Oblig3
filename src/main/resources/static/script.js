const Movies = [
    "Transformers",
    "Inception",
    "Avengers: Infinity War",
    "The Hunger Games",
];

// Insert the film names when page is loaded using an event listener
document.addEventListener(
    "DOMContentLoaded",
    function () {
        let film = document.getElementById("film");
        Movies.forEach(function (films) {
            film.innerHTML += `<option value=${films}>${films}</option>`;
        });
    },
    false
);

// Function to add billetts first checks the inputs
// if all are valid adds ticket object to the global billettListe array
// Then also adds the new bilett to the ordered list "alleBilletter" as a list element
function addBillett() {
    if (checkInputs()) {
        let billett = {
            film: document.getElementById("film").value,
            antall: document.getElementById("antall").value,
            fornavn: document.getElementById("fornavn").value,
            etternavn: document.getElementById("etternavn").value,
            telefonnr: document.getElementById("telefonnr").value,
            epost: document.getElementById("epost").value,
        };
        /* billettListe.push(billett);
        //Add the new billett to the list
        document.getElementById(
            "alleBilletter"
        ).innerHTML += `<li>${billett.film} ${billett.antall} ${billett.fornavn} ${billett.etternavn} ${billett.telefonnr} ${billett.epost}</li>`;
        */

        //Send billett to server
        console.log(billett);
        $.post("http://localhost:8080/receiveBillett", billett, function (data) {
            hentAlle();
        });

        //Reset the form fields after adding the film
        resetForm();
    }
}

function hentAlle() {
    $.get("/hentAlle", function (billett) {
        updateTable(billett);
    });
}

function updateTable(billett) {
    let output = "<table class=\"table table-striped\"><thead><tr><th>Film</th><th>Antall</th><th>Fornavn</th>" +
        "<th>Etternavn</th><th>Telefonnr</th><th>Epost</th></tr></thead><tbody>";
    for (const data of billett) {
        output += "<tr><td>" + data.film + "</td><td>" + data.antall + "</td><td>" + data.fornavn + "</td>" +
            "<td>" + data.etternavn + "</td><td>" + data.telefonnr + "</td><td>" + data.epost + "</td></tr>";}
output += "</tbody></table>";
$("#resultObject").html(output);
}

//If any of the inputs fail this function will return false.
function checkInputs() {
    return (
        checkFilmSelectionInput() &
        checkBillettCountInput() &
        checkPhoneInput() &
        checkMailInput() &
        checkNameInput() &
        checkSurnameInput()
    );
}

// Checks the film selection element input
function checkFilmSelectionInput() {
    let isValid = true;
    let film = document.getElementById("film").value;
    console.log(film.length);
    let filmErrorMsg = document.getElementById("filmErrorMsg");
    if (film.length < 1) {
        filmErrorMsg.innerText = "Vennligst velg en film fra listen";
        filmErrorMsg.style.visibility = "visible";
        isValid = false;
    } else {
        filmErrorMsg.style.visibility = "hidden";
    }

    return isValid;
}

// Antall validation
function checkBillettCountInput() {
    let isValid = true;
    let antall = document.getElementById("antall").value;
    let antallErrorMsg = document.getElementById("antallErrorMsg");
    if (parseInt(antall) < 1 || isNaN(parseInt(antall))) {
        antallErrorMsg.innerText = "Må skrive noe inn i antall";
        antallErrorMsg.style.visibility = "visible"; // Show error message
        isValid = false;
    } else {
        antallErrorMsg.style.visibility = "hidden"; // Hide error message
    }
    return isValid;
}

// Check e-Mail input
function checkMailInput() {
    let isValid = true;
    // Epost validation
    let epost = document.getElementById("epost").value;
    let epostErrorMsg = document.getElementById("epostErrorMsg");
    // A regular expression for validating email. (from regexr.com)
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(epost)) {
        epostErrorMsg.innerText =
            "Må skrive noe inn i epost";
        epostErrorMsg.style.visibility = "visible";
        isValid = false;
    } else {
        epostErrorMsg.style.visibility = "hidden";
    }

    return isValid;
}

// Check Phone input
function checkPhoneInput() {
    let isValid = true;
    // Telefonnr validation
    // Telefonnr validation
    let telefonnr = document.getElementById("telefonnr").value;
    let tlfErrorMsg = document.getElementById("tlfErrorMsg");
    // A regular expression for validating telephone number. (from regexr.com)
    if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/.test(telefonnr)) {
        tlfErrorMsg.innerText = "Må skrive noe inn i telefonnr";
        tlfErrorMsg.style.visibility = "visible";
        isValid = false;
    } else {
        tlfErrorMsg.style.visibility = "hidden";
    }
    return isValid;
}

// Check Name input
function checkNameInput() {
    let isValid = true;
    // Fornavn validation
    let fornavn = document.getElementById("fornavn").value;
    let fornavnErrorMsg = document.getElementById("fornavnErrorMsg");
    if (!/^[a-zA-ZæøåÆØÅ\s]+$/.test(fornavn) || fornavn.length < 2) {
        fornavnErrorMsg.innerText = "Må skrive noe inn i fornavnet";
        fornavnErrorMsg.style.visibility = "visible";
        isValid = false;
    } else {
        fornavnErrorMsg.style.visibility = "hidden";
    }
    return isValid;
}

// Check surname input
function checkSurnameInput() {
    let isValid = true;
    // Etternavn validation
    let etternavn = document.getElementById("etternavn").value;
    let etternavnErrorMsg = document.getElementById("etternavnErrorMsg");
    if (!/^[a-zA-ZæøåÆØÅ\s]+$/.test(etternavn) || etternavn.length < 2) {
        etternavnErrorMsg.innerText = "Må skrive noe inn i etternavnet";
        etternavnErrorMsg.style.visibility = "visible";
        isValid = false;
    } else {
        etternavnErrorMsg.style.visibility = "hidden";
    }
    return isValid;
}
// Reset the form
function resetForm() {
    document.getElementById("billettForm").reset();
    // Hide all warning messages
    let warnings = document.querySelectorAll(".error-message");
    warnings.forEach(function (warning) {
        warning.style.visibility = "hidden";
    });
}

// Clear all billetts from the array and reset the list
function slettAlleBilletter() {
        $.get( "/slettAlle", function() {
            hentAlle();
        });
}