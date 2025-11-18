import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Tile from './index';

describe('Tile', () => {
  it('renders title and description', () => {
    render(
      <Tile
        title="Test Book"
        description="Test Description"
      />
    );
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders image with provided imageUrl', () => {
    const imageUrl = 'https://example.com/image.jpg';
    render(
      <Tile
        title="Test Book"
        description="Test Description"
        imageUrl={imageUrl}
      />
    );
    
    const image = screen.getByAltText('Book cover for Test Book');
    expect(image).toHaveAttribute('src', imageUrl);
  });

  it('uses placeholder image when imageUrl is not provided', () => {
    render(
      <Tile
        title="Test Book"
        description="Test Description"
      />
    );
    
    const image = screen.getByAltText('Book cover for Test Book');
    expect(image).toHaveAttribute('src', 'https://placehold.co/400');
  });

  it('shows description by default', () => {
    render(
      <Tile
        title="Test Book"
        description="Test Description"
      />
    );
    
    const description = screen.getByText('Test Description');
    expect(description).toBeInTheDocument();
    expect(description.parentElement).toHaveClass('visible');
    expect(description.parentElement).toHaveAttribute('aria-hidden', 'false');
  });

  it('toggles description visibility when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Tile
        title="Test Book"
        description="Test Description"
      />
    );
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    const description = screen.getByText('Test Description');
    
    // Initially visible
    expect(description.parentElement).toHaveClass('visible');
    expect(description.parentElement).toHaveAttribute('aria-hidden', 'false');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    
    // Click to hide
    await user.click(toggle);
    expect(description.parentElement).toHaveClass('hidden');
    expect(description.parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('button', { name: /show more/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show more/i })).toHaveAttribute('aria-expanded', 'false');
    
    // Click to show again
    await user.click(screen.getByRole('button', { name: /show more/i }));
    expect(description.parentElement).toHaveClass('visible');
    expect(description.parentElement).toHaveAttribute('aria-hidden', 'false');
    expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show less/i })).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles image error and falls back to placeholder', async () => {
    const invalidImageUrl = 'https://invalid-url.com/image.jpg';
    render(
      <Tile
        title="Test Book"
        description="Test Description"
        imageUrl={invalidImageUrl}
      />
    );
    
    const image = screen.getByAltText('Book cover for Test Book');
    expect(image).toHaveAttribute('src', invalidImageUrl);
    
    // Simulate image error event
    const errorEvent = new Event('error', { bubbles: true });
    image.dispatchEvent(errorEvent);
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', 'https://placehold.co/400');
    });
  });

  it('toggle button is keyboard accessible', async () => {
    const user = userEvent.setup();
    render(
      <Tile
        title="Test Book"
        description="Test Description"
      />
    );
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    const description = screen.getByText('Test Description');
    
    // Initially visible
    expect(description.parentElement).toHaveClass('visible');
    
    // Use keyboard to toggle
    toggle.focus();
    await user.keyboard('{Enter}');
    
    expect(description.parentElement).toHaveClass('hidden');
  });
});