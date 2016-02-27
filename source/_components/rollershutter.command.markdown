---
layout: page
title: "Command line Rollershutter"
description: "Instructions how to have rollershutters call command line commands."
date: 2016-02-22 13:45
sidebar: true
comments: false
sharing: true
footer: true
logo: command_line.png
ha_category: Rollershutter
---
A rollershutter platform that issues specific commands when it is moved up, down and stopped. This might very well become our most powerful platform as it allows anyone to integrate any type of rollershutter into Home Assistant that can be controlled from the command line, including calling other scripts!

To enable command_rollershutter in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rollershutter:
- platform: command_rollershutter
  rollershutters:
    Kitchen Rollershutter:
      upcmd: move_command up kitchen
      downcmd: move_command down kitchen
      stopcmd: move_command stop kitchen
      statecmd: state_command kitchen
      value_template: '{% raw %}{{ value }}{% endraw %}'
```

Configuration variables:

- **rollershutters** (*Required*): The array that contains all command rollershutters.
  - **entry** (*Required*): Name of the command rollershutter. Multiple entries are possible.
    - **upcmd** (*Required*): The action to take for move up.
    - **downcmd** (*Required*): The action to take for move down.
    - **stopcmd** (*Required*): The action to take for stop.
    - **statecmd** (*Optional*): If given, this command will be run. Returning a result code `0` will indicate that the rollershutter is fully closed, returning a result code `100` will indicate that the rollershutter is fully open.
    - **value_template** (*Optional - default: '{% raw %}{{ value }}{% endraw %}'*): If specified, statecmd will ignore the result code of the command but the template evaluating will indicate the position of the rollershutter.
