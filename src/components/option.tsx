import clsx from 'clsx';

import { Button } from './button';

type OptionProps = React.ComponentProps<'button'> & {
  didAnswer: boolean;
  isSelected: boolean;
  isCorrect: boolean;
};
export function Option({ didAnswer, isSelected, isCorrect, className, ...props }: OptionProps) {
  return (
    <Button
      variant="outline"
      className={clsx(className, 'capitalize text-center ring-slate-400', {
        'ring-2': isSelected,
        'ring-green-600! ring-2 bg-green-100!': didAnswer && isCorrect,
        'ring-red-600!': didAnswer && !isCorrect,
      })}
      {...props}
    />
  );
}
