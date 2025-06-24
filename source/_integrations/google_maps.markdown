---
title: Google Maps
description: Instructions how to use Google Maps Location Sharing to track devices in Home Assistant.
ha_release: 0.67
ha_category:
  - Presence detection
ha_iot_class: Cloud Polling
ha_domain: google_maps
ha_platforms:
  - device_tracker
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `google_maps` {% term integration %} allows you to detect presence using the unofficial API of [Google Maps Location Sharing](https://myaccount.google.com/locationsharing).

## Setup

You need two Google accounts. Account A is the account that has to be set up to share its location with account B. Account B is used to fetch the location of your device(s) and will be connected to this integration. 

1. You first have to setup sharing of the location of account A through the Google Maps app on your mobile phone. Share your location with account B. You can find more information [here](https://support.google.com/accounts?p=location_sharing).
2. Next, you have to retrieve a valid cookie from Google, while being logged in with account B. Log in with your credentials of account B on [Google Maps](https://www.google.com/maps) with a PC with Firefox or Chrome. Make sure to use the `.com` TLD (e.g., maps.google.com), otherwise the cookie won't be able to provide a valid session. After you have properly authenticated, you can retrieve the cookie with either [Export cookies](https://addons.mozilla.org/en-US/firefox/addon/export-cookies-txt/?src=search) for Firefox (make sure that "Prefix HttpOnly cookies" is unchecked) or [get_cookies.txt locally](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) for Chrome/Chromium.
3. Save the cookie file to your Home Assistant configuration directory with the following name: `.google_maps_location_sharing.cookies.` followed by the slugified username of the NEW Google account (account B). 
   - For example: If your email address was `location.tracker@gmail.com`, the filename would be: `.google_maps_location_sharing.cookies.location_tracker_gmail_com`.

### Note for existing location sharing users

If you already have other people sharing their location with your existing Account A and do not wish to ask them to also share their location with a new Account B. Simply repeat the steps above to obtain a valid cookie from Google for Account A. Then add both accounts to the device tracker configuration (don’t forget to include the multiple cookie files, one for each account being added to the integration).

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: google_maps
    username: "ACCOUNT_A_EMAIL"
  - platform: google_maps
    username: "ACCOUNT_B_EMAIL"
```

{% note %}
If using more than one account, your own device may show twice, however, the parameters returned from Account A will not include a value for battery_level or entity_picture. These parameters will be present in your device tracker entity from Account B. Therefore, disregard the device tracker entity with is missing those parameters. 
{% endnote %}

## Configuration

To integrate Google Maps Location Sharing in Home Assistant, add the following section to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: google_maps
    username: "YOUR_EMAIL"
```

Once enabled and you have rebooted devices discovered through this integration will be listed in the `known_devices.yaml` file within your configuration directory.

They will be created with identifiers like `google_maps_<numeric_id>`. To be able to properly track entities you must set the `track` attribute to `true`. 

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

{% note %}
As of release 0.97 Google passwords are no longer required in your configuration. Users coming from earlier releases should only remove the password entry from their configuration file (username is still required) and restart Home Assistant. The cookie file previously generated should still be valid and will allow the tracker to continue functioning normally until the cookie is invalidated.
{% endnote %}
