---
layout: page
title: "Freebox"
description: "Instructions on how to integrate Freebox routers into Home Assistant."
date: 2018-05-16 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: freebox.svg
ha_category: Presence Detection
ha_release: "0.70"
ha_iot_class: "Local Polling"
---


The `freebox` platform offers presence detection by keeping track of the
devices connected to a [Freebox](http://www.free.fr/) router.

### {% linkable_title Configuration %}

If you have enabled the [discovery component](/components/discovery/),
your Freebox should be detected automatically. Otherwise, you can set it
up manually in your `configuration.yaml` file:

```yaml
device_tracker:
  - platform: freebox
    host: foobar.fbox.fr
    port: 1234
```

{% configuration %}
host:
  description: The url of the Freebox.
  required: true
  type: string
port:
  description: The https port the Freebox is listening on.
  required: true
  type: string
{% endconfiguration %}

You can find out your Freebox host and port by opening
[this address](http://mafreebox.freebox.fr/api_version) in your browser. The
returned json should contain an api_domain (`host`) and a https_port (`port`).

### {% linkable_title Initial setup %}

The first time Home Assistant will connect to your Freebox, you will need to
authorize it by pressing the right button on the facade of the Freebox when
prompted to do so.

### {% linkable_title Notes %}

Note that the Freebox waits for some time before marking a device as
inactive, meaning that there will be a small delay (1 or 2 minutes)
between the time you disconnect a device and the time it will appear
as "away" in Home Assistant. You should take this into account when specifying
the `consider_home` parameter.
On the contrary, the Freebox immediately reports devices newly connected, so
they should appear as "home" almost instantly, as soon as Home Assistant
refreshes the devices states.

See the [device tracker component page](/components/device_tracker/) for
instructions how to configure the devices to be tracked.

