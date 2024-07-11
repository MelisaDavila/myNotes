import { notes } from './notes.js';
import { createNoteElement } from './createHtmlElements.js';

const notesList = document.getElementById("notes-list");

// Add or remove span if no notes exist
export function existNotes() {
    const span = document.querySelector(".span-empty-notes");
    if (notes.length > 0 && span) {
        notesList.removeChild(span);
    } else if (notes.length == 0) {
        const newSpan = document.createElement("span");
        newSpan.classList.add("span-empty-notes");
        newSpan.textContent = "No hay notas guardadas";
        notesList.appendChild(newSpan);
    }
}

// Returns an alert if the character limit is exceeded
export function checkCharacterLimit() {
    const maxLength = this.maxLength;
    const currentLength = this.value.length;
    if (currentLength === maxLength) {
        alert('Llegaste al máximo de caracteres permitidos en este campo.')
    }
}

//Filter notes based on search content, and render corresponding notes
export function searchNotes(searchTerm) {
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()));
    notesList.innerHTML = "";
    filteredNotes.forEach(note => notesList.appendChild(createNoteElement(note)));
}



