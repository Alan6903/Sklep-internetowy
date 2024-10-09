 
document.addEventListener('DOMContentLoaded', () => {
    // Inicjalizujemy koszyk z Local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Funkcja zapisująca koszyk do Local Storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Funkcja aktualizująca zawartość koszyka w modalnym okienku
    function updateCart() {
        const cartContent = document.getElementById('cartContent');
        cartContent.innerHTML = ''; // Czyścimy zawartość przed aktualizacją
        
        if (cart.length === 0) {
            cartContent.innerHTML = '<p>Koszyk jest pusty</p>';
        } else {
            let total = 0;
            let cartItems = '<ul>';
            
            cart.forEach((item, index) => {
                cartItems += `<li>${item.name} - ${item.price} PLN 
                <button class="remove-item" data-index="${index}">Usuń</button></li>`;
                total += item.price;
            });
            
            cartItems += '</ul>';
            cartItems += `<div class="razem"><p><strong>Razem: ${total} PLN</strong></p></div>`;
            cartContent.innerHTML = cartItems;

            // Dodajemy event listenery do przycisków usuwania produktów
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = this.dataset.index;
                    removeFromCart(index);
                });
            });
        }
    }

    // Funkcja usuwająca produkt z koszyka
    function removeFromCart(index) {
        cart.splice(index, 1); // Usuwamy produkt z tablicy koszyka
        saveCart(); // Zapisujemy zaktualizowany koszyk w Local Storage
        updateCart(); // Aktualizujemy widok koszyka
    }

    // Dodawanie produktu do koszyka
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            const price = parseFloat(e.target.dataset.price);
            
            // Dodajemy produkt do koszyka (jako obiekt)
            cart.push({ name, price });
            
            // Zapisujemy koszyk do Local Storage
            saveCart();
            
            // Informujemy użytkownika o dodaniu do koszyka (opcjonalnie)
            alert(`${name} został dodany do koszyka!`);
        });
    });

    // --- Sekcja obsługi modali ---
    var modalButtons = document.querySelectorAll('.openModalBtn');
    modalButtons.forEach(function(btn) {
        btn.onclick = function() {
            var modalId = this.getAttribute('data-modal');
            var modal = document.getElementById(modalId);
            modal.style.display = "block";
            
            // Aktualizuj koszyk w momencie otwierania modala
            updateCart();
        }
    });

    var closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(function(span) {
        span.onclick = function() {
            var modal = this.closest('.modal');
            modal.style.display = "none";
        }
    });

    window.onclick = function(event) {
        var modals = document.querySelectorAll('.modal');
        modals.forEach(function(modal) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // Po załadowaniu strony aktualizujemy widok koszyka
    updateCart();
});
