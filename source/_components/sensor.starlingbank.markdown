---
layout: page
title: "Starling Bank Sensor"
description: "How to integrate your Starling Bank account within Home Assistant."
date: 2018-09-08 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: starlingbank.png
ha_category: Sensor
featured: false
ha_release: "0.78"
ha_iot_class: "Cloud Polling"
---

The Starling Bank platform allows you to monitor account balance data as sensors in Home Assistant. 

You find more information about Starling Bank at [their website](https://www.starlingbank.com/) or their API on the [developers site](https://developer.starlingbank.com/).

## {% linkable_title Access Token %}

Once you have your own Starling bank account you will need to sign up for a Staring developer account [here](https://developer.starlingbank.com/signup). You won't need to do any development but you will need to get a "Personal Access Token" that will allow the integration to access your account balance.

<p class='note warning'>
  You control what access is granted using this token. This integration only needs very basic access (see below). 
</p>

Once you've signed up: 
1. Head to the [Personal Access Section](https://developer.starlingbank.com/personal/token) of your developer account. 
2. Click "Create Token".
3. Give your token a name e.g. "Home Assistant".
4. Tick the permissions "account:read" and "balance:read". The others you can leave unticked.
5. Click "Create" and make a note of the newly created token, you will need this for your Home Assistant configuration.

## {% linkable_title Configuration %}

To add Starling account balance sensors to your installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
sensor:
  - platform: starlingbank
    accounts:
      - name: "Spending Money"
        access_token: YOUR_PERSONAL_ACCESS_TOKEN
        monitored_variables:
          - 'cleared_balance'
          - 'effective_balance'
```

{% configuration %}
accounts:
  description: A list of Starling accounts. Allows you to configure multiple Starling accounts.
  required: true
  type: list
  keys:
    name:
      description: A friendly name for your account.
      required: false
      type: string
      default: Starling
    access_token:
      description: Your personal access token.
      required: true
      type: string
    monitored_variables:
      description: Choose to monitor your cleared or effctive balance (or both).
      required: false
      type: list
      default: Both
      keys:
        effective_balance
        cleared_balance
{% endconfiguration %}
