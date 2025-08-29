import React from "react";
import { Label } from "../../ui/label";
import { LucideIcon } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  // Si está presente, la opción solo aparece cuando el valor dependiente coincide
  if?: string[];
}

export interface FormSelectProps {
  id: string;
  name: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  // Valor externo que controla la visibilidad de opciones con `if`
  dependsOnValue?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  id,
  name,
  label,
  options,
  placeholder,
  required = false,
  disabled = false,
  className = "",
  selectClassName = "",
  labelClassName = "",
  icon: Icon,
  iconPosition = "left",
  error,
  value,
  onChange,
  onBlur,
  onFocus,
  dependsOnValue,
}) => {
  const defaultSelectClasses =
    "w-full rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 appearance-none cursor-pointer";
  const defaultLabelClasses = "label-title";

  const finalSelectClasses =
    `${defaultSelectClasses} ${selectClassName}`.trim();
  const finalLabelClasses = `${defaultLabelClasses} ${labelClassName}`.trim();

  const visibleOptions = React.useMemo(() => {
    return options.filter((option) => {
      if (!option.if || option.if.length === 0) return true;
      if (dependsOnValue === undefined || dependsOnValue === null) return false;
      return option.if.includes(dependsOnValue);
    });
  }, [options, dependsOnValue]);

  const selectWithIcon = Icon && (
    <div className="relative">
      <Icon
        className={`absolute ${
          iconPosition === "left" ? "left-3" : "right-3"
        } top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400`}
      />
      <select
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`${
          iconPosition === "left" ? "pl-10 pr-10" : "pl-10 pr-10"
        } py-2.5 ${finalSelectClasses}`}
        style={{ paddingLeft: iconPosition === "left" ? "2.5rem" : "0.625rem" }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {visibleOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {/* Flecha personalizada */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  const selectWithoutIcon = (
    <div className="relative">
      <select
        id={id}
        name={name}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`py-2.5 pr-10 pl-3 ${finalSelectClasses}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {visibleOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {/* Flecha personalizada */}
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-zinc-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className={finalLabelClasses}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {Icon ? selectWithIcon : selectWithoutIcon}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
