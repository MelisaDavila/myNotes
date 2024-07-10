/*
It contains functionalities to know and manage the status of the notes and the actions that can be performed with them, such as create, update and edit a note.
*/

import { getNotesFromLocalStorage, setNotesToLocalStorage, getCounterFromLocalStorage, setCounterToLocalStorage } from "./localstorage.js";
import { createNoteElement } from "./createNoteElement.js";

const titleInput = document.getElementById("title-note");
const contentTextarea = document.getElementById("content-note");
const noteForm = document.getElementById("notes-form");
const notesList = document.getElementById("notes-list");

export let notes = getNotesFromLocalStorage();
export let isEditing = false;
let counter = getCounterFromLocalStorage();

// Add or remove span if no notes exist
export function existNotes() {
    const span = document.querySelector(".span-empty-notes");
    if (notes.length > 0 && span) {
        notesList.removeChild(span);
    } else if (notes.length === 0) {
        const newSpan = document.createElement("span");
        newSpan.classList.add("span-empty-notes");
        newSpan.textContent = "No hay notas guardadas";
        notesList.appendChild(newSpan);
    }
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

//Create the note and add it to notes array, the localStorage and the DOM
export function handleCreateNote(e) {
    if (contentTextarea.value === "") {
        alert("Ingrese el contenido de la nota.");
        return;
    }

    e.preventDefault();
    const note = {
        id: counter,
        title: titleInput.value,
        content: contentTextarea.value.replace(/\n/g, '<br>'),
    };
    ++counter;
    const noteElement = createNoteElement(note);
    notesList.appendChild(noteElement);
    notes.push(note);
    setNotesToLocalStorage(notes);
    setCounterToLocalStorage(counter);
    cleanForm();
    existNotes();
}


// Allows to edit a note and save the changes made.
export function handleEditNote(id) {
    const noteToEdit = notes.find((note) => note.id === id);
    const elementInEditing = document.getElementById(id);

    if (isEditing) {
        alert("Termina de editar la nota actual antes de editar otra.");
        return;
    }

    isEditing = true;
    renderEditElement(elementInEditing, noteToEdit);

    // Save the changes made, in the notes array and in localstorage
    const handleSaveChanges = () => {
        const content = elementInEditing.querySelector("textarea").value;
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
        buttonEdit.removeEventListener("click", handleSaveChanges);
    };

    const buttonEdit = elementInEditing.querySelector(".btn-secondary");
    buttonEdit.addEventListener("click", handleSaveChanges);
}

//Create the html element that allows editing the note
function renderEditElement(element, note) {
    element.innerHTML = `
          <input class="create-notes__input" type="text" placeholder="Título" value="${note.title}">
          <textarea class="create-notes__textarea" placeholder="Contenido">${note.content}</textarea>
          <button class="btn-secondary" type="button">Guardar cambios</button>
      `;
}
//Updates the edited note in the notes array
function updateNoteInList(updatedNote) {
    return notes.map((note) => (note.id === updatedNote.id ? updatedNote : note));
}

// Returns an alert if the character limit is exceeded
function checkCharacterLimit() {
    const maxLength = this.maxLength;
    const currentLength = this.value.length;
    if (currentLength === maxLength) {
        alert('Llegaste al máximo de caracteres permitidos en este campo.')
    }
}


noteForm.addEventListener("submit", handleCreateNote);
titleInput.addEventListener('input', checkCharacterLimit);
contentTextarea.addEventListener('input', checkCharacterLimit);

