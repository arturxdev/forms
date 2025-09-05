"use client";

import * as React from "react";
import { forwardRef } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface FormDatePickerProps {
  id?: string;
  name?: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  labelClassName?: string;
  error?: string;
  value?: Date | string;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  // Props para integración con react-hook-form
  registerProps?: {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    name: string;
    ref: React.Ref<HTMLInputElement>;
  };
}

export const FormDatePicker = forwardRef<
  HTMLButtonElement,
  FormDatePickerProps
>(
  (
    {
      id,
      name,
      label,
      placeholder = "Selecciona una fecha",
      required = false,
      disabled = false,
      className = "",
      buttonClassName = "",
      labelClassName = "",
      error,
      value,
      onChange,
      onBlur,
      onFocus,
      registerProps,
      ...props
    },
    ref
  ) => {
    const [date, setDate] = React.useState<Date | undefined>(() => {
      if (typeof value === "string" && value) {
        return new Date(value);
      }
      return value as Date | undefined;
    });
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
      if (typeof value === "string" && value) {
        setDate(new Date(value));
      } else {
        setDate(value as Date | undefined);
      }
    }, [value]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      onChange?.(selectedDate);

      // Si hay registerProps, sincronizar con react-hook-form
      if (registerProps && selectedDate) {
        const syntheticEvent = {
          target: { value: selectedDate.toISOString().split("T")[0] },
          type: "change",
        } as React.ChangeEvent<HTMLInputElement>;
        registerProps.onChange(syntheticEvent);
      }

      setOpen(false); // Close the popover when a date is selected
    };

    const handleBlur = () => {
      onBlur?.();
      if (registerProps) {
        const syntheticEvent = {
          target: { value: date ? date.toISOString().split("T")[0] : "" },
          type: "blur",
        } as React.FocusEvent<HTMLInputElement>;
        registerProps.onBlur(syntheticEvent);
      }
    };

    return (
      <div className={`space-y-2 ${className}`}>
        <span className={labelClassName}>
          {label}
          {required && <span className="text-destructive">*</span>}
        </span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              id={id}
              name={name}
              variant="outline"
              data-empty={!date}
              disabled={disabled}
              onBlur={handleBlur}
              onFocus={onFocus}
              className={cn(
                "data-[empty=true]:text-muted-white w-full justify-start text-left font-normal",
                buttonClassName
              )}
              {...props}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP", { locale: es })
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                if (disabled) return true;
                // Disable dates before today
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          </PopoverContent>
        </Popover>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {/* Input hidden para react-hook-form */}
        {registerProps && (
          <input
            type="hidden"
            name={registerProps.name}
            ref={registerProps.ref}
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={registerProps.onChange}
            onBlur={registerProps.onBlur}
          />
        )}
      </div>
    );
  }
);

FormDatePicker.displayName = "FormDatePicker";
