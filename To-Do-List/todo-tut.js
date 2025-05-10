const toDoList = JSON.parse(localStorage.getItem('toDoList')) || [] ;

renderToDoList();

document.querySelector('.js-add-button')
    .addEventListener('click', () => {
        addToDo();
    });


function addToDo() {
    const nameInputElement = document.querySelector('.js-name-input');
    const name = nameInputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    toDoList.push({
        name,
        dueDate
    });
    console.log(toDoList);

    nameInputElement.value = "";
    dateInputElement.value = "";

    renderToDoList();

    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function renderToDoList() {

    let toDoListHTML = '';

    toDoList.forEach((toDoObject, index) => {
        const name = toDoObject.name;
        const dueDate = toDoObject.dueDate;
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div> 
            <div>
                <button  class="delete-button js-delete-button" >Delete<button>
            </div>
        `;
        toDoListHTML += html;
    });

    console.log(toDoListHTML);
    document.querySelector('.js-toDo-list')
        .innerHTML = toDoListHTML;

    document.querySelectorAll('.js-delete-button')
        .forEach((deleteButton, index) => {
            deleteButton.addEventListener('click', () => {
                toDoList.splice(index, 1);
                renderToDoList();
                localStorage.removeItem('toDoList');
            })
        })
}

