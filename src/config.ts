import { config } from "dotenv";
import moduleAlias from "module-alias";

export function configServer() {
  config({
    path: `./.env.${process.env.NODE_ENV}`,
  });

  moduleAlias.addAliases({
    "@utils": `${__dirname}/utils`,
    "@routes": `${__dirname}/routes`,
    "@middlerware": `${__dirname}/middlerware`,
    "@controllers": `${__dirname}/controllers`,
    "@db": `${__dirname}/db`,
  });
}
