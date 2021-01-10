let deleteBtns = document.querySelectorAll('.index-del-list-btn');
deleteBtns.forEach(button => {
    button.addEventListener('click', handleDeleteClick);
})

let editBtns = document.querySelectorAll('.index-edit-btn');
editBtns.forEach(button => {
    button.addEventListener('click', handleEditClick);
})

function handleDeleteClick () {
    document.querySelector('.modal-input-container').classList.add('gone');
    document.querySelector('.modal-title').innerHTML = 'Are you sure you want to delete this list?';
    document.querySelector('.modal-btn-accept').innerHTML = 'Yes';
    document.querySelector('.modal-btn-cancel').innerHTML = 'No';
    let listId = this.value;
    let url = `/lists/${listId}?_method=DELETE`;
    document.querySelector('.modal-list-form').setAttribute('action', url);
}

function handleEditClick () {
    let listId = this.value;
    let url = `/lists/?_method=PUT`;
    document.querySelector('.hidden-list-id').value = listId;
    document.querySelector('.modal-title').innerHTML = 'Change List name?';
    document.querySelector('.modal-btn-accept').innerHTML = 'Change';
    document.querySelector('.modal-btn-cancel').innerHTML = 'Cancel';
    document.querySelector('.modal-list-form').setAttribute('action', url);
    document.querySelector('.modal-input-container').classList.remove('gone');
}