import { Mail, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { APP_NAME, CONTACT_EMAIL } from "../lib/appConfig";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
};

type ContactFormProps = {
  inputClassName?: string;
  textareaClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
};

export default function ContactForm({
  inputClassName,
  textareaClassName,
  labelClassName,
  buttonClassName,
}: ContactFormProps = {}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");
  const recipentEmail = CONTACT_EMAIL;

  function validate(values: FormState) {
    const nextErrors: Errors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Ingresa tu nombre.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Ingresa un correo válido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "El correo no tiene un formato válido.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Cuéntanos brevemente cómo podemos ayudarte.";
    } else if (values.message.trim().length < 12) {
      nextErrors.message =
        "Agrega un poco más de contexto para atenderte mejor.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("ready");

    const body = [
      "Nombre: " + form.name.trim(),
      "Email: " + form.email.trim(),
      "",
      "Mensaje:",
      form.message.trim(),
    ].join("\n");

    window.location.href = `mailto:${recipentEmail}?subject=${encodeURIComponent(
      `Contacto web ${APP_NAME}`,
    )}&body=${encodeURIComponent(body)}`;
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={`space-y-2 text-sm font-medium ${labelClassName ?? "text-slate-700"}`}>
          <span>Nombre</span>
          <Input
            name="name"
            placeholder="Tu nombre"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className={inputClassName}
            aria-invalid={!!errors.name}
          />
          {errors.name ? (
            <p className="text-sm text-(--client-400)">{errors.name}</p>
          ) : null}
        </label>

        <label className={`space-y-2 text-sm font-medium ${labelClassName ?? "text-slate-700"}`}>
          <span>Email</span>
          <Input
            name="email"
            type="email"
            placeholder="nombre@empresa.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputClassName}
            aria-invalid={!!errors.email}
          />
          {errors.email ? (
            <p className="text-sm text-(--client-400)">{errors.email}</p>
          ) : null}
        </label>
      </div>

      <label className={`block space-y-2 text-sm font-medium ${labelClassName ?? "text-slate-700"}`}>
        <span>Mensaje</span>
        <Textarea
          name="message"
          placeholder="Cuéntanos si buscas información comercial, soporte o detalles de cumplimiento."
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className={textareaClassName}
          aria-invalid={!!errors.message}
        />
        {errors.message ? (
          <p className="text-sm text-(--client-400)">{errors.message}</p>
        ) : null}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail className="h-4 w-4 text-(--supply-700)" />
          Se abrirá tu cliente de correo con el mensaje ya preparado.
        </div>
        <Button type="submit" size="lg" className={buttonClassName}>
          <Send className="h-4 w-4" />
          Enviar mensaje
        </Button>
      </div>

      {status === "ready" ? (
        <p className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          {`Validación correcta. Si tu cliente de correo no se abrió, escribe a
          ${recipentEmail}.`}
        </p>
      ) : null}
    </form>
  );
}
