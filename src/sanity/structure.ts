import { Home, Settings } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Blog")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(Home)
        .child(S.document().schemaType("homepage").documentId("homepage").title("Homepage")),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      S.listItem()
        .title("Settings")
        .icon(Settings)
        .child(S.document().schemaType("settings").documentId("settings").title("Settings")),
    ]);
