---
title: IFTTT
description: Instructions on how to setup IFTTT within Home Assistant.
ha_category:
  - Automation
ha_iot_class: Cloud Push
ha_release: 0.8
ha_config_flow: true
ha_domain: ifttt
ha_platforms:
  - alarm_control_panel
---

[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so-called "Applets". With the IFTTT component, you can trigger applets through the **"Webhooks"** service (which was previously the **"Maker"** channel).

## Prerequisites

To be able to receive events from IFTTT, your Home Assistant instance needs to be accessible from the web and you need to have the external URL [configured](/docs/configuration/basic).

{% include integrations/config_flow.md %}

### Using the incoming data

Events coming in from IFTTT will be available as events in Home Assistant and are fired as `ifttt_webhook_received`. The data specified in IFTTT will be available as the event data. You can use this event to trigger automations.

For example, set the body of the IFTTT webhook to:

```json
{ "action": "call_service", "service": "light.turn_on", "entity_id": "light.living_room" }
```

You then need to consume that incoming information with the following automation:

{% raw %}

```yaml
automation:
- id: this_is_the_automation_id
  alias: "The optional automation alias"
  trigger:
  - event_data:
      action: call_service
    event_type: ifttt_webhook_received
    platform: event
  condition: []
  action:
  - target:
      entity_id: '{{ trigger.event.data.entity_id }}'
    service: '{{ trigger.event.data.service }}'
```

{% endraw %}

## Sending events to IFTTT

```yaml
# Example configuration.yaml entry
ifttt:
  key: YOUR_API_KEY
```

`key` is your API key which can be obtained by viewing the **Settings** of the [Webhooks applet](https://ifttt.com/services/maker_webhooks/settings). It's the last part of the URL (e.g., https://maker.ifttt.com/use/MYAPIKEY) you will find under **My Applets** > **Webhooks** > **Settings**.

<p class='img'>
<img src='/images/integrations/ifttt/finding_key.png' />
Property screen of the Maker Channel
</p>

Once you have added your key to your `configuration.yaml` file, restart your Home Assistant instance. This will load up the IFTTT integration and make a service available to trigger events in IFTTT.

<div class='note'>
After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.
</div>

### Multiple IFTTT keys

If you have multiple IFTTT users you can specify multiple IFTTT keys with:

```yaml
# Example configuration.yaml entry
ifttt:
  key: 
    YOUR_KEY_NAME1: YOUR_API_KEY1
    YOUR_KEY_NAME2: YOUR_API_KEY2
```

### Testing your trigger

You can use **Developer Tools** to test your [Webhooks](https://ifttt.com/maker_webhooks) trigger. To do this, open the Home Assistant sidebar, click on Developer Tools, and then the **Services** tab. Fill in the following values:

Field | Value
----- | -----
domain | `ifttt`
service | `trigger`
Service Data | `{"event": "EventName", "value1": "Hello World"}`

<p class='img'>
<img src='/images/integrations/ifttt/testing_service.png' />
When your screen looks like this, click the 'call service' button.
</p>

By default, the trigger is sent to all the API keys from `configuration.yaml`. If you
want to send the trigger to a specific key use the `target` field:

Field | Value
----- | -----
domain | `ifttt`
service | `trigger`
Service Data | `{"event": "EventName", "value1": "Hello World", "target": "YOUR_KEY_NAME1"}`

The `target` field can contain a single key name or a list of key names.

### Setting up a recipe

Press the *New applet* button and search for *Webhooks*.

<p class='img'>
<img src='/images/integrations/ifttt/setup_service.png' />
Choose "Webhooks" as service.
</p>

<p class='img'>
<img src='/images/integrations/ifttt/setup_trigger.png' />
You need to setup a unique trigger for each event you sent to IFTTT.
</p>

{% raw %}

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Startup Notification"
  trigger:
    platform: homeassistant
    event: start
  action:
    service: ifttt.trigger
    data: {"event":"TestHA_Trigger", "value1":"Hello World!"}
```

{% endraw %}

IFTTT can also be used in scripts and with templates. Here is the above automation broken into an automation and script using variables and templates.

{% raw %}

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Startup Notification"
  trigger:
    platform: homeassistant
    event: start
  action:
    service: script.ifttt_notify
    data:
      value1: "HA Status:"
      value2: "{{ trigger.event.data.entity_id.split('_')[1] }} is "
      value3: "{{ trigger.event.data.to_state.state }}"
```

{% endraw %}

{% raw %}

```yaml
#Example Script to send TestHA_Trigger to IFTTT but with some other data (homeassistant UP).
ifttt_notify:
  sequence:
    - service: ifttt.trigger
      data: {"event":"TestHA_Trigger", "value1":"{{ value1 }}", "value2":"{{ value2 }}", "value3":"{{ value3 }}"}
```

{% endraw %}
