---
title: 17TRACK
description: Instructions on how to use 17track.net data within Home Assistant
ha_category:
  - Postal Service
ha_release: 0.83
ha_config_flow: true
ha_iot_class: Cloud Polling
ha_codeowners:
  - '@shaiu'
ha_domain: seventeentrack
ha_platforms:
  - sensor
ha_integration_type: service
---

The **17TRACK** {% term integration %} allows users to get package data tied to their [17track.net](https://www.17track.net) account. The integration creates both summary sensors, which show the number of packages in a current state (e.g., "In Transit"), as well as individual sensors for each package within the account.

{% important %}
Although the 17track.net website states that account passwords cannot be longer than 16 characters, users can technically set longer-than-16-character passwords. These passwords **will not** work with the used API. Therefore, please ensure that your 17track.net password does not exceed 16 characters.
{% endimportant %}

{% include integrations/config_flow.md %}

## Package statuses

[17track's API](https://api.17track.net/en/doc) provides the following tracking statuses. The integration creates a sensor for each status, which contains the packages in that status. The sensor's displayed value is the number of packages in that status.

- Not found
- In transit
- Expired
- Ready to be picked up
- Undelivered
- Delivered
- Returned

## Examples

### Dashboard summary card

To display package information on your dashboard, first create a trigger-based template sensor that calls the `seventeentrack.get_packages` action:

```yaml
template:
  - trigger:
      - trigger: time_pattern
        hours: /1
      - trigger: homeassistant
        event: start
    action:
      - action: seventeentrack.get_packages
        data:
          config_entry_id: YOUR_CONFIG_ENTRY_ID
          package_state:
            - in_transit
        response_variable: result
    sensor:
      - name: "Packages in transit"
        unique_id: packages_in_transit
        state: "{{ result.packages | count }}"
        attributes:
          packages: "{{ result.packages }}"
```

Then use a templated Markdown card to list all packages in transit along with their status:

```yaml
type: markdown
title: Packages in transit
content: >
  {% for package in state_attr('sensor.packages_in_transit', 'packages') %}

  - **{{ package.friendly_name }} ({{ package.tracking_number }}):** {{
  package.info_text }}

  {% endfor %}
```

{% tip %}
To find your `config_entry_id`, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the 17Track integration, click the three-dot menu, and select **Copy entry ID**.
{% endtip %}

{% include integrations/actions.md %}
