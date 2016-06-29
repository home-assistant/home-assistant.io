---
layout: page
title: "Command Line Cover"
description: "How to control a cover with the command line."
date: 2016-06-28 17:30
sidebar: true
comments: false
sharing: true
footer: true
logo: command_line.png
ha_category: Cover
---
A cover platform that issues specific commands when it is moved up, down and
stopped. It allows anyone to integrate any type of cover into Home Assistant
that can be controlled from the command line.

To enable a command line cover in your installation, add the following to your
`configuration.yaml` file:

```yaml
# Example configuration.yaml entry
cover:
- platform: command_line
  covers:
    Garage door:
      open_cmd: move_command up kitchen
      close_cmd: move_command down kitchen
      stop_cmd: move_command stop kitchen
      state_cmd: state_command kitchen
      value_template: {% raw %}>
        {% if value == 'open' %}
        100
        {% elif value == 'closed' %}
        0
        {% endif %}
        {% endraw %}
```

Configuration variables:

- **covers** (*Required*): The array that contains all command line covers.
  - **entry** (*Required*): Name of the command line cover. Multiple entries
    are possible.
    - **open_cmd** (*Required*): The command to open the cover.
    - **close_cmd** (*Required*): The action to close the cover.
    - **stop_cmd** (*Required*): The action to stop the cover.
    - **state_cmd** (*Optional*): If given, this will act as a sensor that runs
      in the background and updates the state of the cover. If the command
      returns a `0` the indicates the cover is fully closed, whereas a 100
      indicates the cover is fully open.
    - **value_template** (*optional - default: '{% raw %}{{ value }}{% endraw
      %}'*): if specified, `state_cmd` will ignore the result code of the
      command but the template evaluating will indicate the position of the
      cover. For example, if your `state_cmd` returns a string "open",
      using `value_template` as in the example config above will allow you to
      translate that into the valid state `100`.
