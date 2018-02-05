---
layout: page
title: "Ubiquiti Unifi WAP"
description: "Instructions how to use a Unifi WAP controller as a device tracker module."
date: 2016-02-19 20:59
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiquiti.png
ha_category: Presence Detection
ha_release: 0.14
---

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](http://ubnt.com/) [Unifi](https://www.ubnt.com/enterprise/#unifi) controller.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: unifi
    username: USERNAME
    password: PASSWORD
```

{% configuration %}
username:
    description: A user on the controller
    type: string
    required: true
password:
    description: The password for the account
    type: string
    required: true
host:
    description: The hostname or IP address of your controller
    default: localhost
    type: string
    required: false
port:
    description: The port of your controller's web interface
    default: 8443
    type: int
    required: false
site_id:
    description: For multisite installations, you can specify `site_id` to specify which is used
    type: string
    required: false
    default: default
verify_ssl:
    description: Whether to do strict validation on SSL certificates of the Unifi controller. This can be true/false or the path to a locally trusted certificate to use for verification (i.e. "/path/to/custom_cert.pm")
    type: boolean or filename
    required: false
    default: true
detection_time:
    description: How long since the last seen time before the device is marked away, specified in seconds.
    type: int
    required: optional
    default: 300
{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

### {% linkable_title Configuring Users %}

The Unifi controller allows you to create multiple users on it besides
the main administrator. It is recommended that you create a limited
user that has `read-only` permissions for the Unifi device tracker.

### {% linkable_title Conflicts with MQTT %}

The Unifi controller can either be a dedicated hardware device
(Unifi's cloud key), or as software any Linux system. If you run the
the Unifi controller on the same operating system as Home Assistant
there may be conflicts in ports if you have the MQTT component as
well.

It is recommended that you run the Unifi controller in a dedicate
virtual machine to avoid that situation.

### {% linkable_title Troubleshooting and Time Synchronization %}

Presence detection depends on accurate time configuration between Home Assistant and the Unifi controller.

If Home Assistant and the Unifi controller are running on separate machines or VMs ensure that all clocks are syncronized.
Failing to have syncronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)
