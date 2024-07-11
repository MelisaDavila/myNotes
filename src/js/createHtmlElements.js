import { handleEditNote, handleDeleteNote } from "./notes.js";


// Create the html element with the components of a saved note
export function createNoteElement(note) {
  const noteElement = document.createElement("div");
  noteElement.classList.add("notes__item");
  noteElement.id = note.id;
  noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <span>${note.content}</span>
      <div class="item__buttons">
        <button class="btn-secondary edit-button">Editar</button>
        <button class="btn-secondary delete-button">Eliminar</button>
      </div>
  `;

  const editButton = noteElement.querySelector(".edit-button");
  editButton && editButton.addEventListener("click", () => handleEditNote(note.id));

  const deleteButton = noteElement.querySelector(".delete-button");
  deleteButton && deleteButton.addEventListener("click", () => handleDeleteNote(note.id));

  return noteElement;
}

//Create the html element that allows editing the note
export function createEditElement(element, note) {
  element.innerHTML = `
        <input class="create-notes__input" type="text" placeholder="Título" value="${note.title}">
        <textarea class="create-notes__textarea" placeholder="Contenido">${note.content.replace(/<br>/g, '\n')}</textarea>
        <button class="btn-secondary" type="button">Guardar cambios</button>
    `;
}