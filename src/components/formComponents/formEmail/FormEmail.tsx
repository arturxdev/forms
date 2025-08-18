import React, { useState, useEffect } from "react";
import { FormInput, FormInputProps } from "../formInput/FormInput";
import { Mail } from "lucide-react";

export interface FormEmailProps extends Omit<FormInputProps, "type" | "icon"> {
  onValidationChange?: (isValid: boolean) => void;
  showValidationMessage?: boolean;
}

export const FormEmail: React.FC<FormEmailProps> = ({
  onValidationChange,
  showValidationMessage = true,
  ...props
}) => {
  const [email, setEmail] = useState(props.value || "");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Función para validar email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Función para validar email más estricta
  const validateEmailStrict = (
    email: string
  ): { isValid: boolean; message: string } => {
    if (!email) {
      return { isValid: true, message: "" }; // Campo vacío no es error hasta que se intente enviar
    }

    // Validación básica de formato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Formato de email inválido" };
    }

    // Validación de longitud
    if (email.length > 254) {
      return { isValid: false, message: "El email es demasiado largo" };
    }

    // Validación de dominio
    const parts = email.split("@");
    if (parts[1].length < 2) {
      return { isValid: false, message: "El dominio del email es inválido" };
    }

    // Validación de caracteres especiales
    if (/[<>()[\]\\,;:\s"]/.test(email)) {
      return {
        isValid: false,
        message: "El email contiene caracteres inválidos",
      };
    }

    return { isValid: true, message: "" };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (props.onChange) {
      props.onChange(e);
    }

    // Solo validar si hay contenido
    if (newEmail) {
      const validation = validateEmailStrict(newEmail);
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
    const validation = validateEmailStrict(email);
    setIsValid(validation.isValid);
    setErrorMessage(validation.message);

    if (onValidationChange) {
      onValidationChange(validation.isValid);
    }
  };

  // Actualizar estado cuando cambie el valor externo
  useEffect(() => {
    if (props.value !== undefined) {
      setEmail(props.value);
      if (props.value) {
        const validation = validateEmailStrict(props.value);
        setIsValid(validation.isValid);
        setErrorMessage(validation.message);
      } else {
        setIsValid(true);
        setErrorMessage("");
      }
    }
  }, [props.value]);

  return (
    <FormInput
      {...props}
      type="email"
      icon={Mail}
      value={email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={showValidationMessage && !isValid ? errorMessage : props.error}
      className={`${props.className || ""} ${!isValid ? "error" : ""}`}
    />
  );
};
