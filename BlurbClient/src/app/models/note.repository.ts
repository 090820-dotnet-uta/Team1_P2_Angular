import { Injectable, OnInit } from "@angular/core";
import { Note } from "./note.model";
import { NoteService } from "../services/note.service";

@Injectable()
export class NoteRepository implements OnInit {
  private notes: Note[] = [];
  private note: Note;

  constructor(private rest: NoteService){
    this.rest.getNotes().subscribe((data: any) => {
      this.notes = data;
    });
    this.rest.getNote().subscribe((data:any) => {
      this.note = data;
    })
  }

  ngOnInit() {

  }
  getNote(): Note {
    return this.note;
  }

  getNotes(): Note[] {
    return this.notes;
  }

}