import { redirect } from "react-router-dom";
import { updateNote } from "../notes";
import type { EditActionArguments, EditFormData } from "../types/common-types";

export async function action({ request, params }: EditActionArguments) {
  const formData = await request.formData();
  const updates: EditFormData = Object.fromEntries(formData);
  if (!params.noteId) {
    throw new Response("", { status: 404, statusText: "Note not found" });
  }
  await updateNote(params.noteId, updates);
  return redirect(`/notes/${params.noteId}`);
}
