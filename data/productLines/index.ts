import { carportProducts } from "./carports";
import { customSolutionProducts } from "./customSolutions";
import { doorProducts } from "./doors";
import { greenhouseProducts } from "./greenhouses";
import { pergolaProducts } from "./pergolas";
import { privacyScreenProducts } from "./privacyScreens";
import { raisedGardenBedProducts } from "./raisedGardenBeds";
import { shedProducts } from "./sheds";
import type { ProductItem } from "./types";
import { windowProducts } from "./windows";

export type { DoorProduct, ProductItem } from "./types";
export { doorProducts, getDoorProductBySlug } from "./doors";

export const productsCatalog: ProductItem[] = [
  ...pergolaProducts,
  ...shedProducts,
  ...raisedGardenBedProducts,
  ...greenhouseProducts,
  ...carportProducts,
  ...customSolutionProducts,
  ...doorProducts,
  ...windowProducts,
  ...privacyScreenProducts,
];
