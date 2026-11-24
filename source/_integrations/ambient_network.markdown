---
description: How to integrate Ambient Weather Network station within Home Assistant.
ha_release: 2024.5
ha_domain: ambient_network
---

The **Ambient Weather Network** {% term integration %} retrieves local weather station information
via the [Ambient Weather Network](https://ambientweather.net).

Similar to the [Ambient Weather Station](/integrations/ambient_station/)
integration, this integration gathers sensor data from individual weather stations.
However, in contrast to the [Ambient Weather Station](/integrations/ambient_station/)
integration, which exclusively enables owners to fetch data solely from their owned stations, this
integration directly pulls public data from the [Ambient Weather Network](https://ambientweather.net) without requiring an API key,
albeit with a reduced dataset (for example, excluding indoor sensors).

{% include integrations/config_flow.md %}
