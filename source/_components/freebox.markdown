---
layout: page
title: "Freebox"
description: "Instructions on how to integrate Freebox routers into Home Assistant."
date: 2018-11-15 20:00
sidebar: true
comments: false
sharing: true
footer: true
logo: freebox.svg
ha_category: Network
ha_release: "0.85"
ha_iot_class: "Local Polling"
---


The `freebox` component allows you to observe and control [Freebox router](http://www.free.fr/).

The integration provides:

* a sensor with traffic metrics
* a device tracker for connected devices

### {% linkable_title Configuration %}

If you have enabled the [discovery component](/components/discovery/),
your Freebox should be detected automatically. Otherwise, you can set it
up manually in your `configuration.yaml` file:

```yaml
freebox:
  host: foobar.fbxos.fr
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

<p class='note warning'>
You must have set a password for your Freebox router web administration page and enabled the option "Permettre les nouvelles demandes d'associations".
</p>

The first time Home Assistant will connect to your Freebox, you will need to
authorize it by pressing the right arrow on the facade of the Freebox when
prompted to do so.

### {% linkable_title Supported routers %}

Only the routers with Freebox OS are supported:
* Freebox V6 also known as Freebox Revolution
* Freebox mini 4k
