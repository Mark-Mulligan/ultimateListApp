/* ----- BTN EVENT LISTENERS ----- */

//CHECKBOXES 
let checkboxes = document.querySelectorAll('.checkbox');

//Crosses out checked items on page load
checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) document.querySelector(`.item-${index}`).classList.add('line-through');
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        let itemNum = e.target.value;
        if (e.target.checked) {
            document.querySelector(`.item-${itemNum}`).classList.add('line-through');
            let itemId = document.querySelector(`#itemId-${itemNum}`).value;
            let listId = document.querySelector(`#listId`).value;
            axios.post(`/lists/${listId}/edit/checkbox/${itemId}`, {
                checked: true
            });
        } else {
            document.querySelector(`.item-${itemNum}`).classList.remove('line-through');
            let itemId = document.querySelector(`#itemId-${itemNum}`).value;
            let listId = document.querySelector(`#listId`).value;
            axios.post(`/lists/${listId}/edit/checkbox/${itemId}`, {
                checked: false
            });
        }
    })
})

//CLEAR ITEMS BUTTON
let clearItemsBtn = document.querySelector('.delete-items-btn');
clearItemsBtn.addEventListener('click', handleClearItemsBtnClick);

function handleClearItemsBtnClick () {
    let modalForm = document.querySelector('.modal-form');
    let listId = modalForm.getAttribute('data-list-id');
    document.querySelector('.modal-title').innerHTML = 'Are you sure you want to clear all the items in your list?';
    document.querySelector('.modal-form').setAttribute('action', `/lists/${listId}/edit?_method=PUT`);
}

//DELETE LISTS BUTTON
let deleteListBtn = document.querySelector('.delete-list-btn');
deleteListBtn.addEventListener('click', handleDeleteListBtnClick);

function handleDeleteListBtnClick () {
    let modalForm = document.querySelector('.modal-form');
    let listId = modalForm.getAttribute('data-list-id');
    document.querySelector('.modal-title').innerHTML = 'Are you sure you want to delete this list?';
    modalForm.setAttribute('action', `/lists/${listId}/?_method=DELETE`);
}

//DIRECT LIST TITLE CLICK FUNCTION
let listName = document.querySelector('.list-name');
listName.addEventListener('click', handleListNameClick);

function handleListNameClick() {
    document.querySelector('.change-name-btn-container').classList.remove('gone');
    listName.removeEventListener('click', handleListNameClick);
    listName.remove();
    document.querySelector('.title-edit').focus();
}

//EDIT BUTTON CLICKS (on right hand side of each list item)
turnOnEditBtns();

//Makes it so that you can only click on edit button at a time.  
function handleEditBtnClick(e) {
    turnOffEditBtns();
    let index = this.value;
    document.querySelector(`.item-${index}`).remove();
    document.querySelector(`.edit-item-${index}`).classList.remove('gone');
    document.querySelector(`.edit-input-${index}`).focus();
}

function turnOnEditBtns() {
    let editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(button => {
        button.addEventListener('click', handleEditBtnClick);
    })
}

function turnOffEditBtns () {
    let editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach(button => {
        button.removeEventListener('click', handleEditBtnClick);
    })
}