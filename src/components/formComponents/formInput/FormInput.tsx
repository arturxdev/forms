import React, { forwardRef } from "react";
import { Input } from "../../ui/input";
import { LucideIcon } from "lucide-react";

export interface FormInputProps {
  name?: string;
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

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
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
      ...props
    },
    ref
  ) => {
    const inputWithIcon = Icon && (
      <div className="relative">
        <Icon
          className={`absolute ${
            iconPosition === "left" ? "left-3" : "right-3"
          } top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`}
        />
        <Input
          ref={ref}
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
          } ${inputClassName}`}
          {...props}
        />
      </div>
    );

    const inputWithoutIcon = (
      <Input
        ref={ref}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={inputClassName}
        {...props}
      />
    );

    return (
      <div className={`space-y-2 ${className}`}>
        <span className={labelClassName}>
          {label} {required && <span className="text-destructive">*</span>}
        </span>
        {Icon ? inputWithIcon : inputWithoutIcon}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
