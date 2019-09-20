---
title: "Ombi Sensor"
description: "Instructions on how to set up Ombi sensors in Home Assistant."
logo: ombi.png
ha_category:
  - Sensor
ha_release: 1.00
ha_iot_class: Local Polling
---

The `Ombi` sensor platform pulls data from your [Ombi](https://ombi.io) instance.

## Setup

To find your `api_key` open the Ombi web interface and navigate to `Settings` and then to `Ombi`, the `api_key` should then be visible.

## Configuration

If you want to enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: ombi
    api_key: OMBI_API_KEY
    host: OMBI_HOST
```

{% configuration %}
api_key:
  description: Your Ombi API key.
  required: true
  type: string
host:
  description: The hostname or IP Address Ombi is running on.
  required: true
  default: localhost
  type: string
port:
  description: The port Ombi is running on.
  required: false
  default: 5000
  type: integer
urlbase:
  description: The Base URL path of your Ombi instance.
  required: false
  type: string
ssl:
  description: Whether or not to use SSL when connecting to Ombi.
  required: false
  default: false
  type: boolean
scan_interval:
  description: Polling rate in seconds.
  required: false
  default: 60
  type: integer
monitored_conditions:
  description: A list of conditions to monitor.
  required: false
  type: list
  keys:
    movies:
      description: Total number of movie requests.
    tv:
      description: Total number of TV show requests.
    pending:
      description: Number of pending requests.
    approved:
      description: Number of approved requests. *Note* Only includes approved requests that are yet to be available.
    available:
      description: Number of requests that are available.
  default: all
{% endconfiguration %}

## Full example for the configuration

```yaml
# Example configuration.yaml entry
sensor:
  - platform: 
    api_key: OMBI_API_KEY
    host: OMBI_HOST
    port: OMBI_PORT
    urlbase: ombi/
    ssl: true
    scan_interval: 10
    monitored_conditions:
      - movies
      - tv
```
