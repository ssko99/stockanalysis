import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { Note } from './note';

@Component({
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  pageTitle: string = 'Research Note';
  currentNote: Note;
  errorMessage: string;
  notes: Array<Note>;
  public maxRating: number = 10;
  public isReadonly: boolean = false;

  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotes()
      .then((notes) => {
        this.notes = notes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  selectNote(note: Note) {
    this.currentNote = note;
  }

  createNewNote() {
    this.currentNote = {
      ticker: '', buysell: '', target: 0, rating: 0, entryDate: '', description: ''
    }
  };

  createNote() {
    //console.log(this.currentNote);
    this.noteService.createNote(this.currentNote).then((newNote) => {
      this.notes.push(newNote);
      this.currentNote = null;
      this.errorMessage = 'A Note has been Created';
    })
      .catch((err) => {
        this.errorMessage = 'An error has occured.';
        console.log(err);
      });
    return false;
  }

  updateNote() {
  //  console.log(this.currentNote);
    this.noteService.updateNote(this.currentNote)
      .then((updatedNote) => {
        let index = this.notes.findIndex((note) => {
          return note._id === updatedNote._id;
        });
        if (index >= 0)
          this.notes[index] = updatedNote;
        this.errorMessage = 'A Note has been Updated';
        this.currentNote = null;
      })
      .catch((err) => {
        this.errorMessage = 'An error has occured.';
        console.log(err);
      });
    return false;
  }

  deleteNote() {
    let index = this.notes.findIndex((note) => {
      return note._id === this.currentNote._id;
    });
    this.noteService.deleteNote(this.currentNote._id)
      .then((deleteId) => {
        if (index >= 0)
          this.notes.splice(index, 1);
        this.currentNote = null;
        this.errorMessage = 'A Note has been Deleted';
      })
      .catch((err) => {
        this.errorMessage = 'An error has occured.';
        console.log(err);
      });
    return false;
  }
}

