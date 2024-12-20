import { defineStore } from 'pinia';
import useLocalStorage from '@/hooks/useLocalStorage';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
    undoStack: [],
    redoStack: [],
  }),
  actions: {

    async init() {
      if (typeof window !== 'undefined') {
        const { data: storedNotes, save } = useLocalStorage('notes', []);
        this.notes = storedNotes;
        this.save = save;
      }
    },

    addNote(note) {
      this.notes.push({ ...note, id: note.id || Date.now().toString() });
      this.save(this.notes);
    },

    editNote(noteId, updatedNote) {
      const index = this.notes.findIndex((n) => n.id === noteId);
      if (index !== -1) {
        this.notes[index] = { ...updatedNote, id: noteId };
        this.save(this.notes);
      }
    },

    deleteNote(noteId) {
      this.notes = this.notes.filter((n) => n.id !== noteId);
      this.save(this.notes);
    },

    undo() {
      if (this.undoStack.length > 0) {
        const prevState = this.undoStack.pop();
        this.redoStack.push(JSON.stringify(this.notes));
        this.notes = JSON.parse(prevState);
        this.save(this.notes);
      }
    },

    redo() {
      if (this.redoStack.length > 0) {
        const nextState = this.redoStack.pop();
        this.undoStack.push(JSON.stringify(this.notes));
        this.notes = JSON.parse(nextState);
        this.save(this.notes);
      }
    },
  },
});
