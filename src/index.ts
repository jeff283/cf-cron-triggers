import { Hono } from "hono";
import { env as Env } from "cloudflare:workers";
const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const scheduledCron = async (
  controller: ScheduledController,
  env: typeof Env,
  ctx: ExecutionContext
) => {
  console.log(controller.cron);
  switch (controller.cron) {
    case "* * * * *":
      console.log("Every 1 minute");
      break;
    case "*/10 * * * *":
      console.log("Every 10 minutes");
      break;
    case "0 * * * *":
      console.log("Every hour");
      break;
    case "0 12 * * *":
      console.log("Every day at 12:00");
      break;
    case "0 12 * * 0":
      console.log("Every week on Sunday at 12:00");
      break;
    default:
      console.log("Unknown cron schedule");
      break;
  }
};

export default {
  fetch: app.fetch,
  scheduled: scheduledCron,
};
