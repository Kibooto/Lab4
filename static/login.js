document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');


    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!username || !email || !password) {
            alert('Будь ласка, заповніть всі поля');
            return;
        }

        if (username.length < 5) {
            alert('Ім\'я користувача повинно містити принаймні 5 символи');
            return;
        }

        if (password.length < 8) {
            alert('Пароль повинен містити принаймні 8 символів');
            return;
        }
        if (password.length > 20) {
            alert('Пароль повинен містити не більше 20 символів');
            return;
        }
        if (password.search(/[a-z]/) < 0) {
            alert('Пароль повинен містити хоча б одну маленьку літеру');
            return;
        }
        if (password.search(/[A-Z]/) < 0) {
            alert('Пароль повинен містити хоча б одну велику літеру');
            return;
        }
        if (password.search(/[0-9]/) < 0) {
            alert('Пароль повинен містити хоча б одну цифру');
            return;
        }
        if (password.search(/[!@#$%^&*]/) < 0) {
            alert('Пароль повинен містити хоча б один спеціальний символ');
            return;
        }

        if (email.length < 5) {
            alert('Email повинен містити принаймні 5 символів');
            return;
        }

        if (email.indexOf('@') === -1) {
            alert('Email повинен містити символ @');
            return;
        }

        form.submit();

    });
})