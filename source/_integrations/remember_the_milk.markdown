---
title: Remember The Milk
description: Instructions on how to use Remember The Milk with Home Assistant.
ha_category:
  - Calendar
ha_iot_class: Cloud Push
ha_release: 0.57
ha_domain: remember_the_milk
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
ha_quality_scale: legacy
---

The **Remember The Milk** {% term integration %} allows you to create tasks in [Remember The Milk (RTM)](https://www.rememberthemilk.com) from Home Assistant. You can use this if you want Home Assistant to send you a task that you should not forget, e.g., water the plants. The integration allows you to have several RTM accounts in parallel.

## Setup

The setup consists of two steps: getting an API key and registering your account

### Step 1: API key

To be able to use this integration, you need a Remember The Milk account and you need to apply for your own [API key](https://www.rememberthemilk.com/services/api/keys.rtm). With the API key you will also receive your personal shared secret. Both of them need to be stored in your Home Assistant {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry

remember_the_milk:
  - name: your_rtm_username
    api_key: YOUR_API_KEY
    shared_secret: YOUR_SHARED_SECRET

```

{% configuration %}
  name:
    description: Your RTM username, as you can have several accounts in RTM. The name must be unique.
    required: true
    type: string
  api_key:
    description: Put the API key you've received in here.
    required: true
    type: string
  shared_secret:
    description: Put the shared secret you've received in here.
    required: true
    type: string
{% endconfiguration %}

### Step 2: Registering your account

After you save the configuration:

1. Restart Home Assistant. When it starts again, you receive a "Configurator" notification in Home Assistant.
2. Select **Configure**.
3. On the dialog, select **Remember The Milk login** and log into Remember The Milk website.
4. Select **OK, I'll allow it** to authorize Home Assistant to access your Remember The Milk account.
5. Close the RTM browser tab, and back in Home Assistant, select **login completed**.

This tells Home Assistant that you have completed the login process on the Remember The Milk page and Home Assistant should try to register with this account.

If the registration was successful, the Configurator notification disappears from your Home Assistant notifications.

In the background, Home Assistant downloaded a token from the Remember The Milk server, stored in the `remember_the_milk.conf` file locally.

### Verifying configuration

To confirm that your configuration was successful, go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Remember The Milk**.
The integration should now show `1 entity` and if you select it, it should be named after your RTM username.

{% include integrations/actions.md %}

## Automation example

Here's an example for an automation that creates a new task whenever `sensor.mysensor` is `on` and completes it when the sensor reports `off`. This way it reminds you to switch it off. By using the `entity_id` as ID for the task, you can use the same rule also for multiple sensors.

```yaml
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
```

## Disclaimer

This integration uses the Remember The Milk API but is not endorsed or certified by Remember The Milk.
