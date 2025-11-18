import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Container from './index';

describe('Container', () => {
  it('renders heading', () => {
    render(
      <Container heading="Test Heading">
        <div>Test Content</div>
      </Container>
    );
    
    const heading = screen.getByRole('heading', { name: 'Test Heading', level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Container heading="Test Heading">
        <div>Test Content</div>
      </Container>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders actions when provided', () => {
    render(
      <Container heading="Test Heading" actions={<button>Action Button</button>}>
        <div>Test Content</div>
      </Container>
    );
    
    expect(screen.getByText('Action Button')).toBeInTheDocument();
    const actionButton = screen.getByRole('button', { name: 'Action Button' });
    expect(actionButton).toBeInTheDocument();
  });

  it('does not render actions when not provided', () => {
    render(
      <Container heading="Test Heading">
        <div>Test Content</div>
      </Container>
    );
    
    const actionsContainer = screen.queryByRole('button');
    expect(actionsContainer).not.toBeInTheDocument();
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(
      <Container heading="Test Heading" actions={<button>Action</button>}>
        <div>Test Content</div>
      </Container>
    );
    
    // Check for header element (if you implement the semantic HTML improvement)
    const header = container.querySelector('header');
    const main = container.querySelector('main');
    
    // These will be null if semantic HTML isn't implemented yet
    // Uncomment when semantic HTML is added:
    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
  });
});