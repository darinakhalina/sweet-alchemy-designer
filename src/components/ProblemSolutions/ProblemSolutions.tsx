import { useTranslation } from 'react-i18next';
import Icon from '@/components/Icon';
import { PROBLEM_SOLUTION_PAIRS } from './constants/problemSolutionPairs';

interface CardProps {
  icon: string;
  title: string;
  description: string;
}

function Card({ icon, title, description }: CardProps) {
  return (
    <div className="problem-solutions__card">
      <Icon name={icon} size="lg" className="problem-solutions__card-icon" />
      <h3 className="problem-solutions__card-title h2">{title}</h3>
      <p className="problem-solutions__card-description text-sm-bold">{description}</p>
    </div>
  );
}

const ProblemSolutions = () => {
  const { t } = useTranslation();

  return (
    <section className="problem-solutions" data-testid="problem-solutions">
      <ul className="row row--center row--gap-md problem-solutions__list">
        {PROBLEM_SOLUTION_PAIRS.map((pair) => (
          <li key={pair.id} className="col-12 col-md-6 col-lg-4">
            <article className="problem-solutions__pair">
              <Card
                icon={pair.problemIcon}
                title={t(`pages.home.problemSolutions.${pair.id}.problem.title`)}
                description={t(`pages.home.problemSolutions.${pair.id}.problem.description`)}
              />
              <Icon
                name="icon-arrow-section"
                size="lg"
                className="problem-solutions__arrow"
              />
              <Card
                icon={pair.solutionIcon}
                title={t(`pages.home.problemSolutions.${pair.id}.solution.title`)}
                description={t(`pages.home.problemSolutions.${pair.id}.solution.description`)}
              />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProblemSolutions;
