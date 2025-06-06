import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { boardType } from "./blocks/boardType";
import { categoryType } from "./categoryType";
import { collectionType } from "./collectionType";
import { homepageType } from "./homepageType";
import { imageType } from "./objects/imageType";
import { linkExternalType, linkInternalType, linkType } from "./objects/linkType";
import { seoType } from "./objects/seoType";
import { pageType } from "./pageType";
import { projectType } from "./projectType";
import { settingsType } from "./settingsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    projectType,
    settingsType,
    homepageType,
    categoryType,
    pageType,
    collectionType,
    // Objects
    imageType,
    seoType,
    linkType,
    linkInternalType,
    linkExternalType,
    blockContentType,
    // Blocks
    boardType,
  ],
};
