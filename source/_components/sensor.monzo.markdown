---
layout: page
title: "Monzo"
description: "How to integrate Monzo within Home Assistant."
date: 2016-10-07 18:15
sidebar: true
comments: false
sharing: true
footer: true
logo: monzo.png
ha_category: Finance
ha_iot_class: "Cloud Polling"
ha_release: 0.31
---


The `Monzo` platform uses the [Monzo](https://monzo.com/) to retrieve data relating to your account balance.

You need an access token which can be retrieved from https://developers.monzo.com/.

To add Monzo to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: monzo
    access_token: ACCESS_TOKEN
    monitored_variables:
      - balance
      - currency
      - spend_today
      - local_currency
      - local_exchange_rate
```

Configuration variables:

- **access_token** (*Required*): Your access token for http://monzo.com/.
- **account_id** (_Optional_): An account id, if omitted the first account will be used.
- **monitored_variables** array (*Required*): Variables to display in the frontend.
  - **balance**: The account balance.
  - **currency**: The currency of the account.
  - **spend_today**: The days current spend.
  - **local_currency**: The local currency.
  - **local_exchange_rate**: The local exchange rate.

Details about the API are available in the [Monzo documentation](https://monzo.com/docs/).
