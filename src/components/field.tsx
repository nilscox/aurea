type Field<T> = {
  name: string;
  state: { value?: T };
  handleBlur: React.FocusEventHandler;
  handleChange: (value: T | ((value: T) => T)) => void;
};

type AnyField = Field<any>;

type FieldProps = {
  name: string;
  label?: React.ReactNode;
  children: React.ReactNode;
};

export function Field({ name, label, children }: FieldProps) {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="text-sm font-medium mb-2">
          {label}
        </label>
      )}

      {children}
    </div>
  );
}

export function InlineField({
  name,
  label,
  children,
}: {
  name: string;
  label?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="row gap-1 items-center">
      {children}
      {label && <label htmlFor={name}>{label}</label>}
    </div>
  );
}

export function fieldProps(field: AnyField) {
  return {
    id: field.name,
    name: field.name,
    onBlur: field.handleBlur,
  };
}

export function textFieldProps(field: Field<string>) {
  return {
    ...fieldProps(field),
    value: field.state.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value),
  };
}

export function numberFieldProps(field: Field<number>) {
  return {
    ...fieldProps(field),
    value: field.state.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.valueAsNumber),
  };
}

export function checkboxFieldProps(field: Field<boolean>) {
  return {
    ...fieldProps(field),
    value: field.state.value || false,
    onChange: () => field.handleChange((value) => !value),
  };
}
