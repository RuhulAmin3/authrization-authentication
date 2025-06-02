import rTracer from "cls-rtracer";
import type { RequestHandler } from "express";
import { asyncLocalStorage } from "../../utils/asyncLocalStorage";
import { GlobalRequestData } from "../../interfaces/globalRequestData";

export const globalDataMiddleware: RequestHandler = (req, _res, next) => {
  const headers = req.headers;
  const bearerToken = headers["authorization"] as string;
  const token = bearerToken?.split(" ")[1];

  const globalRequestInfo: GlobalRequestData = {
    u_id: req.user?.id ?? null,
    token,
    ip: req.ip === "::ffff:172.19.0.1" ? "38.125.204.206" : (req.ip ?? ""),
    requestId: rTracer.id() as string,
    userAgent: req.headers["user-agent"] as string,
  };

  asyncLocalStorage.run(globalRequestInfo, () => {
    next();
  });
};
