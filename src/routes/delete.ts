import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteNote } from "../notes";

export async function action({ params }: ActionFunctionArgs) {
  if (params.noteId)
    await deleteNote(params.noteId);
  return redirect("/");
}
