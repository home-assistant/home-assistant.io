---
title: Ombi
description: Instructions on how to set up the Ombi integration in Home Assistant.
ha_category:
  - Sensor
ha_release: '0.100'
ha_iot_class: Local Polling
ha_codeowners:
  - '@larssont'
ha_domain: ombi
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The Ombi integration monitors data from your [Ombi](https://ombi.io) instance.

## Setup

This {% term integration %} needs to authenticate to your Ombi instance with either a user `password` or an `api_key`.

To find your `api_key` open the Ombi web interface. Navigate to **Settings** and then to **Ombi**, you should then be able to see your `api_key`.

If you want to use `password` authentication simply use the same `password` you normally use to login to Ombi. Alternatively, you can set up a separate local account in Ombi designated for Home Assistant. In order to do this, open the Ombi web interface. Navigate to **User Management** and then press **Add User To Ombi**. Input your desired user details and use the same details when configuring this integration.

## Configuration

If you want to enable this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
ombi:
  host: OMBI_HOST
  username: OMBI_USERNAME
  password: OMBI_PASSWORD
```

{% configuration %}
host:
  description: The hostname or IP Address Ombi is running on.
  required: true
  type: string
username:
  description: Your Ombi username.
  required: true
  type: string
password:
  description: Your Ombi password. [`password`](#password) and [`api_key`](#api_key) cannot be specified concurrently.
  required: exclusive
  type: string
api_key:
  description: Your Ombi API key. [`password`](#password) and [`api_key`](#api_key) cannot be specified concurrently.
  required: exclusive
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
  host: OMBI_HOST
  username: OMBI_USERNAME
  api_key: OMBI_API_KEY
  port: OMBI_PORT
  urlbase: ombi/
  ssl: true
```

## Actions

### Submit request actions

Available actions: `submit_movie_request`, `submit_music_request`, `submit_tv_request`

#### Action `submit_movie_request`

Searches and requests the closest matching movie.

| Data attribute | Optional | Description       |
| ---------------------- | -------- | ----------------- |
| `name`                 | no       | Search parameter. |

#### Action `submit_music_request`

Searches and requests the closest matching music album.

| Data attribute | Optional | Description       |
| ---------------------- | -------- | ----------------- |
| `name`                 | no       | Search parameter. |

#### Action `submit_tv_request`

Searches and requests the closest matching TV show.

| Data attribute | Optional | Description                                                                                |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `name`                 | no       | Search parameter.                                                                          |
| `season`               | yes      | Which season(s) to request. Must be one of `first`, `latest` or `all`. Defaults to latest. |
