import { createNoteElement } from "./createHtmlElements.js";
import { notes, isEditing, isEmpty } from "./notes.js";
import { existNotes, searchNotes } from "./utilities.js";

/*
    It is responsible for starting the application and listening to general application events.
*/

const notesList = document.getElementById("notes-list");
const inputSearch = document.getElementById("search-input");
const titleInput = document.getElementById("title-note");
const contentTextarea = document.getElementById("content-note");

function startAplication() {
    existNotes();
    notes.forEach((note) => notesList.appendChild(createNoteElement(note)));
}

inputSearch.addEventListener("input", (e) => searchNotes(e.target.value));
window.addEventListener("beforeunload", (event) => { isEditing && event.preventDefault(); });
titleInput.addEventListener("input", isEmpty);
contentTextarea.addEventListener("input", isEmpty);

startAplication();

