import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";

import { orderResolvers } from "./order/resolver";

// Load all .graphql files
const typeDefsArray = loadFilesSync(path.join(__dirname, "./**/*.graphql"));
const typeDefs = mergeTypeDefs(typeDefsArray);

const resolvers = mergeResolvers([
  orderResolvers,
]);

export { typeDefs, resolvers };