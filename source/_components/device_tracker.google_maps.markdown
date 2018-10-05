---
layout: page
title: "Google Maps Location Sharing"
description: "Instructions how to use Google Maps Location Sharing to track devices in Home Assistant."
date: 2017-02-12 10:00
sidebar: true
comments: false
sharing: true
footer: true
logo: google_maps.png
ha_release: 0.67
ha_category: Presence Detection
ha_iot_class: "Cloud Polling"
---

The `google_maps` platform allows you to detect presence using the unofficial API of [Google Maps Location Sharing](https://myaccount.google.com/locationsharing).

## {% linkable_title Configuration %}

You first need to create an additional Google account and share your location with that account. This platform will use that account to fetch the location of your device(s). You have to setup sharing through the Google Maps app on your mobile phone. You can find more information [here](https://support.google.com/accounts?p=location_sharing).

This platform will create a file named `.google_maps_location_sharing.cookies` where it caches your login session.

<p class='note warning'>
Since this platform is using an unofficial API with the help of [locationsharinglib](https://github.com/costastf/locationsharinglib), Google seems to block access to your data the first time you've logged in with this platform.
This issue can be fixed by logging in with your new account and approving your login on the [Device Activity](https://myaccount.google.com/device-activity) page.
</p>

To integrate Google Maps Location Sharing in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: google_maps
    username: YOUR_USERNAME
    password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: The email address for the Google account that has access to your shared location.
  required: true
  type: string
password:
  description: The password for your given username.
  required: true
  type: string
max_gps_accuracy:
   description: Sometimes Google Maps can report GPS locations with a very low accuracy (few kilometers). That can trigger false zoning. Using this parameter, you can filter these false GPS reports. The number has to be in meters. For example, if you put 200 only GPS reports with an accuracy under 200 will be taken into account - Defaults to 100km if not specified.
   required: false
   type: float
{% endconfiguration %}
