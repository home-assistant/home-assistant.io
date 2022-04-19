---
title: 17TRACK
description: Instructions on how to use 17track.net data within Home Assistant
ha_category:
  - Postal Service
ha_release: 0.83
ha_iot_class: Cloud Polling
ha_domain: seventeentrack
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `seventeentrack` sensor platform allows users to get package data tied to their [17track.net](https://api.17track.net/en) account. The platform creates both summary sensors, which show the number of packages in a current state (e.g., "In Transit"), as well as individual sensors for each package within the account.

## Getting Your API Token

To get an API token:
1. Login to your account on [17track.net](https://api.17track.net/en)
2. Open the settings page from the menu
3. API Token will be displayed under the Security tab

## Configuration

To enable the platform, add the following lines to your `configuration.yaml`
file:

```yaml
sensor:
  - platform: seventeentrack
    token: API_TOKEN
```

{% configuration %}
token:
  description: The API token provided for your 17track.net account.
  required: true
  type: string
show_archived:
  description: Whether sensors should be created for archived packages.
  required: false
  type: boolean
  default: false
show_delivered:
  description: Whether sensors should be created for delivered packages.
  required: false
  type: boolean
  default: false
{% endconfiguration %}

## Examples

### Dashboard summary card

Use the following templated Markdown card to list all packages in transit along with their status:

{% raw %}

```yaml
type: markdown
title: Packages in transit
content: >
  {% for package in
  states.sensor.seventeentrack_packages_in_transit.attributes.packages %}

  >- **{{ package.friendly_name }} ({{ package.tracking_number }}):** {{
  package.info_text }}

  {% endfor %}

```

{% endraw %}
