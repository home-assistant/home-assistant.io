---
title: "Expected data source not listed"
description: "More information on if your expected data source is not listed."
---

You're configuring a statistic but you couldn't find your source in the dropdown?

### Criteria for display

* You are correctly collecting Long Term Statistics. Check [Developer Tools](https://www.home-assistant.io/docs/tools/dev-tools/) > Statistics for any issues. If not found, contact the integration provider.
* You have the correct unit. The energy dashboard primarily looks for kWh in many cases - check you do not have to [convert from W to kW](https://www.home-assistant.io/integrations/integration/#energy).

#### Grid, Battery, Solar, Individual Devices

* Units: `kWh`
* Device Class(es): `energy`

#### Gas

* Units: `m³`, `kWh`
* Device Classes: `null`, `energy`

### Other causes

If your entity is not displayed, that's likely caused by a bug in the integration providing the entity. Integrations need to configure their entities correctly so Home Assistant knows that we need to track statistics for it and how.

Open an issue with the author of the integration and link them to https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics.
