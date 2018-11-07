---
layout: page
title: "Homeworks Keypads"
description: "How to use Lutron Homeworks Series 4 & 8 keypads."
date: 2018-10-05 23:00
sidebar: true
comments: false
sharing: true
footer: true
logo: lutron.png
ha_category: Binary Sensor 
featured: false
ha_release: 0.01
ha_iot_class: "Local Polling"
---

To enable this sensor, you first have to set up [homeworks](/components/homeworks/), and add the following lines to your `configuration.yaml` file"

```yaml
# Example configuration.yaml` entry
binary_sensor:
  - platform: homeworks
    keypads:
      - addr: "[02:08:02:03]"
        name: "First Keypad"
        buttons:
            1: "Button1"
            2: "Button2"
            6: "Button6"
      - addr: "[02:08:02:04]"
        name: "Second Keypad"
        buttons:
            1: "Close Something"
            2: "Open Something"
```

{% configuration %}
keypads:
  description: A list of Homeworks keypads described below.
  required: true
  type: list 
  keys:
    addr:
      description: The unique address of the keypad on the controller.  The quotes, brackets, and number formatting must be of the form `"[##:##:##:##]"`.
      required: true
      type: string
    name:
      description: The components name is the title of the button + "\_" + the name of the keypad.
      required: true
      type: string
    buttons:
      description: A list of buttons on a keypad.
      required: true
      type: list
      keys:
        num:
          description: The number of the button on the keypad (starting at 1).
          required: true
          type: int
        title:
          description: The title of the button on the keypad.
          required: true
          type: string
{% endconfiguration %}

<p class='note'>
Homeworks keypad buttons are momentary switches.  The button is pressed and released, meaning that the state is only "on" for a short period.  Buttons generate `button_pressed` events to make it easier to deal with the rapid transitions.  These events contain the "entity_id" of the button that was pressed.
</p>
