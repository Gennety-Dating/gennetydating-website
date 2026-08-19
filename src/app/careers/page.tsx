import { redirect } from "next/navigation";
import { CAREERS_URL } from "@/lib/site-config";

export const metadata = {
  title: "Careers — Gennety",
  description: "Explore career opportunities at Gennety / Sverkaus.",
};

export default function CareersPage() {
  redirect(CAREERS_URL);
}
