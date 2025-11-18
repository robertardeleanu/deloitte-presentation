import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Toggle from './index';

describe('Toggle', () => {
  it('renders as a button with up arrow when isOpen is true', () => {
    const onClick = vi.fn();
    render(<Toggle isOpen={true} onClick={onClick} />);
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-label', 'Show Less');
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAttribute('title', 'Show Less');
    expect(toggle.textContent).toContain('↑');
  });

  it('renders as a button with down arrow when isOpen is false', () => {
    const onClick = vi.fn();
    render(<Toggle isOpen={false} onClick={onClick} />);
    
    const toggle = screen.getByRole('button', { name: /show more/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-label', 'Show More');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('title', 'Show More');
    expect(toggle.textContent).toContain('↓');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Toggle isOpen={true} onClick={onClick} />);
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    await user.click(toggle);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Enter key is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Toggle isOpen={true} onClick={onClick} />);
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    toggle.focus();
    await user.keyboard('{Enter}');
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when Space key is pressed', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Toggle isOpen={true} onClick={onClick} />);
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    toggle.focus();
    await user.keyboard(' ');
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has type="button" to prevent form submission', () => {
    const onClick = vi.fn();
    render(<Toggle isOpen={true} onClick={onClick} />);
    
    const toggle = screen.getByRole('button', { name: /show less/i });
    expect(toggle).toHaveAttribute('type', 'button');
  });
});