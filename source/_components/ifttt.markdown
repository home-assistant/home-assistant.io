---
layout: page
title: "IFTTT"
description: "Instructions how to setup IFTTT within Home Assistant."
date: 2015-09-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: ifttt.png
ha_category: Automation
featured: true
---

[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so called "Applets". With the IFTTT component you can trigger applets through the **"Maker"** channel. See the [announcement blog post](/blog/2015/09/13/home-assistant-meets-ifttt/) for examples how to use it.

```yaml
# Example configuration.yaml entry
ifttt:
  key: xxxxx-x-xxxxxxxxxxxxx
```

`key` is your API key which can be obtained by viewing the **Settings** of the [Maker Channel](https://ifttt.com/maker). It's the last part of the URL.

<p class='img'>
<img src='/images/components/ifttt/finding_key.png' />
Property screen of the Maker Channel
</p>

Once you have added your key to your `configuration.yaml` file, restart your Home Assistant server. This will load up the IFTTT component and make a service available to trigger events in IFTTT.

<p class='note'>
After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.
</p>

### {% linkable_title Testing your trigger %}

You can use the **Developer tools** to test your [Maker Channel](https://ifttt.com/maker) trigger. To do this, open the Home Assistant frontend, open the sidebar, click on the first icon in the developer tools. This should get you to the **Call Service** screen. Fill in the following values:

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

Press the *New applet* button and search for *Maker* .

<p class='img'>
<img src='/images/components/ifttt/setup_service.png' />
Choose "Maker" as service.
</p>

<p class='img'>
<img src='/images/components/ifttt/setup_trigger.png' />
You need to setup a unique trigger for each event you sent to IFTTT.
</p>

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: Startup Notification
  trigger:
    platform: event
    event_type: homeassistant_start
  action:
    service: ifttt.trigger
    data: {"event":"TestHA_Trigger", "value1":"Hello World!"}
```

IFTTT can also be used in scripts and with `data_template`.  Here is the above automation broken into an automation and script using variables and data_templates.

```yaml
# Example configuration.yaml Automation entry
automation:
  alias: Startup Notification
  trigger:
    platform: event
    event_type: homeassistant_start
  action:
    service: script.ifttt_notify
    data_template:
      value1: 'HA Status:'
      value2: {% raw %}"{{ trigger.event.data.entity_id.split('_')[1] }} is "{% endraw %}
      value3: {% raw %}"{{ trigger.event.data.to_state.state }}"{% endraw %}
```

```yaml
#Example Script to send TestHA_Trigger to IFTTT but with some other data (homeassistant UP).
ifttt_notify:
  sequence:
    - service: ifttt.trigger
      data_template: {"event":"TestHA_Trigger", "value1":"{{ value1 }}", "value2":"{{ value2 }}", "value3":"{{ value3 }}"}
```

### {% linkable_title Sending events from IFTTT to Home Assistant %}

To be able to receive events from IFTTT, your Home Assistant instance needs to be accessible from the web. This can be achieved by forwarding port 8123 from your router to the device running Home Assistant. If your ISP is giving you a new IP address from time to time, consider using [DuckDNS](https://duckdns.org).

In the URL field, you can then put an [API URL](/developers/rest_api/). You probably want to use a POST action, so select `POST` as method. After your request line, you need to add your Home Assistant password, which you defined in the [http section of your config](/getting-started/basic/#password-protecting-the-web-interface), in the form of `?api_password=YOUR_PASSWORD`. For the message body, refer to the API page linked above.

<p class='img'>
<img src='/images/components/ifttt/IFTTT_to_HA.png' />
</p>

### {% linkable_title Additional Channel Examples %}

Additional examples of using IFTTT channels can be found below.

Channel | Description
----- | -----
[Manything](/components/ifttt.manything/) | Automates turning recording ON and OFF based on Home Assistant AWAY and HOME values.
