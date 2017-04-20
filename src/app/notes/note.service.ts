import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import { Note } from './note';

@Injectable()
export class NoteService {
  private notesUrl = '/api/notes';
  constructor(private http: Http) { }

  getNotes(): Promise<Note[]> {
    return this.http.get(this.notesUrl)
      .map((response: Response) => response.json() as Note[])
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }

  createNote(newNote): Promise<Note> {
    return this.http.post(this.notesUrl, newNote)
      .map((response: Response) => response.json() as Note)
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }

  deleteNote(delNoteId: String): Promise<String> {
    return this.http.delete(this.notesUrl + '/' + delNoteId)
      .map((response: Response) => response.json() as String)
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }

  // put("/api/contacts/:id")
  updateNote(putNote: Note): Promise<Note> {
    var putUrl = this.notesUrl + '/' + putNote._id;
    return this.http.put(putUrl , putNote)
      .map((response: Response) => response.json() as Note)
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }
}
