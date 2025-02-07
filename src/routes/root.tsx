import {
  Form,
  LoaderFunctionArgs,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { createNote, getNotes } from "../notes";
import { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? undefined;
  const notes = await getNotes(q);
  return { notes, q };
}

export async function action() {
  const note = await createNote();
  return redirect(`notes/${note.id}?edit=1`);
}

type LoaderData = Awaited<ReturnType<typeof loader>>;

export default function Root() {
  const { notes, q } = useLoaderData<LoaderData>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const location = useLocation();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchInput = document.querySelector("#q") as HTMLInputElement;
    if (searchInput) {
      searchInput.value = q ?? "";
    }
  }, [q]);

  function getIsLoadingNote() {
    const state = navigation.state;
    const location = navigation.location;
    if (state === "loading" && location?.pathname !== "/") return true;
    return false;
  }

  function getIsToShowFooter() {
    if (location.pathname === "/") return true;
    return false;
  }

  return (
    <>
      <Header>Your Notes</Header>
      <div>
        <div id="sidebar">
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                className={searching ? "loading" : ""}
                aria-label="Search notes"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q}
                onChange={(e) => {
                  const isFirstSearching = q === null;
                  submit(e.currentTarget.form, { replace: !isFirstSearching });
                }}
              ></input>
              <div id="search-spinner" aria-hidden hidden={!searching} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {notes.length ? (
              <ul>
                {notes.map((note) => (
                  <li key={note.id}>
                    <NavLink
                      to={`notes/${note.id}`}
                      className={({ isActive, isPending }) =>
                        isActive ? "active" : isPending ? "pending" : ""
                      }
                    >
                      <span>
                        {" "}
                        {note.header ? <>{note.header}</> : <i>Unnamed</i>}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No notes</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          {getIsLoadingNote() ? <div id="loading-spinner"></div> : <Outlet />}
        </div>
      </div>
      {getIsToShowFooter() && <Footer />}
    </>
  );
}
