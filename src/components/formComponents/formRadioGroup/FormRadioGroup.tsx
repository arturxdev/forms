import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
  description?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function FormRadioGroup({
  name,
  label,
  options,
  required = false,
  description,
  value,
  onChange,
}: FormRadioGroupProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-zinc-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && <p className="text-sm text-zinc-500">{description}</p>}
      <RadioGroup
        name={name}
        value={value}
        onValueChange={onChange}
        className="flex flex-col space-y-3"
      >
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 transition-colors"
          >
            <RadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
            />
            <Label
              htmlFor={`${name}-${option.value}`}
              className="font-normal text-sm text-zinc-700 cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
