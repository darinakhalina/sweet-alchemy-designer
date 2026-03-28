import { Link } from 'react-router-dom';
import type { PathInfoProps } from './interfaces/PathInfoProps';

const PathInfo = ({ pages }: PathInfoProps) => {
  return (
    <nav className="path-info">
      <ul className="path-info__list">
        {pages.map((page, index) => (
          <li key={page.path}>
            {index !== 0 && <span className="path-info__separator">/</span>}
            {index < pages.length - 1 ? (
              <Link to={page.path} className="path-info__link" viewTransition>
                {page.name}
              </Link>
            ) : (
              <span className="path-info__current">{page.name}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PathInfo;
