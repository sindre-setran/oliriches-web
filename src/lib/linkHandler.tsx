import docToUrl from "@/lib/docToUrl";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkHandlerProps {
  link: Project.Link;
  className?: string;
  onClick?: () => void;
}

export default function LinkHandler({ link, className, onClick }: LinkHandlerProps) {
  const pathname = usePathname();

  // Return null if link is undefined or null
  if (!link) {
    return null;
  }

  console.log(link);

  if (link.externalUrl) {
    // Return an external link with an <a> tag
    return (
      <a
        href={link.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
        onClick={onClick}
      >
        {link.title}
      </a>
    );
  } else if (link.reference && link.reference.slug) {
    // Add validation to ensure we have valid reference data
    const internalUrl = docToUrl({
      _type: link.reference._type,
      slug: link.reference.slug,
    });

    // Only render if we have both a valid URL and title
    if (internalUrl && link.title) {
      return (
        <Link
          href={internalUrl}
          className={cn(
            pathname === internalUrl ? "text-primary pointer-events-none" : "link-hover"
          )}
          onClick={onClick}
        >
          {link.title}
        </Link>
      );
    }
  } else if (link.url) {
    return (
      <Link
        href={link.url}
        className={cn(pathname === link.url ? "text-primary pointer-events-none" : "link-hover")}
        onClick={onClick}
      >
        {link.title}
      </Link>
    );
  }

  // Default fallback if no valid link is provided
  return null;
}
