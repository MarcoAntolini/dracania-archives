import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval("send-hourly-email", { hours: 1 }, internal.actions.items.sendHourlyEmail);

export default crons;
