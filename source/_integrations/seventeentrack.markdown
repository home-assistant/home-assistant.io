---
title: 17TRACK
description: Instructions on how to use 17track.net data within Home Assistant
ha_category:
  - Postal Service
ha_release: 0.83
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_domain: seventeentrack
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `seventeentrack` sensor platform allows users to get package data tied to their [17track.net](https://api.17track.net/en) account. The platform creates both summary sensors, which show the number of packages in a current state (e.g., "In Transit"), as well as individual sensors for each package within the account.

## Getting Your API Token

1. Register for an account at [17track.net](https://user.17track.net/en/register).
2. Enter the verification code sent to your email.
3. Select "Developer Account".
4. Complete registration, phone number and skype are not required.
6. Open the [settings page](https://api.17track.net/en/admin/settings) from the Dashboard.
7. API Token will be displayed under the Security tab.

{% include integrations/config_flow.md %}

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
