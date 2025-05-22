import docToUrl from "@/lib/docToUrl";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function linkHandler(link: Project.Link, className?: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const pathname = usePathname();

  if (link.externalUrl) {
    // Return an external link with an <a> tag
    return (
      <a
        href={link.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(className)}
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
        >
          {link.title}
        </Link>
      );
    }
  }

  // Default fallback if no valid link is provided
  return null;
}
