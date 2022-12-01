import type { NavigateFunction } from "react-router-dom";
import { Service } from "react-service-locator";

@Service()
export class RouterService {
  constructor(readonly navigate: NavigateFunction) {}
}
