import { render, screen } from '@testing-library/react';
import ProblemSolutions from '@/components/ProblemSolutions';

describe('ProblemSolutions', () => {
  it('renders the section root', () => {
    render(<ProblemSolutions />);
    expect(screen.getByTestId('problem-solutions')).toBeInTheDocument();
  });

  it('renders exactly 3 pairs as list items', () => {
    const { container } = render(<ProblemSolutions />);
    const items = container.querySelectorAll('.problem-solutions__list > li');
    expect(items).toHaveLength(3);
  });

  it('renders both problem and solution titles for each pair', () => {
    render(<ProblemSolutions />);
    expect(screen.getByText('pages.home.problemSolutions.recipeSearch.problem.title')).toBeInTheDocument();
    expect(screen.getByText('pages.home.problemSolutions.recipeSearch.solution.title')).toBeInTheDocument();
    expect(screen.getByText('pages.home.problemSolutions.shapeChange.problem.title')).toBeInTheDocument();
    expect(screen.getByText('pages.home.problemSolutions.shapeChange.solution.title')).toBeInTheDocument();
    expect(screen.getByText('pages.home.problemSolutions.profitLoss.problem.title')).toBeInTheDocument();
    expect(screen.getByText('pages.home.problemSolutions.profitLoss.solution.title')).toBeInTheDocument();
  });

  it('renders 6 cards and 3 arrow icons (one per pair)', () => {
    const { container } = render(<ProblemSolutions />);
    const cards = container.querySelectorAll('.problem-solutions__card');
    expect(cards).toHaveLength(6);
    const arrows = container.querySelectorAll('.problem-solutions__arrow');
    expect(arrows).toHaveLength(3);
  });
});
