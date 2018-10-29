---
layout: page
title: "Rachio"
description: "Instructions on how to use Rachio with Home Assistant."
date: 2018-06-23 16:04
sidebar: true
comments: false
sharing: true
footer: true
logo: rachio.png
ha_category: Irrigation
ha_iot_class: "Cloud Push"
ha_release: 0.73
---

The `rachio` platform allows you to control your [Rachio irrigation system](http://rachio.com/).

## {% linkable_title Getting your Rachio API Key %}

1. Log in at [https://app.rach.io/](https://app.rach.io/).
1. Click the "Account Settings" menu item at the bottom of the left sidebar
1. Click "Get API Key"
1. Copy the API key from the dialog that opens.

## {% linkable_title Configuration %}

To add this platform to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rachio:
  api_key: YOUR_API_KEY
```

{% configuration %}
api_key:
  description: The API key for the Rachio account.
  required: true
  type: string
hass_url_override:
  description: If your instance is unaware of its actual web location (`base_url`).
  required: false
  type: string
manual_run_mins:
  description: For how long, in minutes, to turn on a station when the switch is enabled.
  required: false
  default: 10
  type: integer
{% endconfiguration %}

<p class='note'>
**Water-saving suggestion:**<br>
Set `manual_run_mins` to a high maximum failsafe value when using scripts to control zones. If something goes wrong with your script, Home Assistant, or you hit the Rachio API rate limit of 1700 calls per day, the controller will still turn off the zone after this amount of time.
</p>

Once configured, [Rachio Binary Sensor](/components/binary_sensor.rachio/) and [Rachio Switch](/components/switch.rachio/) platforms will be automatically loaded.

### {% linkable_title iFrame %}

If you would like to see and control more detailed zone information, create an [iFrame](/components/panel_iframe/) that renders the Rachio web app.

```yaml
panel_iframe:
  rachio:
    title: Rachio
    url: "https://app.rach.io"
    icon: mdi:water-pump
```
