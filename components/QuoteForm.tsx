"use client";

import { useState } from "react";

const products = [
  "Aluminum Pergola",
  "Metal Shed",
  "Raised Garden Bed",
  "Greenhouse",
  "Carport",
  "Other",
];

const customNeeds = [
  "Custom Size",
  "Custom Color",
  "Logo",
  "Packaging",
  "OEM / ODM",
  "Full Project Solution",
];

type QuoteFormProps = {
  selectedProduct?: string;
  selectedCategory?: string;
  defaultMessage?: string;
};

export default function QuoteForm({
  selectedProduct,
  selectedCategory,
  defaultMessage = "",
}: QuoteFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Submit failed.");
      }

      setStatus("success");
      setMessage("Thanks. Your custom request has been sent. Our factory team will reply soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Submit failed. Please try again.");
    }
  }

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <input name="formType" type="hidden" value="custom request" />

      <div className="quote-group">
        <strong>Product Type *</strong>
        <div className="checkbox-grid">
          {products.map((item) => (
            <label key={item}>
              <input
                defaultChecked={item === selectedProduct || item === selectedCategory}
                name="productType"
                type="checkbox"
                value={item}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="quote-group">
        <strong>Customization Needed *</strong>
        <div className="checkbox-grid">
          {customNeeds.map((item) => (
            <label key={item}>
              <input name="customization" type="checkbox" value={item} />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="quote-group">
        <strong>Upload Drawing or Reference Image</strong>
        <label className="quote-upload">
          <input name="attachment" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg,.dxf" />
          <span>Click to upload or drag and drop</span>
          <small>JPG, PNG, PDF, CAD files up to 20MB</small>
        </label>
      </div>

      <div className="quote-fields">
        <input name="name" required placeholder="Your Name *" />
        <input name="phone" placeholder="WhatsApp" />
        <input name="email" required type="email" placeholder="Email *" />
        <select name="materialPreference" defaultValue="">
          <option value="" disabled>
            Select Material
          </option>
          <option>Aluminum</option>
          <option>Galvanized Steel</option>
          <option>Polycarbonate</option>
          <option>Not Sure Yet</option>
        </select>
        <select name="country" defaultValue="">
          <option value="" disabled>
            Select Country / Market
          </option>
          <option>USA</option>
          <option>Canada</option>
          <option>Australia</option>
          <option>Europe</option>
          <option>Other</option>
        </select>
        <input name="quantity" placeholder="Order Quantity" />
      </div>

      <textarea
        defaultValue={defaultMessage}
        name="message"
        required
        maxLength={1000}
        placeholder="Please describe your project, size, design idea, special requirements, etc. *"
        rows={5}
      />

      <button disabled={status === "sending"} type="submit">
        {status === "sending" ? "Submitting..." : "Submit Custom Request →"}
      </button>
      {message ? <p className={`form-status ${status}`}>{message}</p> : null}
    </form>
  );
}
