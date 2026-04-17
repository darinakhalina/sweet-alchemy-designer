import { Children, isValidElement, cloneElement } from 'react';
import clsx from 'clsx';
import type { AnimatedListProps } from './interfaces/AnimatedListProps';

const AnimatedList = ({
  children,
  staggerDelay = 100,
  className,
  ...rest
}: AnimatedListProps) => {
  return (
    <div className={clsx('animated-list', className)} data-testid="animated-list" {...rest}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          className: clsx(
            (child.props as Record<string, unknown>).className as string | undefined,
            'animated-list__item',
          ),
          style: {
            ...((child.props as Record<string, unknown>).style as React.CSSProperties | undefined),
            '--item-index': index,
            '--stagger-delay': `${staggerDelay}ms`,
          } as React.CSSProperties,
        });
      })}
    </div>
  );
};

export default AnimatedList;
