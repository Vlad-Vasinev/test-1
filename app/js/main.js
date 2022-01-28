
/// клик по + или - меняется кол-во товара
let productCount = document.querySelector('.basket__count-field');
let countPlus = document.querySelector('.count-plus');
let countMinus = document.querySelector('.count-minus');

if (productCount) {

    var i = 1;
    countPlus.addEventListener('click', () => {
        i++;
        productCount.innerHTML = i;
    });
    countMinus.addEventListener('click', () => {
        if (i < 1 && i == 0) {
            productCount.innerHTML = 0;
        }
        else {
            i--;
            productCount.innerHTML = i;
        }
    });
}

/// при клике по иконке бургера исчезает/появляется menu
let headerBtn = document.querySelectorAll('.header__bottom-btn');
let headerMenu = document.querySelector('.menu');
let menuExit = document.querySelector('.menu__cross');

if (headerMenu) {
    for (let i = 0; i < headerBtn.length; i++) {
        headerBtn[i].addEventListener('click', () => {
            headerMenu.classList.toggle('menu--active');
        });
    }
    menuExit.addEventListener('click', () => {
        headerMenu.classList.toggle('menu--active');
    });
}

/// проверка формы на валидный email
let inputForm = document.querySelector('.footer__item-input');
let sendBtn = document.querySelector('.footer__btn');

let regExpressMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
let spanMessage = document.querySelector('.input-message');

sendBtn.addEventListener('click', () => {
    if (regExpressMail.test(inputForm.value)) {
        unvalidValue(spanMessage, 'Подписка успешно оформлена!');
    }
    else {
        unvalidValue(spanMessage, 'Введите пожалуйста существующий адрес!');
    }
});

function validValue(el, message) {
    el.innerHTML = message;
}

function unvalidValue(el, message) {
    el.innerHTML = message;
}

///очистка поля ввода для email
let footerExitBtn = document.querySelector('.footer__btn-cross');

footerExitBtn.addEventListener('click', () => {
    document.querySelector('.footer__item-input').value = '';
});

/// клик по миниатюре - переключение основной картинки
let contentBtn = document.querySelectorAll('.content__img-btn');
let contentMain = document.querySelectorAll('.content__img-main');

for (let i = 0; i < contentBtn.length; i++) {
    var data = contentBtn[i].dataset.number;
    contentBtn[i].addEventListener('click', () => {
        var data = contentBtn[i].dataset.number;
        for (let i = 0; i < contentMain.length; i++) {
            contentMain[i].style.display = 'none';
        }
        contentMain[data].style.display = 'block';
    });
}

///добавление товара при клике на "Добавить в корзину"
let basketBtn = document.querySelector('.basket__btn');
let contentTitle = document.querySelector('.content__description-title');
let contentCount = document.querySelector('.basket__count-field');

basketBtn.addEventListener('click', () => {
    var message = document.createElement('div');
    if (contentCount.innerHTML > 0) {
        message.innerHTML = "товар в количестве: " + contentCount.innerHTML + " единиц добавлен в корзину";
    }
    else {
        message.innerHTML = "Необходимо выбрать товар для продолжения покупки";
    }
    let parent = document.querySelector('.basket');
    let child = document.querySelector('.basket__link');
    parent.insertBefore(message, child);
    setTimeout(() => message.remove(), 3000);
});

///добавление товара при клике на "избранное"
let favouriteBtn = document.querySelector('.btn-favourite');

favouriteBtn.addEventListener('click', () => {
    var message = document.createElement('div');
    if (contentCount.innerHTML > 0) {
        message.innerHTML = "товар в количестве: " + contentCount.innerHTML + " единиц добавлен в избранное";
    }
    else {
        message.innerHTML = "Необходимо выбрать товар для сохранения в избранном";
    }
    let parent = document.querySelector('.basket');
    let child = document.querySelector('.basket__link');
    parent.insertBefore(message, child);
    setTimeout(() => message.remove(), 3000);
});

///скролл вверх/вниз шапка
let header = document.querySelector('.header');
var scrollInitial = 0;
let defaultOffset = 100;
const scrollFunction = () => window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('scroll', () => {
    if (scrollFunction() > scrollInitial && !header.classList.contains('header--active')) {
        header.classList.add('header--active');
    }

    else if (scrollFunction() < scrollInitial) {
        header.classList.remove('header--active');
    }
    scrollInitial = window.pageYOffset;
});