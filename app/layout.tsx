import type { Metadata } from "next";
import GoToTopButton from "@/components/GoToTopButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "See Yes Garden | Outdoor Garden Structures",
  description:
    "See Yes Garden supplies pergolas, garden beds, greenhouses, sheds, planters, and custom outdoor structure solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoToTopButton />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('invalid', function (event) {
                var field = event.target;
                if (!field || !field.setCustomValidity) return;
                if (field.validity && field.validity.valueMissing) {
                  field.setCustomValidity('Please complete this required field.');
                } else if (field.validity && field.validity.typeMismatch) {
                  field.setCustomValidity('Please enter a valid value.');
                }
              }, true);
              document.addEventListener('input', function (event) {
                var field = event.target;
                if (field && field.setCustomValidity) field.setCustomValidity('');
              }, true);
              document.addEventListener('change', function (event) {
                var field = event.target;
                if (field && field.setCustomValidity) field.setCustomValidity('');
              }, true);
            `,
          }}
        />
      </body>
    </html>
  );
}
