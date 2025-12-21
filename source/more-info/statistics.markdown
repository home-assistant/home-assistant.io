---
title: "Expected data source not listed"
description: "More information on if your expected data source is not listed."
---

You're configuring a statistic but you couldn't find your source in the dropdown?

Check that it hasn't been excluded in the [Recorder](https://www.home-assistant.io/integrations/recorder/) configuration.

Otherwise, It's caused by a bug in the integration providing the entity. Integrations need to configure their entities correctly so Home Assistant knows that we need to track statistics for it and how.

Open an issue with the author of the integration and link them to https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics.
