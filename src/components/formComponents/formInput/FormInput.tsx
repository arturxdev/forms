import React from "react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { LucideIcon } from "lucide-react";

export interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "password" | "number" | "url";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  labelClassName = "",
  icon: Icon,
  iconPosition = "left",
  error,
  value,
  onChange,
  onBlur,
  onFocus,
}) => {
  const defaultInputClasses =
    "rounded-xl border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400";
  const defaultLabelClasses = "text-zinc-800";

  const finalInputClasses = `${defaultInputClasses} ${inputClassName}`.trim();
  const finalLabelClasses = `${defaultLabelClasses} ${labelClassName}`.trim();

  const inputWithIcon = Icon && (
    <div className="relative">
      <Icon
        className={`absolute ${
          iconPosition === "left" ? "left-3" : "right-3"
        } top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400`}
      />
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`${
          iconPosition === "left" ? "pl-10" : "pr-10"
        } ${finalInputClasses}`}
      />
    </div>
  );

  const inputWithoutIcon = (
    <Input
      id={id}
      name={name}
      type={type}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      className={finalInputClasses}
    />
  );

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className={finalLabelClasses}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {Icon ? inputWithIcon : inputWithoutIcon}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}; 