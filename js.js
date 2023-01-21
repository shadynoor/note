// Add New Note

let addNote = document.getElementById('addNote')
let addNoteCard = document.querySelector('.add-note')
let popup = document.querySelector('.popup')
let closePopup = document.getElementById('closePopup')
let newTitle = document.getElementById('title')
let newDescription = document.getElementById('description')
let addNewNoteButton = document.getElementById('newNoteBtn')


// Notes Array 
const notes = JSON.parse(localStorage.getItem('notes')) || []

console.log(notes);


let monthNames = [
    "Jan.", "Feb.", "Mar.",
    "Apr.", "May", "Jun.",
    "Jul.", "Aug.", "Sep.",
    "Oct.", "Nov.", "Dec."
];

// Notes Array

let ul = document.getElementById('notes')



// addNoteToDom

function addNoteToDom() {

    document.querySelectorAll('.note').forEach(note => note.remove())
    notes.forEach((note,index) => {
        let li = `
        <li class="note">
        <div class="details" id="noteDetails">
            <p>${note.title}</p>
            <span>${note.desc}</span>
        </div>
        <div class="actions">
            <span>${note.date}</span>
            <div class="settings" >
                <i class="fa-solid fa-ellipsis" onClick="showMenu(this)"></i>
                <ul class="menu">
                    <li onClick = "editNote(${index})"><i class="fa-solid fa-pen-to-square"></i> Edit</li>
                    <li onClick = "deleteNote(${index})">
                        <i class="fa-solid fa-trash"></i> Delete
                    </li>
                </ul>
            </div>
        </div>
    </li>
        `
        addNoteCard.insertAdjacentHTML('afterend' , li)

    });
}
addNoteToDom()


function showMenu(elem){
    elem.parentElement.children[1].classList.add('show')
    document.addEventListener('click' , (e) => {
        if (e.target != elem || e.target.tagName != "I" ) {
            elem.parentElement.children[1].classList.remove('show')
        }
    })
}

function deleteNote(e) {
    console.log(e);
    notes.splice(e,1)
    localStorage.setItem('notes' , JSON.stringify(notes))
    addNoteToDom()
}

function editNote(e) {
    popup.style.visibility = "visible"
    popup.style.opacity = "1"
    addNewNoteButton.innerHTML = "Update"
    newTitle.value = notes[e].title
    newDescription.value = notes[e].desc

    addNewNoteButton.addEventListener('click' , () => {
        if (addNewNoteButton.innerHTML == "Update") {
            notes[e].title = newTitle.value
            notes[e].des = newTitle.value
            localStorage.setItem('notes' , JSON.stringify(notes))
            addNoteToDom()
        }
    })


}

addNote.addEventListener('click' , (e) => {
    popup.style.visibility = "visible"
    popup.style.opacity = "1"
    addNewNoteButton.innerHTML = "Add Note"

})

closePopup.addEventListener('click' , (e) => {
    popup.style.visibility = "hidden"
    popup.style.opacity = "0"
    newTitle.value = ""
    newDescription.value = ""
})

addNewNoteButton.addEventListener('click' , (e) => {
    if ((newTitle.value || newDescription.value) && addNewNoteButton.innerHTML == "Add Note") {
        let day = new Date().getDay()
        let month = monthNames[new Date().getMonth()]
        let year = new Date().getFullYear()
        let date = `${month} ${day}, ${year}`

        let noteInfo = {
            title:newTitle.value,
            desc:newDescription.value,
            date:date
        }

        notes.unshift(noteInfo)
        localStorage.setItem('notes' , JSON.stringify(notes))
        console.log(notes);
        newTitle.value = ""
        newDescription.value = ""
        addNoteToDom()
        popup.style.visibility = "hidden"
        popup.style.opacity = "0"
        newTitle.value = ""
        newDescription.value = ""
    }
})


// create new note

