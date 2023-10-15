import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import { getSaveElement } from '@wordpress/blocks';
import Save from '../save';

const attributes = {
  postID: '1',
  title: 'Test Title',
  link: 'https://example.com'
}

describe("Save componet", () => {
  afterEach(cleanup);
  //It handles having no saved attribute
  it("matches snapshot with value attribute empty", () => {
    getSaveElement({ name: 'my-block-name', save: Save } as any, {});

    expect(
      render(
        <Save
          attributes={{}}
          className="wp-blocks-whatever"
        />
      )
    ).toMatchSnapshot();
  });
  //Does it render correctly when attribute has value?
  it("matches snapshot with provided attribute", () => {
    getSaveElement({ name: 'my-block-name', save: Save } as any, attributes);

    expect(
      render(
        <Save
          attributes={attributes}
          className="wp-blocks-whatever"
        />
      )
    ).toMatchSnapshot();
  });
});