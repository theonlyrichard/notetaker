var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
var activeNote = {};

// A function for getting all notes from the db
var getNotes = function () {
    return $.ajax({
        url: "/api/notes",
        method: "GET"
    });
};

// A function for saving a note to the db
var saveNote = function (note) {
    return $.ajax({
        url: "/api/notes",
        data: note,
        method: "POST"
    });
};

var handleNoteView = function () {
    activeNote = $(this).data();
    renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
var handleNewNoteView = function () {
    activeNote = {};
    renderActiveNote();
};

var handleRenderSaveBtn = function () {
    if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
        $saveNoteBtn.hide();
    } else {
        $saveNoteBtn.show();
    }
};

var renderNoteList = function (notes) {
    $noteList.empty();

    var noteListItems = [];

    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];

        var $li = $("<li class='list-group-item'>").data(note);
        var $span = $("<span>").text(note.title);
        var $delBtn = $(
            "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
        );

        $li.append($span, $delBtn);
        noteListItems.push($li);
    }

    $noteList.append(noteListItems);
};

var getAndRenderNotes = function () {
    return getNotes().then(function (data) {
        renderNoteList(data);
    });
};

$saveNoteBtn.on("click", handleNoteSave);
$noteList.on("click", ".list-group-item", handleNoteView);
$newNoteBtn.on("click", handleNewNoteView);
$noteList.on("click", ".delete-note", handleNoteDelete);
$noteTitle.on("keyup", handleRenderSaveBtn);
$noteText.on("keyup", handleRenderSaveBtn);

getAndRenderNotes();
