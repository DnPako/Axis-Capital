// sticky nav functionality
const nav = document.querySelector('header');
const topNav = nav.offsetTop;
const sliderImages = document.querySelectorAll('.slide-in');

function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function fixNav(e) {
    if(window.scrollY > topNav) {
        document.body.classList.add('fix-nav');
    } else {
        document.body.classList.remove('fix-nav');
    }
    // Slide in animations
    sliderImages.forEach(image => {
        const slideInAt = (window.scrollY + window.innerHeight) - image.height/2;
        const imageBottom = image.offsetTop + image.height;
        const isHalfShown = slideInAt > image.offsetTop;
        const notScrolledPassed = window.scrollY < imageBottom;
        (isHalfShown && notScrolledPassed) ? image.classList.add('active') : image.classList.remove('active')
    });
}

// Navigation functionality
const menuItems = document.querySelectorAll('.menu li a');
const pubBlock = document.querySelector('#pub');
const entityBlock = document.querySelector('#entity');


function goToSection() {
    window.scrollTo(0,'2000')
    const id = this.name;
    if(id === 'home'){
        setTimeout(function() {window.scrollTo(0,0)},1)
    }else{
         const element = document.querySelector(`#${id}`);
         setTimeout(function() {window.scrollTo(0,element.offsetTop)},1);
         fixNav();
    }
}



menuItems.forEach(link => link.addEventListener('click', goToSection));
document.addEventListener('scroll', debounce(fixNav));
