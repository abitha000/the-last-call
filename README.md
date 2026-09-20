# The Last Call

Commercial-ready foundation for a Telegram multiplayer social-deduction game.

## Architecture

- **Bot**: Telegram transport and command/callback handling.
- **Game**: deterministic domain engine, roles, phases, voting, evidence and win conditions.
- **Storage**: Redis persistence, distributed locks and backup primitives.
- **Security**: validation, rate limiting, admin authorization and abuse controls.
- **Analytics**: append-only game events and Prometheus metrics.
- **Server/API**: health, metrics and webhook endpoints.
- **Adapters**: infrastructure boundaries so the domain is not coupled to Telegram/Redis.

## Quick start

1. Install Node.js 20+ and Redis.
2. Copy `.env.example` to `.env`.
3. Set `BOT_TOKEN` and `REDIS_URL`.
4. Run `npm install`.
5. Run `npm run build`.
6. Run `npm test`.
7. Run `npm start`.

For local development: `npm run dev`.

## Production

Use a managed Redis with TLS, a process manager/container platform, HTTPS webhook endpoint, secret storage, log aggregation and regular Redis backups. Do not commit `.env`.

## Game model

A game moves through `LOBBY -> NIGHT -> DAY -> VOTING -> RESOLUTION -> ENDED`.
State transitions are validated by the domain engine and persisted behind a distributed lock.

## Commercialization checklist

- Set your legal entity, privacy policy, terms and Telegram bot identity.
- Add payment provider only behind a dedicated adapter.
- Configure production Redis and backup retention.
- Configure Telegram webhook.
- Add monitoring/alerting and error tracking.
- Load-test with your expected peak concurrent games.
