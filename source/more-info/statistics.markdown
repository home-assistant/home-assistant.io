---
title: "Expected data source not listed"
description: "More information on if your expected data source is not listed."
---

You're configuring a statistic but you couldn't find your source in the dropdown? There are two possibilities:

You have already selected a first entity e.g. in the statistics graph card and want to add a second one that has a different unit of measurement. After specifying the first one, all others can only be selected with the same unit of measurement. Others are filtered out.
It is caused by a bug in the integration providing the entity. Integrations need to configure their entities correctly so Home Assistant knows that we need to track statistics for it and how.

Open an issue with the author of the integration and link them to https://developers.home-assistant.io/docs/core/entity/sensor#long-term-statistics.
