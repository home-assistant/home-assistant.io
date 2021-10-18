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
---

The `discogs` platform allows you to see the current amount of records in your [Discogs](https://www.discogs.com) collection and track marketplace listing statistics for a release.

## Setup

First, you'll need to get a personal access token from your Discogs account.
You can generate a token from your profile's [Developer settings](https://www.discogs.com/settings/developers).

### **Finding a Release ID**
A sub-release ID is a numeric ID (usually starting with **r**), that describes a specific sub-release of a Master release. 

You'll want to use only the sub-release's ID, *not the Master ID (starts with m)*. 

If your ID comes up with an unexpected name, this is likely the issue.

### **Showing different sensor values**
The `sort_by` option will allow you to change how the data is sorted, and what values are shown within the Recorder. 

**Allowed Values:**
- `price_asc` or `price_desc` will change the metric to their respective minimum/maximum values.
- `condition` will determine an average of the *Media Condition* and *Sleeve Condition* Metrics from Discogs. 

  (i.e. `(media_condition + sleeve_condition) / 2`)
- `newest` will show how many listings are available.

### **Known Issues**
When changing the Sensor's Metric *(i.e. going from showing `USD` based values to `Listings Available`)*, you will need to purge your Recorder of all previous history entries for the new units to show the correct metric within the UI's graph and allow statistical tracking to restart.

## Configuration

To enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: discogs
    token: YOUR_TOKEN
    marketplace:
      - id: RELEASE_ID
        sort_by: { price_asc | price_desc | newest | condition }
        limit: LIMIT
        
```

## Monitored Conditions:

The `monitored_conditions` can create a sensor which displays the amount of records currently in your collection and/or wantlist, an option to pick a random record from your collection, and the ability to track releases on the Discog Marketplace for pricing, quality, and availability.

{% configuration %}
token:
  description: The Discogs API token to use as identification to get your collection.
  required: true
  type: string
name:
  description: Name to use in the frontend.
  required: false
  type: string
marketplace:
  description: Contains the Releases that will be tracked
  required: false
  type: array
  items:
    type: object
    properties:
      id:
        type: integer
        description: The Release Numeric ID (Not the Album's Master Release, a specific release's ID, starts with **r**, not *m*)
      limit:
        type: integer
        description: The maximum number of results to use (from newest to oldest)
      sort_by:
        type: string
        description: Valid Values are `price_asc`, `price_desc`, `newest`, `condition`. 
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
