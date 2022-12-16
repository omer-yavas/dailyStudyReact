import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('test submit button', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'JavaScript' },
  });

  const submitButton = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitButton);

  const anyItem = screen.getByRole('article');

  expect(anyItem.textContent).toBe('JavaScript');
});

test('test clear all button', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('textbox', { target: { value: 'milk' } }));
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  const marketContainer = screen.getByTestId('marketContainer');

  const clearItemsButton = screen.getByRole('button', { name: /clear items/i });
  fireEvent.click(clearItemsButton);

  expect(marketContainer).not.toBeInTheDocument();
});

test('list item delete button test', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'milk' } });
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  const listItem = screen.getByRole('article');
  expect(listItem).toBeInTheDocument();

  const itemDeleteButton = screen.getByTestId('delete');
  fireEvent.click(itemDeleteButton);

  expect(listItem).not.toBeInTheDocument();
});

test('list item edit button test', () => {
  render(<App />);

  fireEvent.change(screen.getByRole('textbox'), {
    target: { value: 'butter' },
  });
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);

  const itemEditButton = screen.getByTestId('edit');
  fireEvent.click(itemEditButton);

  expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();

  const input = screen.getByDisplayValue('butter');
  expect(input).toBeInTheDocument();
});
