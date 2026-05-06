interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleProps<T extends string> {
  value: T;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
}

export function Toggle<T extends string>({ value, options, onChange }: ToggleProps<T>) {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-1">
      <div className="inline-flex min-w-max rounded-pill border border-neutral-line bg-white/5 p-1">
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              className={
                isActive
                  ? 'rounded-pill bg-white/10 px-2.5 py-2 text-xs font-semibold text-text-primary sm:px-3 sm:text-sm'
                  : 'rounded-pill px-2.5 py-2 text-xs text-text-tertiary transition hover:text-text-primary sm:px-3 sm:text-sm'
              }
              onClick={() => onChange(option.value)}
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
