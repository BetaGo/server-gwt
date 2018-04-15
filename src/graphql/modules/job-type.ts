import { IResolvers } from "graphql-tools";
import Job from "../../model/job";

export const typeDef = `
  type Job {
    name: String
    position_id: Int
    city: String
    address: String
    salary: [Int]
    experience: String
    education: String
    tags: [String]
    company: String
    company_id: String
    company_description: String
    company_industry: String
  }

  extend type Query {
    jobs: [Job]
    jobWithName(name: String!): [Job]
  }
`;

export const resolver: IResolvers = {
  Query: {
    async jobs(root, args, ctx) {
      const res = await Job.find().limit(10);
      return res;
    },
    async jobWithName(root, {name}, ctx) {
      console.log(name);
      const res = await Job.find({name: new RegExp(name, "gi")}).limit(10);
      return res;
    }
  }
};