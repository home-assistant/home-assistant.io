---
title: Foursquare
description: Instructions on how to the Foursquare API into Home Assistant.
ha_category:
  - Social
ha_release: 0.26
ha_iot_class: Cloud Push
ha_domain: foursquare
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The `foursquare` {% term integration %} accepts pushes from the Foursquare [Real-Time API](https://developer.foursquare.com/overview/realtime) and an action to check users in on Swarm.

To enable Foursquare, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
foursquare:
  access_token: "<foursquare access token>"
  push_secret: "<foursquare push secret>"
```

{% configuration %}
access_token:
  description: A Foursquare API access token.
  required: true
  type: string
push_secret:
  description: The push secret that Foursquare provides to you in the app dashboard.
  required: true
  type: string
{% endconfiguration %}

## Getting the access token

After you have registered your APP on your [My Apps Page](https://foursquare.com/developers/apps) you get a `CLIENT_ID` and you have specified a
`REDIRECT_URL` which can be any URL you like, but since it will get your access token via an HTTP GET request, it should be a URL which will ignore the `access_token` HTTP GET variable. A good idea is to choose the URL of your Home Assistant.
Visit the following URL in your browser:

```txt
https://foursquare.com/oauth2/authenticate?client_id=CLIENT_ID&response_type=token&redirect_uri=YOUR_REGISTERED_REDIRECT_URI
```

and change the `CLIENT_ID` and `YOUR_REGISTERED_REDIRECT_URL` to your actual values.
You will receive an OAuth request landing page, asking you if you want to connect your Foursquare account to your newly created app. Say "Yes".
After that, you will get redirected to your `REDIRECT_URL` with the `access_token` as an HTTP GET variable. Copy everything after the = and paste it in your {% term "`configuration.yaml`" %} as the `access_token`.

### Real-Time API

The integration accepts pushes from Foursquare at `/api/foursquare`. The route does not require authentication.

Foursquare check-in events can be used out of the box to trigger automation actions, e.g.:

```yaml
automation:
  - alias: "Trigger action when you check into a venue."
    triggers:
      - trigger: event
        event_type: foursquare.push
    actions:
      - action: script.turn_on
        target:
          entity_id: script.my_action
```

### Check ins

To check a user in, use the `foursquare/checkin` action.

Parameters:

- **venueId** (*Required*): The Foursquare venue where the user is checking in.
- **eventId** (*Optional*): The event the user is checking in to.
- **shout** (*Optional*): A message about your check-in. The maximum length of this field is 140 characters.
- **mentions** (*Optional*): Mentions in your check-in. This parameter is a semicolon-delimited list of mentions. A single mention is of the form "start,end,userid", where start is the index of the first character in the shout representing the mention, end is the index of the first character in the shout after the mention, and userid is the userid of the user being mentioned. If userid is prefixed with "fbu-", this indicates a Facebook userid that is being mention. Character indices in shouts are 0-based.
- **broadcast** (*Optional*): "Who to broadcast this check-in to. Accepts a comma-delimited list of values: private (off the grid) or public (share with friends), Facebook share on Facebook, X share on X, followers share with followers (celebrity mode users only), If no valid value is found, the default is public."
- **ll** (*Optional*): Latitude and longitude of the user's location. Only specify this field if you have a GPS or other device reported location for the user at the time of check-in.
- **llAcc** (*Optional*): Accuracy of the user's latitude and longitude, in meters.
- **alt** (*Optional*): Altitude of the user's location, in meters.
- **altAcc** (*Optional*): Vertical accuracy of the user's location, in meters.
