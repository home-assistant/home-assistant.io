---
title: "Google Maps Location Sharing"
description: "Instructions how to use Google Maps Location Sharing to track devices in Home Assistant."
logo: google_maps.png
ha_release: 0.67
ha_category:
  - Presence Detection
ha_iot_class: Cloud Polling
redirect_from:
 - /components/device_tracker.google_maps/
---

The `google_maps` platform allows you to detect presence using the unofficial API of [Google Maps Location Sharing](https://myaccount.google.com/locationsharing).

## Configuration

You first need to create an additional Google account and share your location with that account. This platform will use that account to fetch the location of your device(s). 

1. You have to setup sharing through the Google Maps app on your mobile phone. You can find more information [here](https://support.google.com/accounts?p=location_sharing).
2. You must use `mapscookiegettercli` to get a cookie file which can be used with this device tracker.  See more information [here](#maps-cookie-getter)
3. Save the cookie file to your Home Assistant configuration directory with the following name: `.google_maps_location_sharing.cookies.` followed by the slugified username of the NEW Google account.
    - For example: if your email was `location.tracker@gmail.com`, the filename would be: `.google_maps_location_sharing.cookies.location_tracker_gmail_com`.

<div class='note warning'>

Since this platform is using an unofficial API with the help of [locationsharinglib](https://github.com/costastf/locationsharinglib), Google seems to block access to your data the first time you've logged in with this platform.
This issue can be fixed by logging in with your new account and approving your login on the [Device Activity](https://myaccount.google.com/device-activity) page.

</div>

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
password:
  description: The password for your given username.
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

### Maps Cookie Getter

You must run the [`mapscookiegetter`](https://mapscookiegettercli.readthedocs.io/en/latest/) tool to get the cookie file from a computer with a Web Browser.  To install, your computer must have Python 3 and PIP installed:

```shell
pip3 install mapscookiegettercli
```

Then run the command:
```shell
maps-cookie-getter
```

This will open up a browser window for you to log-in to the NEW Google Account (the one you are sharing the location with, not your normal account). After logging in, the program will save the pickled cookie file `location_sharing.cookies` in the same directory as you ran the command from. Copy this to your Home Assistant configuration directory and rename as described above.