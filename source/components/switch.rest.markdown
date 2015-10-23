---
layout: page
title: "RESTful switch support"
description: "Instructions how to integrate REST switches into Home Assistant."
date: 2015-09-14 19:10
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/rest.png' class='brand pull-right' />
The rest switch platform allows you to control a given endpoint that supports a [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer). The switch can get the state via GET and set the state via POST on a given REST resource.

To enable this switch, add the following lines to your `configuration.yaml` file:

switch:
  platform: rest
  resource: http://IP_ADDRESS/ENDPOINT
  name: "Bedroom Switch"
  body_on: "ON"
  body_off: "OFF"
```

Configuration variables:

- **resource** (*Required*): The resource or endpoint that contains the value.
- **name** (*Optional*): Name of the REST switch.
- **body_on** (*Optional*): The body that represents enabled state. Default is "ON".
- **body_off** (*Optional*):The body that represents disabled state. Default is "OFF".

<p class='note warning'>
Make sure that the URL matches exactly your endpoint or resource.
</p>

