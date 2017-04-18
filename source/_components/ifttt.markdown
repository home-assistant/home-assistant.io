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

[IFTTT](https://ifttt.com) is a web service that allows users to create chains of simple conditional statements, so called "recipes". With the IFTTT component you can trigger recipes through the "maker" channel. See the [announcement blog post](/blog/2015/09/13/home-assistant-meets-ifttt/) for examples how to use it.

```yaml
# Example configuration.yaml entry
ifttt:
  key: xxxxx-x-xxxxxxxxxxxxx
```

Key is your API key which can be obtained by viewing the properties of the [Maker Channel](https://ifttt.com/maker).

<p class='img'>
<img src='/images/components/ifttt/finding_key.png' />
Property screen of the Maker Channel
</p>

Once you have added your key to `configuration.yaml`, restart your Home Assistant server. This will load up the IFTTT component and make a service available to trigger events in IFTTT.

<p class='note'>
After restarting the server, be sure to watch the console for any logging errors that show up in red, white or yellow.
</p>

### {% linkable_title Testing your trigger %}

You can use the developer tools to test your [Maker Channel](https://ifttt.com/maker) trigger. To do this, open the Home Assistant UI, open the sidebar, click on the first icon in the developer tools. This should get you to the 'Call Service' screen. Fill in the following values:

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

<p class='img'>
<img src='/images/components/ifttt/setup_trigger.png' />
You need to setup a unique trigger for each event you sent to IFTTT.
</p>

### {% linkable_title Sending events from IFTTT to Home Assistant %}

To be able to receive events from IFTTT, your Home Assistant instance needs to be accessible from the web. This can be achieved by forwarding port 8123 from your router to the device running Home Assistant. If your ISP is giving you a new IP address from time to time, consider using [DuckDNS][duck-dns].

[duck-dns]: https://duckdns.org

<p class='img'>
<img src='/images/components/ifttt/IFTTT_to_HA.png' />
</p>

### {% linkable_title Additional Channel Examples %}

Additional examples of using IFTTT channels can be found below.

Channel | Description
----- | -----
[Manything](/components/ifttt.manything/) | Automates turning recording ON and OFF based on Home Assistant AWAY and HOME values.
