import React, { useState, useEffect, useCallback } from "react";
import { FormInput, FormInputProps } from "../formInput/FormInput";
import { Phone } from "lucide-react";

export interface FormPhoneProps extends Omit<FormInputProps, "type" | "icon"> {
  onValidationChange?: (isValid: boolean) => void;
  showValidationMessage?: boolean;
  countryCode?: string;
  allowInternational?: boolean;
  minLength?: number;
  maxLength?: number;
}

export const FormPhone: React.FC<FormPhoneProps> = ({
  onValidationChange,
  showValidationMessage = true,
  allowInternational = true,
  minLength = 7,
  maxLength = 15,
  ...props
}) => {
  const [phone, setPhone] = useState(props.value || "");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Función para limpiar el número de teléfono (solo números y +)
  const cleanPhoneNumber = (phoneNumber: string): string => {
    return phoneNumber.replace(/[^\d+]/g, "");
  };

  // Función para validar número de teléfono
  const validatePhoneNumber = useCallback(
    (phoneNumber: string): { isValid: boolean; message: string } => {
      if (!phoneNumber) {
        return { isValid: true, message: "" }; // Campo vacío no es error hasta que se intente enviar
      }

      const cleaned = cleanPhoneNumber(phoneNumber);

      // Validar longitud mínima
      if (cleaned.length < minLength) {
        return {
          isValid: false,
          message: `El teléfono debe tener al menos ${minLength} dígitos`,
        };
      }

      // Validar longitud máxima
      if (cleaned.length > maxLength) {
        return {
          isValid: false,
          message: `El teléfono no puede exceder ${maxLength} dígitos`,
        };
      }

      // Validar que solo contenga números y +
      if (!/^[\d+]+$/.test(cleaned)) {
        return {
          isValid: false,
          message: "El teléfono solo puede contener números y el símbolo +",
        };
      }

      // Validar formato básico
      if (!cleaned.includes("+") && !allowInternational) {
        return {
          isValid: false,
          message: "Debe incluir el código de país (ej: +57)",
        };
      }

      // Validar que tenga al menos un dígito después del +
      if (cleaned.startsWith("+") && cleaned.length < 3) {
        return {
          isValid: false,
          message: "El código de país debe tener al menos 2 dígitos",
        };
      }

      // Validar que no tenga solo el +
      if (cleaned === "+") {
        return {
          isValid: false,
          message: "Ingrese un número de teléfono válido",
        };
      }

      return { isValid: true, message: "" };
    },
    [minLength, maxLength, allowInternational]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);

    if (props.onChange) {
      props.onChange(e);
    }

    // Solo validar si hay contenido
    if (newPhone) {
      const validation = validatePhoneNumber(newPhone);
      setIsValid(validation.isValid);
      setErrorMessage(validation.message);

      if (onValidationChange) {
        onValidationChange(validation.isValid);
      }
    } else {
      setIsValid(true);
      setErrorMessage("");
      if (onValidationChange) {
        onValidationChange(true);
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }

    // Validar al perder el foco
    const validation = validatePhoneNumber(phone);
    setIsValid(validation.isValid);
    setErrorMessage(validation.message);

    if (onValidationChange) {
      onValidationChange(validation.isValid);
    }
  };

  // Actualizar estado cuando cambie el valor externo
  useEffect(() => {
    if (props.value !== undefined) {
      setPhone(props.value);
      if (props.value) {
        const validation = validatePhoneNumber(props.value);
        setIsValid(validation.isValid);
        setErrorMessage(validation.message);
      } else {
        setIsValid(true);
        setErrorMessage("");
      }
    }
  }, [props.value, validatePhoneNumber]);

  return (
    <FormInput
      {...props}
      type="tel"
      icon={Phone}
      value={phone}
      onChange={handleChange}
      onBlur={handleBlur}
      error={showValidationMessage && !isValid ? errorMessage : props.error}
      className={`${props.className || ""} ${!isValid ? "error" : ""}`}
    />
  );
};
