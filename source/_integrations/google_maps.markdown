---
title: "Google Maps Location Sharing"
description: "Instructions how to use Google Maps Location Sharing to track devices in Home Assistant."
logo: google_maps.png
ha_release: 0.67
ha_category:
  - Presence Detection
ha_iot_class: Cloud Polling
---

The `google_maps` platform allows you to detect presence using the unofficial API of [Google Maps Location Sharing](https://myaccount.google.com/locationsharing).

## Configuration

You first need to create an additional Google account and share your location with that account. This platform will use that account to fetch the location of your device(s). 

1. You have to setup sharing through the Google Maps app on your mobile phone. You can find more information [here](https://support.google.com/accounts?p=location_sharing).
2. You need to use the cookies from that account after you have properly authenticated which you can retrieve with either [Export cookies](https://addons.mozilla.org/en-US/firefox/addon/export-cookies-txt/?src=search) for firefox (make sure that "Prefix HttpOnly cookies" is unchecked) or [cookies.txt](https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg?hl=en-US) for chrome.
3. Save the cookie file to your Home Assistant configuration directory with the following name: `.google_maps_location_sharing.cookies.` followed by the slugified username of the NEW Google account.
    - For example: if your email was `location.tracker@gmail.com`, the filename would be: `.google_maps_location_sharing.cookies.location_tracker_gmail_com`.

To integrate Google Maps Location Sharing in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: google_maps
    username: YOUR_USERNAME
```

{% configuration %}
username:
  description: The email address for the Google account that has access to your shared location.
  required: true
  type: string
max_gps_accuracy:
   description: Sometimes Google Maps can report GPS locations with a very low accuracy (few kilometers). That can trigger false zoning. Using this parameter, you can filter these false GPS reports. The number has to be in meters. For example, if you put 200 only GPS reports with an accuracy under 200 will be taken into account - Defaults to 100km if not specified.
   required: false
   type: float
scan_interval:
  description: The frequency (in seconds) to check for location updates.
  required: false
  default: 60
  type: integer
{% endconfiguration %}
