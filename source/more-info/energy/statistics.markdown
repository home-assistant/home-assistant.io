---
title: "Energy: expected data source not listed"
description: "More information on if your expected data source is not listed."
---

You're configuring the energy integration but you couldn't find your source in the dropdown? That's caused by a bug in the integration providing the entity. Integrations need to configure their entities correctly to indicate to Home Assistant that we need to track statistics for it.

Open an issue with the author of the integration and link them to this page.

For energy consumption and production entities, we expect the following properties:

- `unit_of_measurement` = `kWh`
- `state_class` = `measurement`
- `last_reset` = ISO formatted timestamp when the meter was last reset. If it never resets, set it to `1970-01-01T00:00:00+00:00`
