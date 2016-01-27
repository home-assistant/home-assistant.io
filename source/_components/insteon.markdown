---
layout: component
title: "Insteon"
description: "Instructions how to setup the Insteon Hub within Home Assistant."
date: 2016-01-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Hub
---

The `insteon` component let you use your [Insteon](http://www.insteon.com/) Hub with Home Assistant.

To integrate your Insteon hub with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
insteon:
  host: ISY_ADDRESS
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```
Configuration variables:

- **username** (*Required*): The username that used to access the ISY interface.
- **password** (*Required*): The password that used to access the ISY interface.

