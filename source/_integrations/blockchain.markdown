---
title: Blockchain.com
description: Instructions on how to integrate Blockchain.com data within Home Assistant.
ha_category:
  - Finance
ha_release: 0.47
ha_iot_class: Cloud Polling
ha_domain: blockchain
ha_platforms:
  - sensor
---

The `Blockchain` sensor platform displays Bitcoin wallet balances from [blockchain.com](https://blockchain.com).

To add the Blockchain sensor to your installation, specify a list of bitcoin addresses to watch in the `configuration.yaml` file. The sensor state will be the sum of the balances of all addresses listed.

```yaml
# Example configuration.yaml entry
sensor:
  - platform: blockchain
    addresses:
      - '1BMsHFczb2vY1BMDvFGWgGU8mkWVm5fupp'
      - '183J5pXWqYYsxZ7inTVw9tEpejDXyMFroe'
```

{% configuration %}
addresses:
  description: List of bitcoin wallet addresses to watch.
  required: true
  type: [string, list]
{% endconfiguration %}
