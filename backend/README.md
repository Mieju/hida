# Backend API

This Express server serves election results for the frontend. The main endpoints are:

- `GET /api/results` - returns the overall election results stored in `data/results.json`. Use the query parameter `state` to fetch data for a particular state, e.g. `/api/results?state=bayern`.
- `POST /api/update-results` - downloads the latest election results for Germany and all states from the configured remote source and stores them in the `data` directory.

The remote URLs can be configured via the `GERMANY_URL` and `STATE_URL_TEMPLATE` environment variables. `STATE_URL_TEMPLATE` should contain `{state}` as a placeholder for the state name.
