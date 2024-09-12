export enum Route {
  LOGIN = "/login",
  REGISTER = "/register",
  DASHBOARD = "/",
  AUTHOR = "/author",
  AUTHOR_DETAIL = "/author/",
  AUTHOR_CREATE = "/author/create",
  AUTHOR_EDIT = "/author/:id/edit",
  BOOK = "/book",
  BOOK_CREATE = "/book/create",
  BOOK_EDIT = "/book/edit/:id",
  BOOK_DETAIL = "/book/:id",
  CATEGORY = "/category",
  CATEGORY_CREATE = "/category/create",
  CATEGORY_EDIT = "/category/edit/:id",
  CATEGORY_DETAIL = "/category/:id",
  USER = "/user",
  USER_CREATE = "/user/create",
  USER_EDIT = "/user/edit/:id",
  USER_DETAIL = "/user/:id",
  BORROWING = "/borrowing",
  BORROWING_CREATE = "/borrowing/create",
  BORROWING_EDIT = "/borrowing/edit/:id",
  BORROWING_DETAIL = "/borrowing/:id",
  SETTINGS = "/settings",
  PROFILE = "/profile",
  NOT_FOUND = "/404",
  FORBIDDEN = "/403",
  SERVER_ERROR = "/500",
}
type _PathParam<Path extends string> = Path extends `${infer L}/${infer R}`
  ? _PathParam<L> | _PathParam<R>
  : Path extends `:${infer Param}`
  ? Param extends `${infer Optional}?`
    ? Optional
    : Param
  : never;

export type PathParam<Path extends string> = Path extends "*" | "/*"
  ? "*"
  : Path extends `${infer Rest}/*`
  ? "*" | _PathParam<Rest>
  : _PathParam<Path>;

export const route = <Path extends Route>(
  url: Path,
  propsParams: {
    [key in PathParam<Path>]: string | null;
  }
): string => {
  let newUrl: string = url;
  Object.keys(propsParams).forEach((param) => {
    newUrl = newUrl.replace(
      `:${param}`,
      String(propsParams[param as PathParam<Path>])
    );
  });
  return newUrl;
};
