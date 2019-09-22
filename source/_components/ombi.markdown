---
title: "Ombi"
description: "Instructions on how to set up the Ombi integration in Home Assistant."
logo: ombi.png
ha_category:
  - Sensor
ha_release: "0.100"
ha_iot_class: Local Polling
---

The `Ombi` integration monitors data from your [Ombi](https://ombi.io) instance.

## Setup

To find your `api_key` open the Ombi web interface. Navigate to **Settings** and then to **Ombi**, you should then be able to see your `api_key`.

## Configuration

If you want to enable this sensor, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
ombi:
  api_key: OMBI_API_KEY
  host: OMBI_HOST
  username: OMBI_USERNAME
```

{% configuration %}
api_key:
  description: Your Ombi API key.
  required: true
  type: string
host:
  description: The hostname or IP Address Ombi is running on.
  required: true
  type: string
username:
  description: Your Ombi username.
  required: true
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
{% endconfiguration %}

## Full example for the configuration

```yaml
# Example configuration.yaml entry
ombi:
  api_key: OMBI_API_KEY
  host: OMBI_HOST
  username: OMBI_USERNAME
  port: OMBI_PORT
  urlbase: ombi/
  ssl: true
```

## Services

### Submit request services

Available services: `submit_movie_request`, `submit_music_request`, `submit_tv_request`

#### Service `submit_movie_request`

Searches and requests the closest matching movie.

| Service data attribute | Optional | Description                                      |
| ---------------------- | -------- | ------------------------------------------------ |
| `name`                 |      no  | Search parameter.                                |

#### Service `submit_music_request`

Searches and requests the closest matching music album.

| Service data attribute | Optional | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `name`                 |      no  | Search parameter.                                |

#### Service `submit_tv_request`

Searches and requests the closest matching TV show.

| Service data attribute | Optional | Description                                                                                   |
|------------------------|----------|-----------------------------------------------------------------------------------------------|
| `name`                 |       no | Search parameter.                                                                             |
| `season`               |      yes | Which season(s) to request. Must be one of `first`, `latest` or `all`. Defaults to latest.    |
