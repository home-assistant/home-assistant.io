---
layout: page
title: Foursquare
description: "Instructions how to the Foursquare API into Home Assistant."
date: 2016-08-08 17:20
sidebar: true
comments: false
sharing: true
footer: true
logo: foursquare.png
featured: false
ha_category: Social
ha_release: 0.26
ha_iot_class: "Cloud Polling and Cloud Push"
---

The `foursquare` component accepts pushes from the Foursquare [Real-Time API](https://developer.foursquare.com/overview/realtime) and a service to check users in on Swarm.

```yaml
# Example configuration.yaml entry
foursquare:
  access_token: "<foursquare access token>"
  push_secret: "<foursquare push secret>"
```

Configuration variables:

- **access_token** (*Required*): A Foursquare API access token.
- **push_secret** (*Required*): The push secret that Foursquare provides to you in the app dashboard.

### {% linkable_title Real-Time API %}

The component accepts pushes from Foursquare at `/api/foursquare`. The route does not require authentication.

Foursquare checkin events can be used out of the box to trigger automation actions, e.g.:

```yaml
automation:
  - alias: Trigger action when you check into a venue.
    trigger:
      platform: event
      event_type: foursquare.push
    action:
      service: script.turn_on
      entity_id: script.my_action
```

### {% linkable_title Check ins %}

To check a user in, use the `foursquare/checkin` service.

Parameters:

- **venueId** (*Required*): The Foursquare venue where the user is checking in.
- **eventId** (*Optional*): The event the user is checking in to.
- **shout** (*Optional*): A message about your check-in. The maximum length of this field is 140 characters.
- **mentions** (*Optional*): Mentions in your check-in. This parameter is a semicolon-delimited list of mentions. A single mention is of the form "start,end,userid", where start is the index of the first character in the shout representing the mention, end is the index of the first character in the shout after the mention, and userid is the userid of the user being mentioned. If userid is prefixed with "fbu-", this indicates a Facebook userid that is being mention. Character indices in shouts are 0-based.
- **broadcast** (*Optional*): "Who to broadcast this check-in to. Accepts a comma-delimited list of values: private (off the grid) or public (share with friends), facebook share on facebook, twitter share on twitter, followers share with followers (celebrity mode users only), If no valid value is found, the default is public."
- **ll** (*Optional*): Latitude and longitude of the user's location. Only specify this field if you have a GPS or other device reported location for the user at the time of check-in.
- **llAcc** (*Optional*): Accuracy of the user's latitude and longitude, in meters.
- **alt** (*Optional*): Altitude of the user's location, in meters.
- **altAcc** (*Optional*): Vertical accuracy of the user's location, in meters.
