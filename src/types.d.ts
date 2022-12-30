import type { StringifiedJSON } from "typeroo/json";
import type { ContainerReflection } from "typedoc";

export namespace DateFnsDocs {
  /**
   * The docs config.
   */
  export interface Config {
    /** The package to the package root. */
    package: string;
    /** The path to TypeDoc JSON. */
    json: string;
    /** The documentation groups in order. */
    groups: string[];
    /** The static documentation files. */
    files: StaticDoc[];
  }

  export interface StaticDoc {
    type: "markdown";
    slug: string;
    category: string;
    title: string;
    summary: string;
    path: string;
  }

  /**
   * Function reflection container.
   */
  export interface FnReflection {
    /** The module reflection. */
    ref: DeclarationReflection;
    /** The function reflection. */
    fn: DeclarationReflection;
  }

  /**
   * The submodule type.
   */
  export type Submodule = typeof import("./consts").submodules[number];

  /**
   * The package model.
   */
  export interface Package {
    name: string;
    versions: VersionPreview[];
  }

  /**
   * Package version preview - a minimal version of {@link Version} for rendering
   * version picker.
   */
  export interface VersionPreview {
    version: string;
    preRelease: boolean;
    // TODO: Migrate to Date (or remove - it's unused in the website!)
    createdAt: number;
    submodules: Submodule[];
  }

  /**
   * The package version model.
   */
  export interface Version {
    package: string;
    version: string;
    preRelease: boolean;
    pages: PagePreview[];
    // TODO: Migrate to Date (or remove - it's unused in the website!)
    createdAt: number;
    categories: string[];
    submodules: Submodule[];
    groups: string[];
  }

  /**
   * Page preview - a minimal version of {@link Page} for rendering pages index.
   */
  export type PagePreview = Pick<
    PageBase,
    "slug" | "category" | "title" | "summary" | "submodules"
  >;

  /**
   * The page model.
   */
  export type Page = MarkdownPage | TSDocPage | JSDocPage;

  /**
   * Base page model.
   */
  export interface PageBase {
    package: string;
    version: string;
    slug: string;
    category: string;
    title: string;
    summary: string;
    submodules: Submodule[];
  }

  /**
   * Generic Markdown page (used for v1, v2 and v3 documentation).
   */
  export interface MarkdownPage extends PageBase {
    type: "markdown";
    markdown: string;
  }

  /**
   * TSDoc function page (v3).
   */
  export interface TSDocPage extends PageBase {
    type: "tsdoc";
    name: string;
    tsdoc: StringifiedJSON<ContainerReflection>;
  }

  /**
   * JSDoc function page (used for v1 and v2 documentation).
   */
  export interface JSDocPage extends PageBase {
    type: "jsdoc";
    name: string;
    doc: StringifiedJSON<JSDocFunction>;
  }

  /**
   * JSDoc function definition (used for v1 and v2 documentation).
   */
  export interface JSDocFunction {
    args?: JSDocParam[];
    category: string;
    content: {
      category: string;
      description: string;
      examples?: string | string[];
      exceptions: JSDocAttribute[];
      id: string;
      kind: string;
      longname: string;
      meta: {
        filename: string;
        lineno: number;
        path: string;
      };
      name: string;
      order: number;
      properties?: JSDocParam[];
      params?: JSDocParam[];
      returns?: JSDocAttribute[];
      scope: string;
      summary: string;
      type?: JSDocType;
    };
    description: string;
    isFPFn?: boolean;
    kind: "function" | "typedef";
    relatedDocs?: {
      default?: string;
      fp?: string;
      fpWithOptions?: string;
    };
    syntax?: string;
    title: string;
    type: "jsdoc";
    urlId: string;
    usage?: JSDocUsage;
    usageTabs?: string[];
  }

  /**
   * JSDoc type, used to define function arguments and return values.
   */
  export interface JSDocType {
    names: string[];
  }

  /**
   * JSDoc attribute (return, exception, base for param).
   */
  export interface JSDocAttribute {
    description: string;
    type: JSDocType;
  }

  /**
   * JSDoc param.
   */
  export interface JSDocParam extends JSDocAttribute {
    name: string;
    optional?: boolean;
    defaultvalue?: string;
    variable?: boolean;
    props?: JSDocParam[];
  }

  /**
   * JSDoc usage map.
   */
  export interface JSDocUsage {
    [usageTab: string]: {
      code: string;
      title: string;
      text?: string;
    };
  }
}