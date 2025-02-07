import { Form } from "react-router-dom";
import EditNote from "./edit-note-element";
import useIsEditSearchParams from "../hooks/use-edit-search-params";
import { useCallback } from "react";
import type { Note } from "../types/common-types";

export default function Note({ note }: { note: Note }) {
  const [isEdit, toggleEdit] = useIsEditSearchParams();

  const handleOnClickEdit = useCallback(
    function handleOnClickEdit() {
      toggleEdit(isEdit);
    },
    [isEdit, toggleEdit]
  );

  return (
    <>
      {isEdit ? (
        <EditNote
          editModeTuggle={handleOnClickEdit}
          header={note.header}
          description={note.description}
        />
      ) : (
        <div id="note">
          <div className="buttons-block">
            <button onClick={handleOnClickEdit}>Edit</button>
            <Form
              method="post"
              action="delete"
              onSubmit={(e) => {
                if (!confirm("Вы точно хотите удалить эту заметку?")) {
                  e.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
          <div className="content-div">
            <h1>{note.header ? note.header : <i>Unnamed</i>}</h1>
            {note.description && <p>{note.description}</p>}
          </div>
        </div>
      )}
    </>
  );
}
