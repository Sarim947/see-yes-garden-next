"use client";

import { useState } from "react";

const productOptions = [
  "Raised Garden Bed",
  "Metal Privacy Screen",
  "Aluminum Pergola",
  "Garden Shed",
  "Greenhouse",
  "Carport",
  "Aluminum Window",
  "Entry Door",
  "OEM / ODM Project",
];

export default function ContactForm() {
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
      setMessage("Thanks. Your inquiry has been submitted. Our factory team will reply soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Submit failed. Please try again.");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="form-row two">
        <label>
          <span>Your Name *</span>
          <input name="name" required placeholder="Your Name" />
        </label>
        <label>
          <span>Email Address *</span>
          <input name="email" required type="email" placeholder="Email Address" />
        </label>
      </div>
      <label>
        <span>WhatsApp / Phone</span>
        <input name="phone" placeholder="WhatsApp / Phone" />
      </label>
      <div className="form-row two">
        <label>
          <span>Country</span>
          <input name="country" placeholder="Country" />
        </label>
        <label>
          <span>Product Category</span>
          <select name="productCategory" defaultValue="">
            <option value="" disabled>
              Product Category
            </option>
            {productOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-row two uneven">
        <label>
          <span>Quantity</span>
          <input name="quantity" placeholder="Quantity" />
        </label>
        <label>
          <span>Message *</span>
          <textarea name="message" required placeholder="Message" rows={3} />
        </label>
      </div>
      <label className="upload-field">
        <input
          name="attachment"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg,.dxf"
        />
        <em>Upload File</em>
        <strong>Upload Drawing / Reference Image</strong>
        <span>Click to upload or drag and drop JPG, PNG, PDF. Max 10MB</span>
      </label>
      <button className="submit-btn" disabled={status === "sending"} type="submit">
        {status === "sending" ? "Submitting..." : "Submit Inquiry"}
      </button>
      {message ? <p className={`form-status ${status}`}>{message}</p> : null}
    </form>
  );
}
