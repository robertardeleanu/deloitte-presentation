import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders bookshelf heading', () => {
    render(<App />);
    expect(screen.getByText('Bookshelf')).toBeInTheDocument();
  });

  it('renders all books from mockup', () => {
    render(<App />);
    
    // Check for some book titles from the mockup
    expect(screen.getByText('The Great Gatsby - No image provided, but very long title to test the ellipsis')).toBeInTheDocument();
    expect(screen.getByText('To Kill a Mockingbird')).toBeInTheDocument();
    expect(screen.getByText('1984')).toBeInTheDocument();
  });

  it('renders New Book button', () => {
    render(<App />);
    expect(screen.getByText('New Book')).toBeInTheDocument();
  });

  it('adds a new book when New Book button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const newBookButton = screen.getByText('New Book');
    await user.click(newBookButton);
    
    // Should now have the new book - check for the description which is unique
    expect(screen.getByText('New Book Description')).toBeInTheDocument();
    
    // Verify there are now multiple "New Book" texts (button + new book title)
    const newBookTexts = screen.getAllByText('New Book');
    expect(newBookTexts.length).toBe(2); // Button + new book title
    
    // Should still have original books
    expect(screen.getByText('The Great Gatsby - No image provided, but very long title to test the ellipsis')).toBeInTheDocument();
  });

  it('can add multiple new books', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const newBookButton = screen.getByText('New Book');
    
    // Click multiple times
    await user.click(newBookButton);
    await user.click(newBookButton);
    await user.click(newBookButton);
    
    // Should have multiple "New Book" entries (though they'll have the same title)
    const newBooks = screen.getAllByText('New Book');
    expect(newBooks.length).toBeGreaterThan(1);
  });
});
