---
layout: page
title: "Insteon Hub"
description: "Instructions how to setup the Insteon Hub within Home Assistant."
date: 2016-01-27 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: insteon.png
ha_category: Hub
ha_iot_class: "Cloud Polling"
---

<p class='note warning'>
This component has been disabled due to a complaint by Insteon. It will be enabled again once <a href='https://github.com/home-assistant/home-assistant/issues/3811'>this issue</a> has been resolved.
</p>

The `insteon` component lets you use your [Insteon Hub](http://www.insteon.com/insteon-hub/) with Home Assistant.

You will need to obtain an Insteon REST API key from the [Insteon Developer program](http://www.insteon.com/become-an-insteon-developer) to use this component.

To integrate your Insteon Hub with Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
insteon_hub:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
  api_key: YOUR_API_KEY
```

Configuration variables:

- **username** (*Required*): The username used to access the Insteon interface (e.g. the [connect.insteon.com](http://connect.insteon.com/) site).
- **password** (*Required*): The password used to access the Insteon interface.
- **api_key** (*Required*): The Insteon REST API key emailed to you once you are approved in the Insteon Developer program.
