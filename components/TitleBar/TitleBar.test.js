import React from 'react';
import { render } from 'react-testing-library'
import { BrowserRouter as Router } from 'react-router-dom';

import TitleBar from './TitleBar';

const titleBarItems = [{
  id: 1,
  title: 'Item One',
  slug: 'item-one',
},
{
  id: 2,
  title: 'Item Two',
  slug: 'item-two',
},
{
  id: 3,
  title: 'Item Three',
  slug: 'item-three',
}];

test('get a list of titlebar nav items from WordPress', async () => {

  const { getByText } = render(<Router><TitleBar titleBarItems={titleBarItems} /></Router>);

  expect(getByText('Item One')).toBeTruthy();
  expect(getByText('Item Two')).toBeTruthy();
  expect(getByText('Item Three')).toBeTruthy();
});
