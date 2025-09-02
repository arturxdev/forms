# FormDatePicker

A reusable date picker component built with shadcn/ui components, following the established form component patterns.

## Features

- Built with shadcn/ui Calendar and Popover components
- Consistent styling with other form components
- Support for controlled and uncontrolled usage
- Error handling and validation display
- Accessibility features
- Customizable styling

## Props

| Prop              | Type                                | Default         | Description                               |
| ----------------- | ----------------------------------- | --------------- | ----------------------------------------- |
| `id`              | `string`                            | -               | Unique identifier for the input           |
| `name`            | `string`                            | -               | Name attribute for the input              |
| `label`           | `string`                            | -               | Label text for the date picker            |
| `placeholder`     | `string`                            | `"Pick a date"` | Placeholder text when no date is selected |
| `required`        | `boolean`                           | `false`         | Whether the field is required             |
| `disabled`        | `boolean`                           | `false`         | Whether the field is disabled             |
| `className`       | `string`                            | `""`            | Additional CSS classes for the container  |
| `buttonClassName` | `string`                            | `""`            | Additional CSS classes for the button     |
| `labelClassName`  | `string`                            | `""`            | Additional CSS classes for the label      |
| `error`           | `string`                            | -               | Error message to display                  |
| `value`           | `Date`                              | -               | Controlled value (selected date)          |
| `onChange`        | `(date: Date \| undefined) => void` | -               | Callback when date changes                |
| `onBlur`          | `() => void`                        | -               | Callback when field loses focus           |
| `onFocus`         | `() => void`                        | -               | Callback when field gains focus           |

## Usage

### Basic Usage

```tsx
import { FormDatePicker } from "@/components/formComponents/formDatePicker";

function MyForm() {
  const [date, setDate] = React.useState<Date>();

  return (
    <FormDatePicker
      id="birthdate"
      name="birthdate"
      label="Birth Date"
      value={date}
      onChange={setDate}
    />
  );
}
```

### With Validation

```tsx
import { FormDatePicker } from "@/components/formComponents/formDatePicker";

function MyForm() {
  const [date, setDate] = React.useState<Date>();
  const [error, setError] = React.useState<string>("");

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (!newDate) {
      setError("Please select a date");
    } else {
      setError("");
    }
  };

  return (
    <FormDatePicker
      id="appointment"
      name="appointment"
      label="Appointment Date"
      required
      value={date}
      onChange={handleDateChange}
      error={error}
    />
  );
}
```

### With Custom Styling

```tsx
import { FormDatePicker } from "@/components/formComponents/formDatePicker";

function MyForm() {
  return (
    <FormDatePicker
      id="event-date"
      name="eventDate"
      label="Event Date"
      placeholder="Select event date"
      className="mb-4"
      buttonClassName="w-full"
      labelClassName="font-semibold"
    />
  );
}
```

## Dependencies

- `date-fns` - For date formatting
- `lucide-react` - For calendar icon
- shadcn/ui components: `Button`, `Calendar`, `Label`, `Popover`

## Notes

- The component uses `date-fns` format function to display dates in a readable format
- The calendar popover is automatically positioned and aligned
- The component supports both controlled and uncontrolled usage patterns
- Error messages are displayed below the date picker when provided
