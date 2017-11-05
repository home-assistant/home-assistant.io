---
layout: page
title: "NGINX SSL proxy"
description: "NGINX Home Assistant SSL proxy."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

Setup a SSL proxy with NGINX and redirect port 80 to 443. Make sure you have generated a certificate before you start this add-on. 

In the `http` section of the `configuration.yaml` file remove `ssl_certificate` and `ssl_key` and don't enter the port in the `base_url` to avoid a HTTP 502 error.


```json
{
  "domain": "home.example.com"
}
```

Configuration variables:

- **domain** (*Required*): Domain they will proxy run with it.

<p class='note'>
It is possible to deactive port 80 if you need this for things like `emulate_hue`. Remove the host port from Network option of this add-on.
</p>
