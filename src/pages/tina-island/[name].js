import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import islands from "../../lib/astro-islands";

export const prerender = false;
export const ALL = experimental_createIslandRoute(islands);
