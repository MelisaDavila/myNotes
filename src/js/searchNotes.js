/*
Filter notes based on search content, and render corresponding notes
*/

import { notes } from './notes.js';
import { createNoteElement } from './createNoteElement.js';
const notesList = document.getElementById("notes-list");

export function searchNotes(searchTerm) {
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()));
    notesList.innerHTML = "";
    filteredNotes.forEach(note => notesList.appendChild(createNoteElement(note)));
}