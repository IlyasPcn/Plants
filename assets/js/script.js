console.log('часть 1\n110/100 \n\nВёрстка валидная, ,без ошибок и предупреждения +10\nВёрстка семантическая +20\nВёрстка соответствует макету +48\nТребования к css соблюдены + 12\nИнтерактивность, реализуемая через css соблюдена +20\n\n')
console.log('часть 2\n85/75 \n\nВёрстка соответствует макету. Ширина экрана 768px +24\nВёрстка соответствует макету. Ширина экрана 380px +24\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\nНа ширине экрана 380рх и меньше реализовано адаптивное меню +22\n\n')
console.log(
    'часть 3\n\n' +
    '125/100\n\n' +
    'При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n' +
    'Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50\n' +
    'B разделе contacts реализован select с выбором городов +25\n\n'
    );
//================VARS=====================
const navMenu = document.querySelector('.nav__menu');
const navBurger = document.querySelector('.nav__burger');
const navBurgerLine = document.querySelectorAll('.nav__burger-line');
const navMenuItem = document.querySelectorAll('.nav__menu-item');
const main = document.querySelector('.main');
const headerWelcome = document.querySelector('.header__welcome');
const serviceButton = document.querySelectorAll('.service__button');
const serviceItem = document.querySelectorAll('.articles__item');
const pricesButtons = document.querySelectorAll('.prices__accordion-button')
const pricesAccordionContainer = document.querySelectorAll('.prices__accordion-inner')
const pricesButtonsRow = document.querySelector('.prices__accordion-row')
const selectTitle = document.querySelector('.select__title')
const selectMenu = document.querySelector('.select__menu')
const selectItem = document.querySelectorAll('.select__menu-item')
const selectText = document.querySelector('.select__title-text')
const selectProp = document.querySelectorAll('.select__property')


//================BURGER=====================
const burgerActive =() =>{ 
    navBurger.classList.toggle('active');
    navMenu.classList.toggle('active');
    navBurgerLine.forEach( item => { 
        item.classList.toggle('active')
    })
} 
const burgerOff = () => { 
    if(navMenu.classList[1] === 'active'){
        burgerActive()
    }
}
 
//================TABS=====================
let buttonsArr = [];

const itemBlur = () => {
    serviceItem.forEach( item => item.classList.add('active'))

    buttonsArr.forEach( item => { 
        let a = item.getAttribute('data-button-blur');
        serviceItem.forEach( item2 => { 
            if(item2.classList.contains(a) && buttonsArr.length >=1){ 
                item2.classList.remove('active')
            }
        })
    })
    if(buttonsArr.length === 0){serviceItem.forEach( item => item.classList.remove('active'))}
}

const buttonToggle =()=> { 
    serviceButton.forEach( item => item.classList.remove('active'))
    buttonsArr.forEach( item => item.classList.add('active'))
}

const buttonActive = (e) => { 
    if (buttonsArr.includes(e.target) === false && buttonsArr.length === 2){
        buttonsArr.shift() 
        buttonsArr.push(e.target)
    } else if( buttonsArr.length < 2 && buttonsArr.includes(e.target) === false) { 
        buttonsArr.push(e.target)
    } else if (buttonsArr.includes(e.target) === true) { 
        buttonsArr[0] === e.target ? buttonsArr.shift() : buttonsArr.pop();
    }
    buttonToggle()
    itemBlur()
}
//==========================ACCRN================================

const accUp = () => {
    pricesAccordionContainer.forEach(item => item.classList.remove('active'))
    pricesButtons.forEach( item => item.classList.remove('active'))
}

const accDown =(e)=>{ 
    let attr = e.target.getAttribute('data-prices-buttons')
    pricesButtonsRow.classList.add('active')

    if(e.target.classList.contains('active')){
        accUp()
    }else {
        accUp()
        e.target.classList.add('active')
        pricesAccordionContainer.forEach(item => item.classList.contains(attr) ? item.classList.add('active') : item.classList.remove('active'))
    }
}
//==========================SELECT==============================
const arrowToggle =()=> { 
    selectTitle.classList.toggle('button-active');
}

const hideProp =() => { 
    selectProp.forEach( item => { item.classList.remove('change')})
    if (selectMenu.classList.contains('active')) { 
        selectProp.forEach(item => { 
            item.classList.contains('active')  ? item.classList.add('change') : item.classList.remove('change')
        })
    }
    
}

const checkProp =()=> { 
    selectProp.forEach(item => { 
        item.classList.contains('change') ? item.classList.remove('change') : item;
    })
}
const selectProperty =(param)=> { 
    selectProp.forEach( item => { 
        item.classList.remove('active')
        item.classList.contains(param) ? item.classList.add('active') : item.classList.remove('active');
    })
}
const titleToggle = () => {
    if (selectTitle.innerText !== "City") { 
        selectMenu.classList.toggle('active')
        hideProp()
        arrowToggle()
    } else { 
        selectMenu.classList.toggle('active')
        selectTitle.classList.toggle('active') 
        arrowToggle()
    }
} 

const selectCity = (e) => { 
    let text = e.target.outerText
    selectText.innerHTML = text
    selectMenu.classList.remove('active')
    selectText.classList.add('fontz')
    let propertySelected = e.target.classList[1]
    selectProperty(propertySelected)
    checkProp()
    arrowToggle()
}



//==============================================================
navMenuItem.forEach( item => item.addEventListener('click', burgerActive))
navBurger.addEventListener('click', burgerActive);
main.addEventListener('click', burgerOff);
headerWelcome.addEventListener('click', burgerOff);
serviceButton.forEach( item => item.addEventListener('click', buttonActive))
pricesButtons.forEach( item => item.addEventListener('click', accDown))
selectTitle.addEventListener('click', titleToggle)
selectItem.forEach( item => item.addEventListener('click', selectCity))