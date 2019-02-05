---
layout: page
title: "Lutron"
description: "Instructions on how to use Lutron devices with Home Assistant."
date: 2017-01-28 13:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category:
  - Hub
  - Cover
  - Light
  - Scene
  - Switch
featured: false
ha_release: 0.37
ha_iot_class: "Local Polling"
redirect_from:
  - /components/cover.lutron/
  - /components/light.lutron/
  - /components/scene.lutron/
  - /components/switch.lutron/
---

[Lutron](http://www.lutron.com/) is an American lighting control company. They have several lines of home automation devices that manage light switches/dimmers, occupancy sensors, HVAC controls, etc. The `lutron` component in Home Assistant is responsible for communicating with the main hub for these systems.

Presently, there's only support for communicating with the [RadioRA 2](http://www.lutron.com/en-US/Products/Pages/WholeHomeSystems/RadioRA2/Overview.aspx) Main Repeater and only handle light switches, dimmers, and seeTouch keypad scenes.

## {% linkable_title Configuration %}

When configured, the `lutron` component will automatically discover the rooms and their associated switches/dimmers as configured by the RadioRA 2 software from Lutron. Each room will be treated as a separate group.

To use Lutron RadioRA 2 devices in your installation, add the following to your `configuration.yaml` file using the IP address of your RadioRA 2 main repeater:

``` yaml
# Example configuration.yaml entry
lutron:
  host: IP_ADDRESS
  username: lutron
  password: integration
```

{% configuration %}
host:
  description: The IP address of the Main Repeater.
  required: true
  type: string
username:
  description: The login name of the user. The user `lutron` always exists, but other users can be added via RadioRA 2 software.
  required: true
  type: string
password:
  description: The password for the user specified above. `integration` is the password for the always-present `lutron` user.
  required: true
  type: string
{% endconfiguration %}

<p class='note'>
It is recommended to assign a static IP address to your main repeater. This ensures that it won't change IP addresses, so you won't have to change the `host` if it reboots and comes up with a different IP address.
</p>

## {% linkable_title Keypad buttons %}

Individual buttons on keypads are not represented as entities. Instead, they fire events called `lutron_event` whose payloads include `id` and `action` attributes.

The `id` attribute includes the name of the keypad and the name of the button, normalized the same way entity names are. For example, if the keypad is called "Kitchen Keypad" and the button is called "Dinner" the event's `id` will be `kitchen_keypad_dinner`.

The `action` attribute varies depending on the button type.

For raise/lower buttons (dimmer buttons, shade controls, etc.) there will be two values, `pressed` and `released`, fired when the button is pressed and when it's released, respectively.

For single-action buttons (scene selection, etc.), `action` will be `single`, and there will only be one event fired. This is a limitation of the Lutron controller which doesn't give Home Assistant any way of knowing when a single-action button is released.

## {% linkable_title Scene %}

This component uses keypad programming to identify scenes.  Currently, it only works with SeeTouch keypads.
The Lutron scene platform allows you to control scenes programmed into your SeeTouch keypads.

After setup, scenes will appear in Home Assistant using the area, keypad and button name.

