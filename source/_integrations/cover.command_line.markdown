---
title: "Command Line Cover"
description: "How to control a cover with the command line."
ha_category:
  - Cover
ha_release: 0.14
ha_iot_class: Local Polling
ha_domain: command_line
---

A `command_line`cover platform that issues specific commands when it is moved up, down and stopped. It allows anyone to integrate any type of cover into Home Assistant that can be controlled from the command line.

To enable a command line cover in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
  - platform: command_line
    covers:
      garage_door:
        command_open: move_command up garage
        command_close: move_command down garage
        command_stop: move_command stop garage
```

{% configuration %}
covers:
  description: The array that contains all command line covers.
  required: true
  type: list
  keys:
    identifier:
      description: Name of the command line cover as slug. Multiple entries are possible.
      required: true
      type: list
      keys:
        command_open:
          description: The command to open the cover.
          required: true
          default: true
          type: string
        command_close:
          description: The action to close the cover.
          required: true
          default: true
          type: string
        command_stop:
          description: The action to stop the cover.
          required: true
          default: true
          type: string
        command_state:
          description: If given, this will act as a sensor that runs in the background and updates the state of the cover. If the command returns a `0` the indicates the cover is fully closed, whereas a 100 indicates the cover is fully open.
          required: false
          type: string
        value_template:
          description: if specified, `command_state` will ignore the result code of the command but the template evaluating will indicate the position of the cover. For example, if your `command_state` returns a string "open", using `value_template` as in the example configuration above will allow you to translate that into the valid state `100`.
          required: false
          default: "'{% raw %}{{ value }}{% endraw%}'"
          type: template
        friendly_name:
          description: The name used to display the cover in the frontend.
          required: false
          type: string
        command_timeout:
          description: Defines number of seconds for command timeout.
          required: false
          type: integer
          default: 15
{% endconfiguration %}

## Examples

In this section you find some real-life examples of how to use this sensor.

### Full configuration


{% raw %}

```yaml
# Example configuration.yaml entry
cover:
  - platform: command_line
    covers:
      garage_door:
        command_open: move_command up garage
        command_close: move_command down garage
        command_stop: move_command stop garage
        command_state: state_command garage
        value_template: >
          {% if value == 'open' %}
          100
          {% elif value == 'closed' %}
          0
          {% endif %}
```

{% endraw %}
