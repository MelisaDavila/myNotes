/*
Store and retrieve notes from local storage
*/

export function getNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  return notes;
}

export function setNotesToLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

