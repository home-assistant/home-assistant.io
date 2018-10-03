---
layout: page
title: "Ubiquiti Unifi WAP"
description: "Instructions on how to use a Unifi WAP controller as a device tracker module."
date: 2016-02-19 20:59
sidebar: true
comments: false
sharing: true
footer: true
logo: ubiquiti.png
ha_category: Presence Detection
ha_iot_class: "Local Polling"
ha_release: 0.14
---

This platform allows you to detect presence by looking at devices connected to a [Ubiquiti](http://ubnt.com/) [Unifi](https://www.ubnt.com/enterprise/#unifi) controller.

To use this device tracker in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: unifi
    host: unifi
    username: username
    password: password
    ssid_filter:
      - 'HomeSSID'
      - 'IoTSSID'
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
    type: integer
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
    type: integer
    required: false
    default: 300
ssid_filter:
    description: Filter the SSIDs that tracking will occur on.
    type: list of strings
    required: false
    default: None
monitored_conditions:
    description: A list of extra attributes to pull from the Unifi controller.
    type: list
    required: false
    default: None

{% endconfiguration %}

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.

### {% linkable_title Configuring Users %}

The Unifi controller allows you to create multiple users on it besides the main administrator. It is recommended that you create a limited user that has `read-only` permissions for the Unifi device tracker.

### {% linkable_title Conflicts with MQTT %}

The Unifi controller can either be a dedicated hardware device (Unifi's cloud key), or as software any Linux system. If you run the Unifi controller on the same operating system as Home Assistant there may be conflicts in ports if you have the MQTT component as well.

It is recommended that you run the Unifi controller in a dedicated virtual machine to avoid that situation.

### {% linkable_title Troubleshooting and Time Synchronization %}

Presence detection depends on accurate time configuration between Home Assistant and the Unifi controller.

If Home Assistant and the Unifi controller are running on separate machines or VMs ensure that all clocks are synchronized. Failing to have synchronized clocks will lead to Home Assistant failing to mark a device as home.

[Related Issue](https://github.com/home-assistant/home-assistant/issues/10507)

### {% linkable_title Monitored Conditions %}

The Unifi controller returns a number of additional attributes that can be used for tracking devices, including signal strength, rx/tx rates, and which AP it is connected to. The list of possible options may vary depending on your Unifi controller version and if a device is wired or wireless.

Unifi Controller version 5.6.29 has the following options:
  - _id
  - _is_guest_by_uap
  - _last_seen_by_uap
  - _uptime_by_uap
  - ap_mac
  - assoc_time
  - authorized
  - bssid
  - bytes-r
  - ccq
  - channel
  - essid
  - first_seen
  - hostname
  - idletime
  - ip
  - is_11r
  - is_guest
  - is_wired
  - last_seen
  - latest_assoc_time
  - mac
  - name
  - noise
  - noted
  - oui
  - powersave_enabled
  - qos_policy_applied
  - radio
  - radio_proto
  - rssi
  - rx_bytes
  - rx_bytes-r
  - rx_packets
  - rx_rate
  - signal
  - site_id
  - tx_bytes
  - tx_bytes-r
  - tx_packets
  - tx_power
  - tx_rate
  - uptime
  - user_id
  - usergroup_id
  - vlan
