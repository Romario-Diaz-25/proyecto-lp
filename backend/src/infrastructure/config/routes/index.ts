import { Router } from "express";
import path from "path";
import fs from "fs";
import { IRepositories } from "../../../application/model/common/repositories.interfaces";

const PATH_ROUTER = path.join(__dirname, "../../..", "api");
const router = Router();

console.log("PATH_ROUTER", PATH_ROUTER);

export const routes = (context: IRepositories): Router => {
  fs.readdirSync(PATH_ROUTER).filter(async (file) => {
    const cleanFileName = file.split(".")[0];
    const cleanFileNameOne = file.split(".")[1];
    if (cleanFileNameOne === "router") {
      if (cleanFileName !== "router" && cleanFileName !== "common") {
        const moduleRouter = await import(
          path.join(PATH_ROUTER, `${String(cleanFileName)}.router`)
        );

        router.use(`/${cleanFileName}`, moduleRouter.router(context));
      }
    }
  });
  return router;
};
