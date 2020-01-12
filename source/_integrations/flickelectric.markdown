---
title: Flick Electric
description: Instructions on how to set up the Flick Electric Pricing sensor in Home Assistant.
logo: flickelectric.png
ha_category:
  - Energy
ha_release: '0.104'
ha_iot_class: Cloud Polling
---

[Flick Electric Co](https://www.flickelectric.co.nz/) is a power company in New Zealand, based around a transparent pricing model where each component of pricing is provided. This integration uses the mobile app's API from Flick Electric Co to get the current power price as well as each of the components price.

The integration includes the client ID and secret used by the app at time of release. If this stops working, you can find the new ones by using a MITM proxy on the app. The app will call `https://api.flick.energy/identity/oauth/token` with the `client_id` and `client_secret`.

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: flickelectric
    username: "myemailaddress@example.com"
    password: "mypassword"
```

{% configuration %}
username:
  description: Username used to log into account.
  required: true
  type: string
password:
  description: Password used to log into account.
  required: true
  type: string
client_id:
  description: Change this if the default ID/secret stop working.
  required: false
  type: string
client_secret:
  description: Change this if the default ID/secret stop working.
  required: false
  type: string
{% endconfiguration %}
