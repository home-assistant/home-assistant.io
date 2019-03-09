---
layout: page
title: "FRITZ!Box"
description: "Instructions on how to integrate AVM FRITZ!Box based routers into Home Assistant."
date: 2015-12-13 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: avm.png
ha_category: Presence Detection
ha_release: "0.10"
---


The `fritz` platform offers presence detection by looking at connected devices to a [AVM Fritz!Box](http://avm.de/produkte/fritzbox/) based router.

## {% linkable_title Setup %}

<p class='note warning'>
It might be necessary to install additional packages: <code>$ sudo apt-get install python3-lxml libxslt-dev libxml2-dev zlib1g-dev</code>
If you installed Home Assistant in a virtualenv, run the following commands inside it: <code>$ pip3 install lxml</code>; be patient this will take a while.</p>

## {% linkable_title Configuration %}

To use an Fritz!Box router in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: fritz
```

{% configuration %}
host:
  description: The IP address of your router, e.g., `192.168.1.1`. It is optional since every fritzbox is also reachable by using the IP address 169.254.1.1.
  required: false
  type: string
username:
  description: The username of an user with administrative privileges, usually `admin`.
  required: false
  type: string
password:
  description: The password for your given admin account.
  required: false
  type: string
{% endconfiguration %}

<p class='note'>
It seems that it is not necessary to use the password in current generation Fritz!Box routers because the necessary data can be retrieved anonymously.
</p>

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.
