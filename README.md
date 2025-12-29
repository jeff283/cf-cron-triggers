```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

## Testing Cron Triggers Locally

To manually trigger cron jobs while running `wrangler dev`, use one of the following scripts:

### Using Node.js (Cross-platform)

```bash
# Trigger with default cron pattern (* * * * *)
npm run trigger-cron

# Trigger with a specific cron pattern
npm run trigger-cron -- "* * * * *"
npm run trigger-cron -- "*/10 * * * *"
npm run trigger-cron -- "0 12 * * *"

# Trigger with cron pattern and custom time
npm run trigger-cron -- "* * * * *" 1745856238
```

Or directly:
```bash
node scripts/trigger-cron.js
node scripts/trigger-cron.js "*/10 * * * *"
node scripts/trigger-cron.js "* * * * *" 1745856238
```



**Note:** Make sure `wrangler dev` is running before triggering cron jobs. The scripts default to port `8787`, but you can override it by setting the `PORT` environment variable (Node.js) or using the `-Port` parameter (PowerShell).
