document.getElementById('book-btn').addEventListener('click', async function () {
    const form = document.getElementById('booking-form');

    const bookingData = {
        nome: form.elements['name'].value,
        cpf: form.elements['cpf'].value,
        email: form.elements['email'].value,
        senha: form.elements['password'].value,
        checkin: form.elements['checkin'].value,
        checkout: form.elements['checkout'].value
    };

    let allFieldsFilled = true;
    for (const key in bookingData) {
        if (bookingData[key] === '') {
            allFieldsFilled = false;
            break;
        }
    }

    if (allFieldsFilled) {
        try {
            const response = await fetch('http://localhost:3000/create-cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });

            if (response.ok) {
                alert("Reserva realizada com sucesso!");
                form.reset();
            } else {
                alert("Erro ao realizar reserva.");
            }
        } catch (error) {
            alert("Erro ao conectar ao servidor: " + error.message);
        }
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Event listener para o scroll da janela
window.addEventListener('scroll', function () {
    var scrollLado = document.getElementById('scrollLado');
    var scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        scrollLado.style.opacity = '0';
    } else {
        scrollLado.style.opacity = '1';
    }
});
