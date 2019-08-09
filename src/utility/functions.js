import Sugar from "sugar";
export function dateFrom(stringOrDate: Object | string) {
  return !stringOrDate
    ? new Sugar.Date()
    : stringOrDate.raw // should only happen if obj has already been created (I think?)
    ? new Sugar.Date(stringOrDate.raw)
    : new Sugar.Date(stringOrDate);
}
