---
layout: page
title: "Nuki Smart Lock"
description: "Instructions on how to integrate a Nuki Smart Lock devices."
date: 2017-02-02 09:35
sidebar: true
comments: false
sharing: true
footer: true
logo: nuki.png
ha_category: Lock
featured: false
ha_release: 0.38
ha_iot_class: "Local Polling"
---

The `nuki` platform allows you to control [Nuki Smart Locks](https://nuki.io/en/smart-lock/) via either a [software bridge](https://play.google.com/store/apps/details?id=io.nuki.bridge) or a [physical bridge](https://nuki.io/en/bridge/).

To add a Nuki bridge to your installation, you need to enable developer mode on your bridge and define a port and an access token. This can be achieved using the [Android app](https://play.google.com/store/apps/details?id=io.nuki). Please note that the API token should be 6-20 characters long, even though the app allows you to set a longer one.
Then add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
lock:
  - platform: nuki
    host: 192.168.1.120
    token: fe2345ef
```

Configuration variables:

- **host** (*Required*): The IP or hostname of the Nuki bridge.
- **port** (*Optional*): The port on which the Nuki bridge is listening on. Defaults to `8080`.
- **token** (*Required*): The token that was defined when setting up the bridge.

## {% linkable_title Full configuration %}

Here's a full configuration example for a Nuki bridge:

```yaml
# Example configuration.yaml entry
lock:
  - platform: nuki
    host: 192.168.1.120
    port: 8080
    token: fe2345ef
```

## {% linkable_title Services %}

### {% linkable_title Service `nuki_unlatch` %}

This will unlatch the door, ie. open it (provided this works with your type of door).

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s Nuki Locks.

### {% linkable_title Service `nuki_lock_n_go` %}

This will first unlock, wait a few seconds (20 by default) then re-lock. The wait period can be customized through the app.
See the [Nuki Website](https://nuki.io/en/support/smart-lock/sl-features/locking-with-the-smart-lock/) for more details about this feature.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `entity_id` | yes | String or list of strings that point at `entity_id`s Nuki Locks.
| `unlatch` | yes | Boolean - Whether to unlatch the door when first opening it.
