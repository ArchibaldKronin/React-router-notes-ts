import React from "react";
import { Form } from "react-router-dom";

type Props = {
  editModeTuggle: () => void;
  header: string;
  description: string;
};

const EditNote = React.memo(function EditNote({
  editModeTuggle,
  header,
  description,
}: Props) {
  return (
    <>
      <div className="buttons-block">
        <button type="submit" form="note-form">
          Save
        </button>
        <button id="cancel" onClick={editModeTuggle}>
          Cancel
        </button>
      </div>
      <Form method="post" id="note-form" action="edit">
        <div>
          {" "}
          <label>
            <span>Header</span>
            <input
              placeholder="Your note"
              type="text"
              name="header"
              defaultValue={header}
            />
          </label>
        </div>
        <div>
          {" "}
          <label>
            <span>Description</span>
            <textarea
              placeholder="Describe your note"
              name="description"
              rows={6}
              defaultValue={description}
            />
          </label>
        </div>
      </Form>
    </>
  );
});

export default EditNote;
