document.addEventListener('DOMContentLoaded', function() {
    // Завдання 1.1 - onclick для картинок
    const images = document.querySelectorAll('.images img');
    images.forEach(img => {
        img.onclick = function() {
            alert('SRC картинки: ' + this.src);
        };
    });

    // Завдання 1.2 - addEventListener для посилань
    const linksTask2 = document.querySelectorAll('.task:nth-child(2) .links a');
    linksTask2.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.title = this.textContent;
        });
    });

    // Завдання 1.3 - Додавання href до тексту
    const linksWithHref = document.querySelectorAll('#links-with-href a');
    linksWithHref.forEach(link => {
        const originalText = link.textContent;

        link.addEventListener('mouseenter', function() {
            this.textContent = originalText + ' (' + this.href + ')';
        });

        link.addEventListener('mouseleave', function() {
            this.textContent = originalText;
        });
    });

    // Завдання 1.4 - Відключення події після першого наведення
    const linksOnce = document.querySelectorAll('#links-once a');
    linksOnce.forEach(link => {
        const originalText = link.textContent;

        const addHrefOnce = function() {
            this.textContent = originalText + ' (' + this.href + ')';
            this.removeEventListener('mouseenter', addHrefOnce);
        };

        link.addEventListener('mouseenter', addHrefOnce);
    });

    // Завдання 1.5 - Blur для input (3 поля, кожне зберігає своє значення)
    const blurInputs = document.querySelectorAll('#blur-inputs input');
    const valuesContainer = document.getElementById('values-container');

    // Масив для зберігання значень
    const fieldValues = ['', '', ''];

    // Ініціалізація списку
    function initializeList() {
        valuesContainer.innerHTML = '';
        fieldValues.forEach((value, index) => {
            const li = document.createElement('li');
            li.id = `field-${index}`;
            if (value) {
                li.innerHTML = `
                    <span class="value-index">${index + 1}</span>
                    <span class="value-text">${value}</span>
                `;
            } else {
                li.innerHTML = `
                    <span class="value-index">${index + 1}</span>
                    <span class="value-text empty-value">(порожньо)</span>
                `;
            }
            valuesContainer.appendChild(li);
        });
    }

    blurInputs.forEach((input, index) => {
        input.addEventListener('blur', function() {
            const value = this.value.trim();
            fieldValues[index] = value;
            updateValueInList(value, index);
        });
    });

    function updateValueInList(value, index) {
        const li = document.getElementById(`field-${index}`);
        const valueText = li.querySelector('.value-text');
        
        if (value) {
            valueText.textContent = value;
            valueText.classList.remove('empty-value');
        } else {
            valueText.textContent = '(порожньо)';
            valueText.classList.add('empty-value');
        }
        
        // Анімація оновлення
        li.style.animation = 'none';
        setTimeout(() => {
            li.style.animation = 'fadeIn 0.3s ease-in';
        }, 10);
    }

    // Ініціалізуємо список при завантаженні
    initializeList();

    // Завдання 1.6 - Одноразовий alert
    const onceInputs = document.querySelectorAll('#once-inputs input');
    onceInputs.forEach(input => {
        const showAlertOnce = function() {
            alert('Значення поля: ' + this.value);
            this.removeEventListener('focus', showAlertOnce);
        };
        input.addEventListener('focus', showAlertOnce);
    });

    // Завдання 1.7 - Квадрат числа
    const paragraphs = document.querySelectorAll('.paragraphs p');
    paragraphs.forEach(p => {
        p.addEventListener('click', function() {
            const num = parseInt(this.textContent);
            if (!isNaN(num)) {
                const squared = num * num;
                this.textContent = squared;
                this.classList.add('changed');
                
                // Додаємо анімацію
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // Завдання 1.8 - Перевірка довжини
    const validationInputs = document.querySelectorAll('#validation-inputs input');
    validationInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const requiredLength = parseInt(this.getAttribute('data-length'));
            const actualLength = this.value.length;

            this.classList.remove('valid', 'invalid');

            if (actualLength === 0) {
                return;
            }

            if (actualLength === requiredLength) {
                this.classList.add('valid');
            } else {
                this.classList.add('invalid');
            }
        });
    });

    // Завдання 2 - Перемикання кольорів div
    const divs = document.querySelectorAll('.divs div');
    
    function paintRed() {
        this.style.background = '#f44336';
        this.classList.add('red');
        this.removeEventListener('click', paintRed);
        this.addEventListener('click', paintGreen);
    }

    function paintGreen() {
        this.style.background = '#4CAF50';
        this.classList.remove('red');
        this.removeEventListener('click', paintGreen);
        this.addEventListener('click', paintRed);
    }

    divs.forEach(div => {
        div.addEventListener('click', paintRed);
    });

    console.log('Всі завдання завантажені та готові до роботи!');
});