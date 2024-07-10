import { createNoteElement } from "./createNoteElement.js";
import { notes, isEditing, existNotes } from "./notes.js";
import { searchNotes } from "./searchNotes.js";

/*
    It is responsible for starting the application and listening to general application events.
*/

const notesList = document.getElementById("notes-list");
const inputSearch = document.getElementById("search-input");

function startAplication() {
    existNotes();
    notes.forEach((note) => notesList.appendChild(createNoteElement(note)));
}

window.addEventListener("beforeunload", (event) => { isEditing && event.preventDefault(); });
inputSearch.addEventListener("input", (e) => searchNotes(e.target.value));
startAplication();

