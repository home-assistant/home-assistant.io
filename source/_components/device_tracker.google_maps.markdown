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
ha_release: 0.66
ha_category: Presence Detection
ha_iot_class: "Cloud Polling"
---

The `google_maps` platform allows you to detect presence using the unofficial API of [Google Maps Location Sharing](https://myaccount.google.com/locationsharing). 

You first need to create an additional Google account and share your location with that account. This platform will use that account to fetch the location of your device(s). You have to setup sharing through the Google Maps app on your mobile phone. You can find more information [here](https://support.google.com/accounts?p=location_sharing).

This platform will create a file named `google_maps_location_sharing.conf` where it caches your login session.

<p class='note warning'>
Since this platform is using an official API with the help of [locationsharinglib](https://github.com/costastf/locationsharinglib), Google seems to block access to your data the first time you've logged in with this component.
This issue can be fixed by logging in with your new account and approving your login on the [Device Activity](https://myaccount.google.com/device-activity) page.
</p>

To integrate Google Maps Location Sharing in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  platform: google_maps
  username: example@gmail.com
  password: password
```

Configuration variables:

- **username** (*Required*): The email address for the Google account that has access to your shared location.
- **password** (*Required*): The password for your given username.
