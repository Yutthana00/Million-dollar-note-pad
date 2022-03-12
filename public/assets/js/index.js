const $noteTitle = $(".note-title");
const $noteText = $(".note-textarea");
const $saveNoteBtn = $(".save-note");
const $newNoteBtn = $(".new-note");
const $noteList = $ (".list-container .list-grounp");

let activeNote = {};

const getNotes = () => {
    return $.ajax({
        url:"/api/notes",
    });
};

const 