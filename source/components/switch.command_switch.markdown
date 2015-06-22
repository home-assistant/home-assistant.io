---
layout: page
title: "Command line switches support"
description: "Instructions how to have a switch call command line commands."
date: 2015-06-10 22:41
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/utilities-terminal.png' class='brand pull-right' />
A switch platform that issues specific commands when it is turned on and off. This might very well become our most platform as it allows anyone to integrate any type of switch into Home Assistant that can be controlled from the command line, including calling other scripts!

To enable it, add the following lines to your `configuration.yaml`:

```
# Example configuration.yaml entry
switch:
  platform: command_switch
  switches:
    - kitchen_light:
        oncmd: switch_command on kitchen
        offcmd: switch_command off kitchen
```
