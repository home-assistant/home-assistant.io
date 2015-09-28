---
layout: page
title: "Troubleshooting your configuration"
description: "Common problems with tweaking your configuration and their solutions."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

It can happen that you run into trouble while configuring Home Assistant. A component is not
showing up or is acting weird. This page will discuss a few of the most common problems.

Before we dive into common issues, make sure you know where your configuration directory is.
Home Assistant will print out the configuration directory it is using when starting up.

Whenever a component or configuration option results in a warning, it will be stored in
`home-assistant.log`. This file is reset on start of Home Assistant.

### {% linkable_title My component does not show up %}
When a component does not show up, many different things can be the case. Before you try any of
these steps, make sure to look at the `home-assistant.log` file and see if there are any errors
related to your component you are trying to set up.

**Problems with the configuration<br>**

`configuration.yaml` does not allow multiple sections to have the same name. If you want a
 specific component to be loaded twice, append a number to the name.

```yaml
sensor:
  platform: mqtt
  […]

sensor 2:
  platform: bitcoin
  […]
```

Another common problem is that a required configuration setting is missing. If this is the
case, the component will report this to `home-assistant.log`. You can have a look at
[the component page](/components/) for instructions how to setup the components. 

Incorrect indentation within the `configuration.yaml` can also create issues.  [Online YAML parsers](http://yaml-online-parser.appspot.com/) are available to verify your text is properly formatted.  If there are errors, you will also see the tracebacks in the `home-assistant.log` referencing the line number from `configuration.yaml`.  This information along with the YAML parsers can be a fast way to resolve small validation issues.

If you find any errors or want to expand the documentation, please [let us know](https://github.com/balloob/home-assistant.io/issues).

**Problems with dependencies<br>**
Almost all components have external dependencies to communicate with your devices and services.
Sometimes Home Assistant is unable to install the necessary dependencies. If this is the case, it
should show up in `home-assistant.log`.

First step is trying to restart Home Assistant and see if the problem persists. If it does, please
[report it](https://github.com/balloob/home-assistant/issues) so we can investigate what is going on.

**Problems with components<br>**
It can happen that some components either do not work right away or stop working after Home
Assistant has been running for a while. If this happens to you, please
[report it](https://github.com/balloob/home-assistant/issues) so that we can have a look.

<p class='note'>
Whenever you report an issue, be aware that we are a group of volunteers that do not have access to
every single device in the world nor unlimited time to fix every problem out there.
</p>
