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
ha_integration_type: integration
---

[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so-called "Applets". With the IFTTT integration, you can trigger applets through the **"Webhooks"** service (which was previously the **"Maker"** channel). This requires the [Pro plan](https://ifttt.com/plans) or higher.

## Prerequisites

To be able to receive events from IFTTT, your Home Assistant instance needs to be accessible from the web and you need to have the external URL [configured](/integrations/homeassistant/#allowlist_external_urls), or use your Nabu Casa account's webhook URL from the IFTTT integration.

{% include integrations/config_flow.md %}

### Receiving events from IFTTT

Events coming in from IFTTT will be available as events in Home Assistant and are fired as `ifttt_webhook_received`. The data specified in the IFTTT recipe Body section will be available as the event data. You can use this event to trigger automations. Use POST as method.

For example, set the body of the IFTTT webhook to:

```json
{ "action": "call_service", "service": "light.turn_on", "entity_id": "light.living_room" }
```

You then need to consume that incoming information with the following automation:

{% raw %}

```yaml
automation:
- alias: "The optional automation alias"
  triggers:
    - trigger: event
      event_type: ifttt_webhook_received
      event_data:
        action: call_service  # the same action 'name' you used in the Body section of the IFTTT recipe
  actions:
    - action: '{{ trigger.event.data.service }}'
      target:
        entity_id: '{{ trigger.event.data.entity_id }}'
    
```

{% endraw %}

## Sending events to IFTTT

```yaml
# Example configuration.yaml entry
ifttt:
  key: YOUR_API_KEY
```

`key` is your API key which can be obtained by viewing the **Settings** of the [Webhooks applet](https://ifttt.com/maker_webhooks/settings). It's the last part of the URL (e.g., https://maker.ifttt.com/use/MYAPIKEY) you will find under **My Applets** > **Webhooks** > **Settings**.
![Property screen of the Maker Channel.](/images/integrations/ifttt/finding_key.png)

Once you have added your key to your {% term "`configuration.yaml`" %} file, restart your Home Assistant instance. This will load up the IFTTT integration and make an action available to trigger events in IFTTT.

{% important %}
After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.
{% endimportant %}

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

You can use **Developer Tools** to test your [Webhooks](https://ifttt.com/maker_webhooks) trigger. To do this, open the Home Assistant sidebar, click on **Developer Tools** > **Actions** tab. Select `IFTTT: Trigger` as the action and fill in the following values:

{% configuration_basic %}
event:
  description: The name of the event to send.
value1:
  description: Generic field to send data via the event.
value2:
  description: Generic field to send data via the event.
value3:
  description: Generic field to send data via the event.
{% endconfiguration_basic %}

When your screen looks like this, select the **Perform action** button.

![Testing action.](/images/integrations/ifttt/testing_service.png)

By default, the trigger is sent to all the API keys from {% term "`configuration.yaml`" %}. If you
want to send the trigger to a specific key use the `target` field:

| Field   | Value                                                                         |
| --------| ----------------------------------------------------------------------------- |
| domain  | `ifttt`                                                                       |
| service | `trigger`                                                                     |
| data    | `{"event": "EventName", "value1": "Hello World", "target": "YOUR_KEY_NAME1"}` |

The `target` field can contain a single key name or a list of key names.

### Setting up an applet

Press the *Create* button and *Add* on **If This**. Search for *Webhooks*.
![Create applet.](/images/integrations/ifttt/create_applet.png)

Choose *Webhooks* service.
![Choose "Webhooks" service.](/images/integrations/ifttt/setup_service.png)

Select *Receive a web request*.
![Receive a web request.](/images/integrations/ifttt/choose_webhook_trigger.png)

You need to setup a unique trigger for each event you sent to IFTTT.
![You need to setup a unique trigger for each event you sent to IFTTT.](/images/integrations/ifttt/setup_trigger.png)

Add the *Then That* action. The below example sends a notification to the IFTTT mobile app and adds `value1` to the message:
![Example notification "then that" action.](/images/integrations/ifttt/setup_then_that.png)

{% raw %}

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Startup Notification"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: ifttt.trigger
      data: {"event":"TestHA_Trigger", "value1":"Hello World!"}
```

{% endraw %}

IFTTT can also be used in scripts and with templates. Here is the above automation broken into an automation and script using variables and templates.

{% raw %}

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: "Startup Notification"
  triggers:
    - trigger: homeassistant
      event: start
  actions:
    - action: script.ifttt_notify
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
    - action: ifttt.trigger
      data: {"event":"TestHA_Trigger", "value1":"{{ value1 }}", "value2":"{{ value2 }}", "value3":"{{ value3 }}"}
```

{% endraw %}
