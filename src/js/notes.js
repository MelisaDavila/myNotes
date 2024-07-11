import { getNotesFromLocalStorage, setNotesToLocalStorage } from "./localstorage.js";
import { createNoteElement, createEditElement } from "./createHtmlElements.js";
import { checkCharacterLimit, existNotes } from "./utilities.js";
/*
It contains functionalities to manage the status of the notes, and perform CRUD operations.
*/

const titleInput = document.getElementById("title-note");
const contentTextarea = document.getElementById("content-note");
const noteForm = document.getElementById("notes-form");
const notesList = document.getElementById("notes-list");

export let notes = getNotesFromLocalStorage();
export let isEditing = false;
let idTracker = { currentMaxId: notes.length ? Math.max(...notes.map(note => note.id)) : 0 };


//Create the note and add it to notes array, the localStorage and the DOM
export function handleCreateNote(e) {
    if (contentTextarea.value.trim() === "") {
        return alert("Ingrese el contenido de la nota.");
    }

    e.preventDefault();
    idTracker.currentMaxId += 1;
    const note = {
        id: idTracker.currentMaxId,
        title: titleInput.value,
        content: contentTextarea.value.replace(/\n/g, '<br>'),
    };
    const noteElement = createNoteElement(note);
    notesList.appendChild(noteElement);
    notes.push(note);
    setNotesToLocalStorage(notes);
    cleanForm();
    existNotes();
    isEmpty({ target: contentTextarea });
    isEmpty({ target: titleInput });
}

function cleanForm() {
    titleInput.value = "";
    contentTextarea.value = "";
}

// Remove the note from the notes array, the localStorage and the DOM
export function handleDeleteNote(id) {
    const noteToDelete = document.getElementById(id);
    if (noteToDelete) {
        notesList.removeChild(noteToDelete);
        notes = notes.filter((note) => note.id !== id);
        setNotesToLocalStorage(notes);
        existNotes();
    }
}

export function handleEditNote(id) {
    const noteToEdit = notes.find((note) => note.id === id);
    const elementInEditing = document.getElementById(id);

    if (isEditing) {
        alert("Termina de editar la nota actual antes de editar otra.");
        return;
    }
    isEditing = true;
    createEditElement(elementInEditing, noteToEdit);

    const buttonEdit = elementInEditing.querySelector(".btn-secondary");
    buttonEdit.addEventListener("click", () => {
        handleSaveChanges(elementInEditing, noteToEdit);
    });
}

export function handleSaveChanges(elementInEditing, noteToEdit) {
    const content = elementInEditing.querySelector("textarea").value.replace(/\n/g, '<br>');
    const title = elementInEditing.querySelector("input").value;

    if (!content.trim()) {
        alert("El contenido de la nota no puede estar vacío.");
        return;
    }
    const newNote = { ...noteToEdit, title, content };
    const newNoteElement = createNoteElement(newNote);

    notesList.replaceChild(newNoteElement, elementInEditing);
    notes = updateNoteInList(newNote);
    setNotesToLocalStorage(notes);
    isEditing = false;

    const buttonEdit = elementInEditing.querySelector(".btn-secondary");
    buttonEdit.removeEventListener("click", handleSaveChanges);
}

//Updates the edited note in the notes array
function updateNoteInList(updatedNote) {
    return notes.map((note) => (note.id === updatedNote.id ? updatedNote : note));
}

//Check if the inputs is empty
export function isEmpty(event) {
    if (event.target.value.trim() !== "") {
        isEditing = true;
    } else {
        isEditing = false;
    }
}

noteForm.addEventListener("submit", handleCreateNote);
titleInput.addEventListener('input', checkCharacterLimit);
contentTextarea.addEventListener('input', checkCharacterLimit);

