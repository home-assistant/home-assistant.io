---
layout: page
title: "Remember The Milk"
description: "Instructions on how to use Remember The Milk with Home Assistant."
date: 2017-10-10 10:10
sidebar: true
comments: false
sharing: true
footer: true
logo: rememberthemilk.png
ha_category: Calendar
ha_release: 0.57
---

The `Remember The Milk` (RTM) component allows you to create tasks in [remember_the_milk](https://www.rememberthemilk.com) from Home Assistant. You can use this if you want Home Assistant to send you a task that you should not forget, e.g. water the plants. The component allows you to have several RTM accounts in parallel.

## {% linkable_title Setup %}

The setup consists of two steps: getting an API key and registering your account

### {% linkable_title Step 1: API key %}

To be able to use this component, you need a Remember The Milk account and you need to apply for your own [API key](https://www.rememberthemilk.com/services/api/keys.rtm). With the API key you will also receive your personal `shared secret`. Both of them need to be stored in your Home Assistant configuration:

```yaml
# Example configuration.yaml entry

remember_the_milk:
  - name: your_rtm_account
    api_key: <your secret api key goes here>
    shared_secret: <your secret shared secret goes here>

```

Configuration variables:

{% configuration %}
  name:
    description: Name of the RTM account, as you can have serveral accounts in RTM. The name must be unique.
    required: true
    type: string
  api_key:
    description: Put the API key you've received in here.
    required: true
    type: string
  shared_secret:
    description: Put the shared secret you've received in here.
    required: true
    type: string
{% endconfiguration %}

### {% linkable_title Step 2: registering your account %}

After saving the configuration, you need to (re-)start Home Assistant. On the first start you will notice a new "Configuration" panel appearing on the Home Assistant page. After opening the configuration page, follow the link "Remember The Milk login". This will take you to a login page where you have to log in with your normal Rember The Milk credentials. This will authorize Home Assistant to access your Remember The Milk account.

After that click on the "login completed" button. This will tell Home Assistant that you have completed the login process on the Remember The Milk page and Home Assistant should try to register with this account.

If the registration was successful, the Configuration panel will disappear from your Home Assistant screen and a Remember The Milk panel should appear. This completes the setup process.

In the background Home Assistant downloaded a "token" from the Remember The Milk server which is stored in the `remember_the_milk.conf` file locally. So you only need to register once. After that the token is used to authenticate with the server.

## {% linkable_title Creating tasks %}

This component offers a new service domain ```remember_the_milk``` with the service ```create_task```. You can call this service with the argument ```name``` to create a new task in your Remember The Milk account. You can call this service from your usual automations.

The task creation supports the "smart syntax", so to create a task with the tag "from_hass" which is due today you can create a task with the name ```test task created in Home Assistant ^today #from_hass```. More info about the smart syntax is available on the [Remember The Milk documentation](https://www.rememberthemilk.com/help/answer/basics-smartadd-howdoiuse).


## {% linkable_title Disclaimer %}
This product uses the Remember The Milk API but is not endorsed or certified by Remember The Milk.
