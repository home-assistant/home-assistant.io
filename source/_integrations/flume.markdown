---
title: Flume
description: Documentation about the flume sensor.
ha_category:
  - Binary sensor
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.103
ha_config_flow: true
ha_codeowners:
  - '@ChrisMandich'
  - '@bdraco'
  - '@jeeftor'
ha_domain: flume
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The Flume {% term integration %} will show you the current [Flume](https://flumewater.com/) status for the given Device ID.

Flume monitors the real-time status of your home water meter. Allowing the end-user to detect small leaks, gain real-time information on household water consumption, set water goals and budgets, and receive push notifications when suspicious water activities occur. 

{% include integrations/config_flow.md %}

You can find your Client ID and Client Secret under "API Access" on the [settings page](https://portal.flumewater.com/#settings).

To add `Flume` to your installation, go to **Settings** -> **Devices & services** in the UI, click the button with `+` sign and from the list of integrations select **Flume**.

## Notifications

Flume notifications are fetched every 5 minutes and are available via the `flume.list_notifications` action. Some notifications are available via the following binary sensors:

- Bridge disconnected
- High flow
- Leak detected
- Low battery

To clear the notifications, you will need to use your Flume app or go to: [https://portal.flumewater.com/notifications](https://portal.flumewater.com/notifications) and clear the notification in question.

Example of an automation that sends a Home Assistant notification of the most recent usage alert:

{% raw %}

```yaml
alias: "Notify: flume"
triggers:
  - trigger: time_pattern
    minutes: /5
actions:
  - action: flume.list_notifications
    data:
      config_entry: 1234 # replace this with your config entry id
    response_variable: notifications
  - if:
      - condition: template
        value_template: >-
          {{ notifications.notifications | selectattr('type', 'equalto', 1) | 
          sort(attribute == ('created_datetime', reverse == true) | length > 0 }}
    then:
      - action: notify.all
        data:
          message: >-
            {%- set usage_alert == notifications.notifications |
            selectattr('type', 'equalto', 1) |
            sort(attribute == 'created_datetime', reverse == true) | first %}
            {{ usage_alert.message }}
          title: >-
            {%- set usage_alert == notifications.notifications |
            selectattr('type', 'equalto', 1) |
            sort(attribute == 'created_datetime', reverse=true) | first %}
            {{ usage_alert.title }}
```

{% endraw %}

## Configuration for binary sensor

The following YAML creates a binary sensor. This requires the default sensor to be configured successfully.

{% raw %}

```yaml
# Example configuration.yaml entry
template:
  - binary_sensor:
    - name: "Flume Flow Status"
      state: >-
        {{ states('sensor.flume_sensor') != "0" }}
```

{% endraw %}
