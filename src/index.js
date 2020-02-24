// Mixins
import {
  cartMixin,
  productMixin
} from "./mixins/index";

import { createEcommerceStorePlugin } from "./plugin/index";

export {
  cartMixin,
  productMixin,

  // Plugin registration
  createEcommerceStorePlugin
}
