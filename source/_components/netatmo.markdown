---
layout: page
title: "Netatmo"
description: "Instructions on how to integrate Netatmo component into Home Assistant."
date: 2016-06-02 08:10
sidebar: true
comments: false
sharing: true
footer: true
logo: netatmo.png
ha_category: Hub
ha_release: "0.20"
ha_iot_class: "Cloud Polling"
---


The `netatmo` component platform is the main component to integrate all Netatmo related platforms.

To enable the Netatmo component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
netatmo:
  api_key: YOUR_CLIENT_ID
  secret_key: YOUR_CLIENT_SECRET
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **api_key** (*Required*): The `client id` form your Netatmo app.
- **secret_key** (*Required*): The `client secret` form your Netatmo app.
- **username** (*Required*): Username for the Netatmo account.
- **password** (*Required*): Password for the Netatmo account.
- **discovery** (*Optional)*: Whether to discover Netatmo devices. Set it to `false`, if you want to choose which Netatmo device you want to add. Defaults to `true`.

### {% linkable_title Get API and Secret Key %}

To get your API credentials, you have to declare a new application in the [Netatmo Developer Page](https://dev.netatmo.com/). Sign in using your username and password from your regular Netatmo account.
Click on 'Create an App' at the top of the page.

<p class='img'>
<img src='/images/screenshots/netatmo_create.png' />
</p>
You have to fill the form, but only two fields are required : Name and Description. It doesn't really matter what you put into those. Just write something that make sense to you. To submit your new app, click on create at the bottom of the form.

<p class='img'>
<img src='/images/screenshots/netatmo_app.png' />
</p>

That's it. You can copy and paste your new `client id` and `client secret` in your Home Assistant configuration file just as described above, in the configuration example.

<p class='img'>
<img src='/images/screenshots/netatmo_api.png' />
</p>
