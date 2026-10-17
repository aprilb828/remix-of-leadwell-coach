# Project rules
- Keep activation endpoints in the existing Netlify CommonJS functions; this app shares its activation service and device limits with other editions.
- Share the locally cached plan through the activation context and recheck it through register on launch; network failures must retain existing access and plan.
- Maintain monthly kits in src/premium/kits.ts and serve their supplied documents under public/kits; render kit links only for Premium plans.