import { makeExecutableSchema, IResolvers } from "graphql-tools";
import * as jobType from "./modules/job-type";

const modules = [
  jobType,
];

const mainDefs = [`
  type Query {
    version: String
  }
  schema {
    query: Query
  }
`];

const mainResolver: IResolvers[] = [{
  Query: {
    version: () => "0.0.1",
  }
}];

const resolvers = mainResolver.concat(modules.map(m => m.resolver)).filter(res => !!res);
const typeDefs = mainDefs.concat(modules.map(m => m.typeDef)).filter(res => !!res);

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export { schema };