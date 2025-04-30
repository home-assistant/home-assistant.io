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

The `remember_the_milk` integration allows you to create tasks in [Remember The Milk (RTM)](https://www.rememberthemilk.com) from Home Assistant. You can use this if you want Home Assistant to send you a task that you should not forget, e.g., water the plants. The integration allows you to have several RTM accounts in parallel.

## Setup

The setup consists of two steps: getting an API key and registering your account

### Step 1: API key

To be able to use this integration, you need a Remember The Milk account and you need to apply for your own [API key](https://www.rememberthemilk.com/services/api/keys.rtm). With the API key you will also receive your personal shared secret. Both of them need to be stored in your Home Assistant {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry

remember_the_milk:
  - name: your_rtm_account
    api_key: YOUR_API_KEY
    shared_secret: YOUR_SHARED_SECRET

```

{% configuration %}
  name:
    description: Name of the RTM account, as you can have several accounts in RTM. The name must be unique.
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

After saving the configuration, you need to (re-)start Home Assistant. On the first start you will notice a new "Configuration" panel appearing on the Home Assistant page. After opening the configuration page, follow the link "Remember The Milk login". This will take you to a login page where you have to log in with your normal Remember The Milk credentials. This will authorize Home Assistant to access your Remember The Milk account.

After that click on the "login completed" button. This will tell Home Assistant that you have completed the login process on the Remember The Milk page and Home Assistant should try to register with this account.

If the registration was successful, the Configuration panel will disappear from your Home Assistant screen and a Remember The Milk panel should appear. This completes the setup process.

In the background Home Assistant downloaded a "token" from the Remember The Milk server which is stored in the `remember_the_milk.conf` file locally. So you only need to register once. After that the token is used to authenticate with the server.

## Creating/updating tasks with service `create_task`

This integration offers a new service domain `remember_the_milk` with the services `<account>_create_task`. You can call this service with the argument `name` and the optional parameter `id` to create a new task in your Remember The Milk account. You can call this service from your usual automations.

If you set an `id` and a task with that id exists already, the existing task is updated, rather than creating a new task. This way you can change the name of the task. If you do not set an `id`, a new task is created with every call. If you're using this from an automation, you could use the name of your automation as id or the entity that triggered the task to be created. This way you can later on update or complete this task.

The task creation supports the "smart syntax", so to create a task with the tag "from_hass" which is due today you can create a task with the name `test task created in Home Assistant ^today #from_hass`. More info about the smart syntax is available on the [Remember The Milk documentation](https://www.rememberthemilk.com/help/answer/basics-smartadd-howdoiuse).

**Note:**
At the moment, smart syntax is *not* supported when updating tasks. All smart syntax commands are ignored during the update and will end up as normal text in the name of the task.

| Data attribute | Optional | Description                                                                                  | Example                     |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------- | --------------------------- |
| name                   | no       | Name of the new task, you can use the smart syntax here.                                     | "do this ^today #from_hass" |
| id                     | yes      | Identifier for the task you're creating, can be used to update or complete the task later on | "myid"                      |

## Completing tasks with service `complete_task`

Complete a tasks that was privously created from Home Assistant. You can not complete tasks that were created outside of Home Assistant.

If you have created your task with an `id`, calling `<account>_complete_task` with the parameter `id` will then complete your task.

| Data attribute | Optional | Description                                        | Example |
| ---------------------- | -------- | -------------------------------------------------- | ------- |
| id                     | no       | Identifier that was defined when creating the task | "myid"  |

## Automation example

Here's an example for an automation that creates a new task whenever `sensor.mysensor` is `on` and completes it when the sensor reports `off`. This way it reminds you to switch it off. By using the `entity_id` as ID for the task, you can use the same rule also for multiple sensors.

{% raw %}

```yaml
- triggers:
    - trigger: state
      entity_id: sensor.mysensor
      to: "on"
  actions:
    - action: remember_the_milk.myaccount_create_task
      data:
        name: "Please switch off {{trigger.entity_id}}"
        id: "{{trigger.entity_id}}"
- triggers:
    - trigger: state
      entity_id: sensor.mysensor
      to: "off"
  actions:
    - action: remember_the_milk.myaccount_complete_task
      data:
        id: "{{trigger.entity_id}}"
```

{% endraw %}

## Disclaimer

This integration uses the Remember The Milk API but is not endorsed or certified by Remember The Milk.
