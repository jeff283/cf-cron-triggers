#!/usr/bin/env node

/**
 * Script to manually trigger Cloudflare Worker cron jobs locally
 *
 * Usage:
 *   node scripts/trigger-cron.js                    # Trigger with default cron pattern
 *   node scripts/trigger-cron.js "* * * * *"       # Trigger with specific cron pattern
 *   node scripts/trigger-cron.js "* * * * *" 1234567890  # Trigger with cron and time
 */

const DEFAULT_PORT = 8787;
const DEFAULT_CRON = "* * * * *";

const port = process.env.PORT || DEFAULT_PORT;
const cronPattern = process.argv[2] || DEFAULT_CRON;
const scheduledTime = process.argv[3];

const url = new URL(`http://localhost:${port}/cdn-cgi/handler/scheduled`);
url.searchParams.set("cron", cronPattern);

if (scheduledTime) {
  url.searchParams.set("time", scheduledTime);
}

console.log(`Triggering cron job...`);
console.log(`  URL: ${url.toString()}`);
console.log(`  Cron: ${cronPattern}`);

if (scheduledTime) {
  console.log(`  Time: ${scheduledTime}`);
}
console.log("");

fetch(url.toString())
  .then(async (response) => {
    const text = await response.text();
    console.log(`Status: ${response.status} ${response.statusText}`);
    if (text) {
      console.log(`Response: ${text}`);
    }
    if (!response.ok) {
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error(`Error: ${error.message}`);
    console.error("\nMake sure 'wrangler dev' is running on port", port);
    process.exit(1);
  });
