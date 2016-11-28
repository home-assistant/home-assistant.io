---
layout: page
title: "Wink"
description: "Instructions how to setup the Wink hub within Home Assistant."
date: 2015-01-20 22:36
sidebar: true
comments: false
sharing: true
footer: true
logo: wink.png
ha_category: Hub
featured: true
---

[Wink](http://www.wink.com/) is a home automation hub that can control a whole wide range of devices on the market. Or, as they say in their own words:

<blockquote>
  Wink offers one, quick and simple way to connect people with the products they rely on every day in their home.
</blockquote>

Home Assistant integrates the Wink hub and allows you to get the status and control connected switches, lights, locks, and sensors.

To get started with the Wink API, you will first need to get yourself an API access token. Because it is very difficult right now to get access to their API, John McLaughlin has created the form below to get you one.

<iframe src="https://winkbearertoken.appspot.com"
        style='width: 100%; height: 200px; border: 0; margin: 0 auto 15px; border-left: 2px solid #049cdb; padding-left: 15px;'></iframe>

After you have gotten your access token, add the following to your `configuration.yaml`:

```yaml
wink:
  access_token: YOUR_ACCESS_TOKEN
```

You can also request API access via Wink's [contact us](http://www.wink.com/help/contact/) page.

You will be provided with a client ID and a client secret via email. These can then be used in your configuration in place of the access_token this will prevent you from having to manually refresh your access token.

```yaml
wink:
  email: YOUR_WINK_EMAIL_ADDRESS
  password: YOUR_WINK_PASSWORD
  client_id: YOUR_WINK_CLIENT_ID
  client_secret: YOUR_WINK_CLIENT_SECRET
```

The following can also be provided to allow access to the Wink Relay sensors. This value could change at any time.

```yaml
wink:
  user_agent: Manufacturer/Home-Assistant WinkAndroid/4
```

Configuration variables:

- **access_token** (*Required if the below aren't present.*): The retrieved access token.
- **email** (*Required if access token isn't provided*): Your Wink login email.
- **password** (*Required if access token isn't provided*): Your Wink login password.
- **client_id** (*Required if access token isn't provided*): Your provided Wink client_id.
- **client_secret** (*Required if access token isn't provided*): Your provided Wink client_secret.
- **user_agent** (*Optional*): The user-agent passed in the API calls to Wink.

This will connect to the Wink hub and automatically set up any lights, switches and sensors that it finds.

<p class='note'>
The Wink hub can only be accessed via the cloud. This means it requires an active internet connection and you will experience delays when controlling and updating devices (~3s).
</p>
