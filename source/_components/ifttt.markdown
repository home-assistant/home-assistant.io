---
layout: page
title: "IFTTT"
description: "Instructions on how to setup IFTTT within Home Assistant."
date: 2015-09-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ifttt.png
ha_category: Automation
featured: true
ha_iot_class: "Cloud Push"
---

[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so-called "Applets". With the IFTTT component, you can trigger applets through the **"Webhooks"** service (which was previously the **"Maker"** channel).

## {% linkable_title Sending events from IFTTT to Home Assistant %}

To be able to receive events from IFTTT, your Home Assistant instance needs to be accessible from the web ([Hass.io instructions](/addons/duckdns/)) and you need to have the `base_url` configured for the HTTP component ([docs](https://www.home-assistant.io/components/http/#base_url)).

To set it up, go to the integrations page in the configuration screen and find IFTTT. Click on configure. Follow the instructions on the screen to configure IFTTT.

Events coming in from IFTTT will be available as events in Home Assistant and are fired as `ifttt_webhook_received`. The data specified in IFTTT will be available as the event data. You can use this event to trigger automations.

For example, set the body of the IFTTT webhook to:

```json
{ "action": "call_service", "service": "light.turn_on", "entity_id": "light.living_room" }
```

You can then consume that information with the following automation:

```yaml
automation:
  trigger:
    event: ifttt_webhook_received
    event_data:
      action: call_service
  action:
    service_template: '{% raw %}{{ trigger.event.data.service }}{% endraw %}'
    data_template:
      entity_id: '{% raw %}{{ trigger.event.data.entity_id }}{% endraw %}'
```

## {% linkable_title Sending events to IFTTT %}

```yaml
# Example configuration.yaml entry
ifttt:
  key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

`key` is your API key which can be obtained by viewing the **Settings** of the [Webhooks applet](https://ifttt.com/services/maker_webhooks/settings). It's the last part of the URL (e.g., https://maker.ifttt.com/use/MYAPIKEY) you will find under **My Applets** > **Webhooks** > **Settings**.


<p class='img'>
<img src='/images/components/ifttt/finding_key.png' />
Property screen of the Maker Channel
</p>

Once you have added your key to your `configuration.yaml` file, restart your Home Assistant server. This will load up the IFTTT component and make a service available to trigger events in IFTTT.

<p class='note'>
After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.
</p>

### {% linkable_title Testing your trigger %}

You can use the **Developer tools** to test your [Webhooks](https://ifttt.com/maker_webhooks) trigger. To do this, open the Home Assistant frontend, open the sidebar, click on the first icon in the developer tools. This should get you to the **Call Service** screen. Fill in the following values:

Field | Value
----- | -----
domain | `ifttt`
service | `trigger`
Service Data | `{"event": "EventName", "value1": "Hello World"}`

<p class='img'>
<img src='/images/components/ifttt/testing_service.png' />
When your screen looks like this, click the 'call service' button.
</p>

### {% linkable_title Setting up a recipe %}

Press the *New applet* button and search for *Webhooks*.

<p class='img'>
<img src='/images/components/ifttt/setup_service.png' />
Choose "Webhooks" as service.
</p>

<p class='img'>
<img src='/images/components/ifttt/setup_trigger.png' />
You need to setup a unique trigger for each event you sent to IFTTT.
</p>

{% raw %}
```yaml
# Example configuration.yaml Automation entry
automation:
  alias: Startup Notification
  trigger:
    platform: homeassistant
    event: start
  action:
    service: ifttt.trigger
    data: {"event":"TestHA_Trigger", "value1":"Hello World!"}
```
{% endraw %}

IFTTT can also be used in scripts and with `data_template`.  Here is the above automation broken into an automation and script using variables and data_templates.

{% raw %}
```yaml
# Example configuration.yaml Automation entry
automation:
  alias: Startup Notification
  trigger:
    platform: homeassistant
    event: start
  action:
    service: script.ifttt_notify
    data_template:
      value1: 'HA Status:'
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
      data_template: {"event":"TestHA_Trigger", "value1":"{{ value1 }}", "value2":"{{ value2 }}", "value3":"{{ value3 }}"}
```
{% endraw %}

### {% linkable_title Additional Channel Examples %}

Additional examples of using IFTTT channels can be found below.

Channel | Description
----- | -----
[Manything](/components/ifttt.manything/) | Automates turning recording ON and OFF based on Home Assistant AWAY and HOME values.
