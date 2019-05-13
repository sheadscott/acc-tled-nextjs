import React from 'react';
import { render } from "react-testing-library";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import A from './A';

const linkOBject = {
  attr: "",
  classes: "",
  description: "",
  id: 1792,
  object: "page",
  object_id: 1067,
  object_slug: "about-tled",
  order: 1,
  parent: 0,
  target: "",
  title: "About TLED",
  type: "post_type",
  type_label: "Page",
  url: "https://instruction.austincc.edu/tled/about-tled/",
  xfn: "",
}

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

it("renders an anchor tag", () => {
  const { getByText } = render(<A href={'/test'}>Testing</A>);

  expect(getByText("Testing")).toBeInTheDocument();
  expect(getByText("Testing")).toHaveAttribute('href', '/test');

});

it("renders a router link", () => {
  const { getByText } = renderWithRouter(<A data={linkOBject}>{linkOBject.title}</A>);
  expect(getByText("About TLED")).toBeInTheDocument();
  expect(getByText("About TLED")).toHaveAttribute('href', '/about-tled');
});


