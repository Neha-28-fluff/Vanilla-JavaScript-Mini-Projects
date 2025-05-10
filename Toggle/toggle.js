function toggle(selector) {
    let toggleElement = document.querySelector(`.js-${selector}-button`);
    if (! toggleElement.classList.contains('on-button')) {
        turnOffPreviousButton();
        toggleElement.classList.add('on-button');
    } else {
        toggleElement.classList.remove('on-button');
    }
}

function turnOffPreviousButton() {
    const previousButton = document.querySelector('.on-button') ;
    if (previousButton) {
        previousButton.classList.remove('on-button');
    }
}