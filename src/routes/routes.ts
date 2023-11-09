import Home from "../pages/Home";

interface IPublicRoutes {
  path: string;
  element: React.FC;
}
export const publicRoutes: IPublicRoutes[] = [
  {
    path: "",
    element: Home,
  },
];
