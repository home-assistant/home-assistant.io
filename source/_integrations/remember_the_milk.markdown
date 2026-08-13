---
title: Remember The Milk
description: Instructions on how to use Remember The Milk with Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Push
ha_release: 0.57
ha_domain: remember_the_milk
ha_integration_type: service
ha_config_flow: true
ha_quality_scale: legacy
---

The **Remember The Milk** {% term integration %} allows you to create tasks in [Remember The Milk](https://www.rememberthemilk.com) (<abbr title="Remember The Milk">RTM</abbr>) from Home Assistant. You can use this if you want Home Assistant to send you a task you should not forget, for example, to water the plants. The integration supports connecting several Remember The Milk accounts.

## Prerequisites

You need a Remember The Milk account, an API key, and a shared secret.

1. Sign in to your [Remember The Milk account](https://www.rememberthemilk.com).
2. Apply for an [API key](https://www.rememberthemilk.com/services/api/keys.rtm). You also receive a shared secret when the key is approved.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: The API key of your Remember The Milk API application.
Shared secret:
  description: The shared secret of your Remember The Milk API application.
{% endconfiguration_basic %}

After you enter your API key and shared secret, Home Assistant shows an **Authorize** link. Select the link to allow Home Assistant to access your Remember The Milk account on the Remember The Milk website. When you have completed the authorization, return to Home Assistant and select **Submit** to finish the setup.

To connect more than one account, add the integration again for each Remember The Milk account.

### Migrating from YAML

If you have a `remember_the_milk:` entry in your {% term "`configuration.yaml`" %}, it will be imported automatically. After a successful import, remove the entry from `configuration.yaml` and manage the integration from the UI.

### Verifying configuration

To confirm that your configuration was successful, go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Remember The Milk**.
The integration should now show **1 entity** and if you select it, it should be named after your RTM username.

{% include integrations/actions.md %}

## Automation example

Here's an example for an automation that creates a new task whenever `sensor.mysensor` is `on` and completes it when the sensor reports `off`. This way it reminds you to switch it off. By using the `entity_id` as ID for the task, you can use the same rule also for multiple sensors.

{% example %}
automation: |
  alias: "Match fan to ceiling light"
    - triggers:
        - trigger: state
          entity_id: sensor.mysensor
          to: "on"
      actions:
        - action: remember_the_milk.my_rtm_username_create_task
          data:
            name: "Please switch off {{ trigger.entity_id }}"
            id: "{{ trigger.entity_id }}"
    - triggers:
        - trigger: state
          entity_id: sensor.mysensor
          to: "off"
      actions:
        - action: remember_the_milk.my_rtm_username_complete_task
          data:
            id: "{{ trigger.entity_id }}"
{% endexample %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

## Disclaimer

This integration uses the Remember The Milk API but is not endorsed or certified by Remember The Milk.
