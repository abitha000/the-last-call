import client from "prom-client";
export const gamesStarted = new client.Counter({name:"games_started_total", help:"Games started"});
export const gamesFinished = new client.Counter({name:"games_finished_total", help:"Games finished"});
export const httpRequests = new client.Counter({name:"http_requests_total", help:"HTTP requests", labelNames:["method","route","status"]});
export const registry = client.register;
