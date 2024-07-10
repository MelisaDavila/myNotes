/*
Store and retrieve notes from local storage
*/

export function getNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  return notes;
}

export function getCounterFromLocalStorage() {
  const count = JSON.parse(localStorage.getItem("count")) || 0;
  return count;
}

export function setNotesToLocalStorage(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function setCounterToLocalStorage(counter) {
  localStorage.setItem("count", JSON.stringify(counter));
}

