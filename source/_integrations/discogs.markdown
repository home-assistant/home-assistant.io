---
title: Discogs
description: Instructions on how to set up Discogs sensors within Home Assistant.
ha_category:
  - Multimedia
ha_release: 0.61
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@thibmaek'
ha_domain: discogs
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `discogs` platform allows you to see the current amount of records in your [Discogs](https://www.discogs.com) collection.

## Setup

First, you'll need to get a personal access token from your Discogs account.
You can generate a token from your profile's [Developer settings](https://www.discogs.com/settings/developers).

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: discogs
    token: YOUR_TOKEN
```

The monitored conditions can create a sensor which displays the amount of records currently in your collection and/or wantlist, and an option to pick a random record from your collection.

{% configuration %}
token:
  description: The Discogs API token to use as identification to get your collection.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
monitored_conditions:
  description: A list of sensor to include.
  required: false
  type: list
  keys:
    collection:
      description: Shows the amount of records in the user's collection.
    wantlist:
      description: Shows the amount of records in the user's wantlist.
    random_record:
      description: Proposes a random record from the collection to play.
{% endconfiguration %}
