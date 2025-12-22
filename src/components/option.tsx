import clsx from 'clsx';

type OptionProps = React.ComponentProps<'button'> & {
  didAnswer: boolean;
  isSelected: boolean;
  isCorrect: boolean;
};
export function Option({ didAnswer, isSelected, isCorrect, className, ...props }: OptionProps) {
  return (
    <button
      type="button"
      className={clsx(
        className,
        'capitalize text-center ring-slate-400 rounded-md font-semibold border py-2 px-3',
        'disabled:text-slate-400 disabled:border-slate-200',
        {
          'ring-2': isSelected,
          'ring-green-600! ring-2 bg-green-100!': didAnswer && isCorrect,
          'ring-red-600!': didAnswer && !isCorrect,
        },
      )}
      {...props}
    />
  );
}
