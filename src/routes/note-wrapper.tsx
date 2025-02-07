import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import Note from "../components/note";
import { getNote } from "../notes";

export default function NoteWrapper() {
  const { note } = useLoaderData();

  return <Note key={note.id} note={note} />;
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.noteId) {
    throw new Response("", { status: 404, statusText: "Note not found" });
  }
  const note = await getNote(params.noteId);
  if (!note) {
    throw new Response("", { status: 404, statusText: "Note not found" });
  }
  return { note };
}
