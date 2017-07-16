// Fix nav fonctionality
const nav = document.querySelector('header');
const topNav = nav.offsetTop;

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
}

document.addEventListener('scroll', debounce(fixNav));
