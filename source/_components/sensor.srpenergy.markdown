---
layout: page
title: "SRP Engery Sensor"
description: "How to integrate SRP Energy within Home Assistant."
date: 2018-10-30 08:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Energy
featured: false
ha_release: "0.81"
ha_iot_class: "Cloud Polling"
---

The `srp_energy` component shows information from Srp hourly energy usage report for their customers. The srpenergy module fetches the data found on the website.

You need a Username, Password, and AccountId which you can create at [Srp](https://www.srpnet.com).

To add Srp Energy to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: srp_energy
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
    id: YOUR_ACCOUNT_ID
```

Configuration variables:

- **username** (*Required*): Your username for SRP.
- **password** (*Required*): Your password for SRP.
- **id** (*Required*): Your account id for SRP.

Details about the API are available in the [SRP Energy Developers API documentation](https://srpenergy-api-client-python.readthedocs.io/en/latest/?badge=latest).
