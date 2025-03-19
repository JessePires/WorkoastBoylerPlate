import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<'input'> & { lefticon?: React.JSX.Element; righticon?: React.JSX.Element }) {
  const [focus, setFocus] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setFocus(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`flex items-center rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] ${
        focus ? 'border-ring ring-ring/50 ring-[3px]' : ''
      }`}
    >
      {props.lefticon}
      <input
        type={type}
        data-slot="input"
        onFocus={() => setFocus(true)}
        className={cn(
          `${props.lefticon !== undefined ? 'ml-1' : ''} ${props.righticon !== undefined ? 'mr-1' : ''} file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {props.righticon}
    </div>
  );
}

export { Input };
