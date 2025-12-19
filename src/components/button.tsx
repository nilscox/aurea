import { cva, VariantProps } from 'class-variance-authority';

export function Button({
  className,
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof button>) {
  return <button type="button" className={button({ className, ...props })} {...props} />;
}

const button = cva('rounded-md font-semibold', {
  variants: {
    variant: {
      solid: 'bg-slate-700 text-white disabled:bg-slate-500 disabled:text-slate-300',
      outline: 'border disabled:text-slate-400 disabled:border-slate-200',
    },
    size: {
      1: 'py-1 px-2 text-sm',
      2: 'py-2 px-3',
      3: 'py-3 px-5 text-lg',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 2,
  },
});
