import React from "react";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
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
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
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
  onValueChange,
  onOpenChange,
  dependsOnValue,
}) => {
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
        } top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10`}
      />
      <Select
        value={value}
        onValueChange={onValueChange}
        onOpenChange={onOpenChange}
        disabled={disabled}
        required={required}
      >
        <SelectTrigger
          className={`w-full ${
            iconPosition === "left" ? "pl-10" : "pr-10"
          } ${selectClassName}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {visibleOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const selectWithoutIcon = (
    <Select
      value={value}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
      disabled={disabled}
      required={required}
    >
      <SelectTrigger className={`w-full ${selectClassName}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {visibleOptions.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className={`${className}`}>
      <span className="label-title">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {Icon ? selectWithIcon : selectWithoutIcon}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};
