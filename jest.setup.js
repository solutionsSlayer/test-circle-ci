// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch'; // Polyfill pour Fetch API
import { act } from '@testing-library/react';

// Suppress act() warnings
global.IS_REACT_ACT_ENVIRONMENT = true;

// Mock next/head
jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([]),
  })
);

// Helper to suppress act() warnings
global.asyncAct = async callback => {
  await act(async () => {
    await callback();
  });
};
