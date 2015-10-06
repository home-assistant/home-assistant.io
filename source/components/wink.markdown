---
layout: page
title: "Wink hub"
description: "Instructions how to setup the Wink hub within Home Assistant."
date: 2015-01-20 22:36
sidebar: false
comments: false
sharing: true
footer: true
---

<img src='/images/supported_brands/wink.png' class='brand pull-right' />
[Wink](http://www.wink.com/) is a home automation hub that can control a whole wide range of devices on the market. Or, as they say in their own words:

<blockquote>Wink offers one, quick and simple way to connect people with the products they rely on every day in their home.</blockquote>

Home Assistant integrates the Wink hub and allows you to get the status and control connected switches, lights and sensors.

To get started with the Wink API, you will first need to get yourself an API access token. Because it is very difficult right now to get access to their API, John McLaughlin has created the form below to get you one. 

<iframe src="https://winkbearertoken.appspot.com"
        style='width: 100%; height: 200px; border: 0; margin: 0 auto 15px; border-left: 2px solid #049cdb; padding-left: 15px;'></iframe>

After you have gotten your access token, add the following to your `configuration.yaml`:

```yaml
wink:
  access_token: YOUR_ACCESS_TOKEN
```

Configuration variables:

- **access_token** (*Required*): The retrieved access token.

This will connect to the Wink hub and automatically set up any lights, switches and sensors that it finds.

<p class='note'>
The Wink hub can only be accessed via the cloud. This means it requires an active internet connection and you will experience delays when controlling devices (~3s) and getting an updated device state (~15s). 
</p>
