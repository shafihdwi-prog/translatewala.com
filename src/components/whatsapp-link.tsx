import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon } from "./icons";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppLink({
  children = "Chat on WhatsApp",
  message,
  className = "button button-whatsapp",
  icon = true,
  ...props
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  children?: ReactNode;
  message?: string;
  icon?: boolean;
}) {
  return (
    <a {...props} className={className} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
      {icon && <Icon name="whatsapp" size={19} />}
      {children}
    </a>
  );
}
