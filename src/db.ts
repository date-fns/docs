import { schema, Typesaurus } from "typesaurus";
import type { DateFnsDocs } from "./types";

export const db = schema(($) => ({
  packages: $.collection<DateFnsDocs.Package>(),
  versions: $.collection<DateFnsDocs.Version>(),
  pages: $.collection<DateFnsDocs.Page>(),
}));

export type Schema = Typesaurus.Schema<typeof db>;
