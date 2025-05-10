let calculation = localStorage.getItem ('calculation') || '';;

display();

function updateCalculation(data) {
    calculation+=data;
    display();
    saveCalculation ();l
}
 
function saveCalculation () {
    localStorage.setItem ('calculation', calculation);
}

function display() {
    document.querySelector('.js-display').innerHTML = calculation ;
}













