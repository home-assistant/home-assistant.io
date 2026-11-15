---
description: Instructions on how to integrate Kraken.com sensors into Home Assistant.
ha_release: 2021.6
ha_domain: kraken
---

The **Kraken** {% term integration %} allows you to monitor exchange rates on [kraken.com](https://www.kraken.com/).
For a list of tradable asset pairs check [this kraken support article](https://support.kraken.com/articles/kraken-markets).

{% include integrations/config_flow.md %}

{% include integrations/option_flow.md %}

{% configuration_basic %}
Update interval:
  description: "Seconds between updates"
Tracked Asset Pairs:
  description: "Select the assets you want to track. This list is automatically updated with a list of tradable assets on kraken.com"
{% endconfiguration_basic %}
