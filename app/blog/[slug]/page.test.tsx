/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientPage from './client-page';

jest.mock('next/navigation', () => ({
  useParams: () => ({
    slug: 'test-post',
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe('Blog Page', () => {
  it('renders blog page', () => {
    const { container } = render(<ClientPage params={{ slug: 'test-post' }} />);

    expect(container).toHaveTextContent('Slug: test-post');
  });
});
