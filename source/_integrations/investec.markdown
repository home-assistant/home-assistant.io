---
title: Investec
description: How to integrate your Investec Bank account within Home Assistant.
ha_category:
  - Finance
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_domain: investec
---

The Investec sensor platform allows you to monitor your account balance data as sensors in Home Assistant.

* Turn off the lights when money's tight?
* Play a song when you reach a savings goal?
* Sound an alarm if you go into your overdraft?

You can find more information about Investec Programable banking on [their website](https://developer.investec.com/programmable-banking/#programmable-banking). Information on their API can be found on their [api docs site](https://developer.investec.com/programmable-banking/#open-api).

## Access Token

In order to obtain you OAuth credentials, simply:

1. Login to [Investec Online.](https://login.secure.investec.com/)
2. Navigate to the **Programmable Banking** landing page.
3. Select the **Open API** tab.
4. Select the **Enroll** button.

## Configuration

To add Investec account balance sensors to your installation, add the following to your `configuration.yaml` file:
```yaml
sensor:
  - platform: investec
    client_id: YOUR_CLIENT_ID
    client_secret: YOUR_CLIENT_SECRET
```

If all goes well after starting home assistant all your Investec accounts will load as sensor entities.

