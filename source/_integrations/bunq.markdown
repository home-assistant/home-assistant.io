---
title: bunq
description: How to integrate your bunq bank accounts within Home Assistant.
logo: bunq.png
ha_category:
  - Finance
ha_release: 0.106
ha_iot_class: Cloud Polling
---

The bunq sensor platform allows you to monitor the balance of your bunq bank accounts in Home Assistant. A sensor is added for each account that is part of your account.

* Get a notification if your balance reaches a certain limit.
* Track your saving goals.
* Do not allow watching TV if you are in dept.

You can find more information about bunq at [their website](https://www.bunq.com). Information on their API can be found on their [developers site](https://doc.bunq.com).

## Api key

If you are a bunq user you need to generate an api key. Generate a production API key via the bunq app. Go to Profile → Security & Settings → Developers → API keys.

## Configuration

To add bunq account balance sensors to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: bunq
    api_key: 'API_KEY'
```

{% configuration %}
api_key:
  description: Your personal api key.
  required: true
  type: string
{% endconfiguration %}
