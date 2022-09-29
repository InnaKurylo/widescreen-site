"use strict";
/* Вкладки у секції Our services повинні перемикатися при 
натисканні мишею. */
let atr;
let navService = document.querySelector('.navServices');
let activeClass = document.querySelector('.activeService');
let activeDiv = document.querySelector('#sectorService');
invisible(activeDiv);
visible(activeClass);
navService.addEventListener('click', (el) => {
    invisible(activeDiv);
    if (activeClass) {
        activeClass.classList.remove('activeService');
    }
    el.target.classList.toggle('activeService');
    activeClass = el.target;
    visible(activeClass);
});

function invisible(elements) {
    for (let i of elements.children) {
        i.style.display = 'none';
    };
};
function visible(target) {
    atr = target.dataset.name;
    for (let i of activeDiv.children) {
        if (i.classList.contains(atr)) {
            i.style.display = 'flex';
        };
    };
};
/* Кнопка Load more у секції Our amazing work імітує завантаження 
з сервера нових картинок. При її натисканні в секції знизу мають
 з'явитись ще 12 картинок.
  Після цього кнопка зникає. */
let pause;
let endSpiner;
let moreFoto = document.querySelector('.moreFoto');
let spiner = document.querySelector(".lds-dual-ring");
let fotoInvs = document.querySelectorAll('.invisible');
let bottom = document.querySelectorAll('.bottom');
spiner.style.display = 'none';
let counter = 0;
moreFoto.addEventListener('click', () => {
    moreFoto.style.display = 'none';
    spiner.style.display = 'flex';
    if (counter === 0) {
        pause = setTimeout(() => {
            overkill(fotoInvs, 'invisible');
            visibleImg(imgWork);
            spiner.style.display = 'none';
            moreFoto.style.display = 'flex';

        }, 1000);
    }
    if (counter > 0) {
        spiner.style.display = 'flex';
        pause = setTimeout(() => {
            overkill(bottom, 'bottom');
            visibleImg(imgWork);
            spiner.style.display = 'none';
        }, 1000);
    }
    counter++;
});
function overkill(collection, classes) {
    for (let item of collection) {
        item.classList.remove(classes);
    }
}
clearTimeout(pause);

/* Кнопки на вкладці Our amazing work є "фільтрами продукції".*/

let listOurWork = document.querySelector('.listOurWork');
let activeOurWork = document.querySelector('.navOurWorkActive');
let imgWork = document.querySelector('.imgWork');
listOurWork.addEventListener('click', (el) => {
    invisible(imgWork);
    if (activeOurWork) {
        activeOurWork.classList.remove('navOurWorkActive')
    }
    el.target.classList.add('navOurWorkActive');
    activeOurWork = el.target;
    visibleImg(imgWork);
})
function visibleImg(imgWork) {
    atr = activeOurWork.dataset.name;
    if (atr == 'all') {
        for (let i of imgWork.children) {
            if (i.classList.contains('invisible') || i.classList.contains('bottom')) {
                continue;
            }
            else {
                i.style.display = 'flex';
            }
        }
        return;
    }
    for (let i of imgWork.children) {
        if (i.classList.contains('invisible') || i.classList.contains('bottom')) {
            continue;
        } else {
            if (i.classList.contains(atr)) {
                i.style.display = 'flex';
            };
        }
    }
}
/* slider */
let sibling;
let sliderAvatar = document.querySelector('.avatarActive');
let valueName = document.querySelectorAll('.people');
let slider = document.querySelector('.fotoPeople');
let sliderItems = document.querySelector('.sliderItems').firstChild;
let clone;
createClone();
slider.addEventListener('click', (item) => {
    for (let baby of sliderAvatar.children) {
        baby.remove();
    }
    if (item.target.tagName === 'LI' && (!item.target.classList.contains('button'))) {
        sliderItems.parentNode.classList.remove('sliderItems');
        item.target.classList.add('sliderItems');
        sliderItems = item.target.firstChild;
        createClone();
    } else {
        if (item.target.closest('.foto')) {
            sliderItems.parentNode.classList.remove('sliderItems');
            item.target.parentNode.classList.add('sliderItems');
            sliderItems = item.target;
            createClone();
        };
        if (item.target.closest('.buttonPrev')) {
            let sibling = sliderItems.parentNode.previousElementSibling;
            if (sibling == slider.children[0]) {
                sibling = slider.children[slider.children.length - 2]
            };
            addRemoveClass(sibling);

        }
        if (item.target.closest('.buttonNext')) {
            sibling = sliderItems.parentNode.nextElementSibling;
            if (sibling == slider.children[slider.children.length - 1]) {
                sibling = slider.children[1];
            }
            addRemoveClass(sibling);
        }
    }
    valueName.forEach((value) => {
        value.classList.remove('active');
        if (value.dataset.name == sliderItems.dataset.name) {
            value.classList.add('active')
        }
    })
})

function addRemoveClass(sibling) {
    sibling.classList.add('sliderItems');
    sliderItems.parentNode.classList.remove('sliderItems');
    sliderItems = sibling.firstChild;
    createClone();
}
function createClone() {
    clone = sliderItems.cloneNode();
    sliderAvatar.append(clone);
}
/* Masonry */
let masonry = document.querySelector('.buttonGalary');
let galery = document.querySelector('.galery');
let spinerMasonry = document.querySelector('.spinerMasonry');
let brick = galery.querySelectorAll('.invisibleMasonry');
console.log(brick);
spinerMasonry.style.display = 'none';
masonry.addEventListener('click', () => {
    masonry.style.display = 'none';
    spinerMasonry.style.display = 'flex';
    setTimeout(() => {
        galery.style.height = '1410px';
        brick.forEach((el) => {
            el.classList.remove('invisibleMasonry');
        })
        spinerMasonry.style.display = 'none';
    }, 1000);
}) 