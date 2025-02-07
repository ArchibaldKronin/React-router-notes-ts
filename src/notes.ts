import localforage from "localforage";
import { matchSorter } from "match-sorter";
import type { EditFormData, Note } from "./types/common-types"
import sortBy from "sort-by";

type FakeNetwork = (key?: string) => Promise<void>;
type FakeCache = Record<string, boolean>;
type NoteId = Note["id"];

export async function getNotes(query?: string) {
  await fakeNetwork(`getNotes:${query}`);
  let notes = await localforage.getItem<Note[]>("notes") ?? [];
  if (query) {
    notes = matchSorter(notes, query, { keys: ["header", "description"] });
  }
  return notes.sort(sortBy("header", "createdAt"));
}

export async function getNote(id: NoteId) {
  await fakeNetwork(`note:${id}`);
  let notes = await localforage.getItem<Note[]>("notes") ?? [];
  let note = notes.find((note) => note.id === id);
  return note ?? null;
}

export async function createNote() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let note: Note = { id, createdAt: Date.now() };
  let notes = await getNotes();
  notes.unshift(note);
  await set(notes);
  return note;
}

export async function updateNote(id: NoteId, updates: EditFormData) {
  await fakeNetwork();
  let notes = await localforage.getItem<Note[]>("notes") ?? [];
  const note: Note | undefined = notes.find((note) => note.id === id);
  if (!note) throw new Error(`No contact found for ${id}`);
  Object.assign(note, updates);
  await set(notes);
  return note;
}

export async function deleteNote(id: NoteId) {
  let notes = await localforage.getItem<Note[]>("notes") ?? [];
  let index = notes.findIndex((note) => note.id === id);
  if (index > -1) {
    notes.splice(index, 1);
    await set(notes);
    return true;
  }
  return false;
}

function set(notes: Note[]) {
  return localforage.setItem("notes", notes);
}

let fakeCache: FakeCache = {};

const fakeNetwork: FakeNetwork = async (key?) => {
  if (key === undefined) {
    fakeCache = {};
  }

  if (key !== undefined) {
    if (fakeCache[key]) {
      return Promise.resolve();
    }

    fakeCache[key] = true;
    return new Promise((res) => {
      setTimeout(res, Math.random() * 800);
    });
  }
}
