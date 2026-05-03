"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/Toaster";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  city: z.string().min(2, "Please enter your city"),
  service: z.enum(["sell-gold", "loan-release", "general"] as const, {
    message: "Please select a service",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "sell-gold", label: "Sell Gold for Cash" },
  { value: "loan-release", label: "Release Gold Loan" },
  { value: "general", label: "General Inquiry" },
];

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  children?: React.ReactNode;
}

function Field({ label, error, as = "input", children, ...props }: InputProps) {
  const baseClass = "w-full px-4 py-3.5 rounded-xl text-white text-sm outline-none transition-all bg-[#1A1A1A] border";
  const borderClass = error ? "border-red-500/50" : "border-[#2A2A2A] focus:border-[rgba(212,175,55,0.4)]";

  return (
    <div>
      <label className="text-sm font-medium text-gray-300 mb-2 block">{label}</label>
      {as === "textarea" ? (
        <textarea
          className={`${baseClass} ${borderClass} resize-none`}
          rows={4}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : as === "select" ? (
        <select
          className={`${baseClass} ${borderClass} appearance-none`}
          style={{ colorScheme: "dark", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px" }}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
      ) : (
        <input className={`${baseClass} ${borderClass}`} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: (defaultService as "sell-gold" | "loan-release" | "general") || "sell-gold",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      toast("success", "Thank you! We'll contact you within 24 hours.");
      reset();
    } catch {
      toast("error", "Something went wrong. Please try again or call us directly.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(212,175,55,0.1)", border: "2px solid rgba(212,175,55,0.3)" }}>
          <CheckCircle size={40} style={{ color: "#D4AF37" }} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
          We&apos;ve Received Your Request!
        </h3>
        <p className="text-gray-400 mb-8 max-w-sm">
          Our team will review your inquiry and contact you within 24 hours. For urgent queries, please call us directly.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 rounded-xl text-sm font-medium text-[#D4AF37] border transition-all hover:bg-[#D4AF37]/5"
            style={{ borderColor: "rgba(212,175,55,0.3)" }}
          >
            Submit Another
          </button>
          <a
            href="tel:+918130145962"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-black"
            style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
          >
            Call Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot - hidden from real users */}
      <input
        {...register("honeypot")}
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name *"
          placeholder="e.g. Priya Sharma"
          error={errors.name?.message}
          {...register("name")}
        />
        <Field
          label="Phone Number *"
          placeholder="10-digit mobile number"
          type="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Email Address *"
          placeholder="your@email.com"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Field
          label="City *"
          placeholder="e.g. Mumbai, Delhi"
          error={errors.city?.message}
          {...register("city")}
        />
      </div>

      <Field
        as="select"
        label="Service Required *"
        error={errors.service?.message}
        {...register("service")}
      >
        <option value="" disabled>Select a service...</option>
        {serviceOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Field>

      <Field
        as="textarea"
        label="Your Message *"
        placeholder="Tell us about your gold (type, approximate weight, current lender if applicable)..."
        error={errors.message?.message}
        {...register("message")}
      />

      <p className="text-xs text-gray-600">
        By submitting, you agree to be contacted by Cashiogold. We respect your privacy and never share your data.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-black text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ background: "linear-gradient(135deg, #D4AF37, #F4D03F, #B8860B)" }}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send size={18} />
            Send My Request
          </>
        )}
      </button>
    </form>
  );
}
