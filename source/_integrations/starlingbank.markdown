---
title: Starling Bank
description: How to integrate your Starling Bank account within Home Assistant.
ha_category:
  - Finance
ha_release: 0.79
ha_iot_class: Cloud Polling
ha_domain: starlingbank
ha_platforms:
  - sensor
---

The Starling Bank sensor platform allows you to monitor your account balance data as sensors in Home Assistant.

* Turn off the lights when money's tight?
* Play a song when you reach a savings goal?
* Sound an alarm if you go into your overdraft?

You can find more information about Starling Bank at [their website](https://www.starlingbank.com/). Information on their API can be found on their [developers site](https://developer.starlingbank.com/).

## Access Token

Once you have your own Starling bank account you will need to sign up for a Starling developer account [here](https://developer.starlingbank.com/signup). You won't need to do any development but you will need to get a "Personal Access Token" that will allow the integration to access your account balance.

<div class='note info'>
  You control what access is granted using this token. This integration only needs very basic access (see below).
</div>

Once you've signed up:

1. Head to the [Personal Access Section](https://developer.starlingbank.com/personal/token) of your developer account.
2. Click "Create Token".
3. Give your token a name e.g., "Home Assistant".
4. Tick the permissions "account:read" and "balance:read". The others you can leave un-ticked.
5. Click "Create" and make a note of the newly created token, you will need this for your Home Assistant configuration.

## Configuration

To add Starling account balance sensors to your installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
sensor:
  - platform: starlingbank
    accounts:
      - access_token: YOUR_PERSONAL_ACCESS_TOKEN
```

{% configuration %}
accounts:
  description: A list of Starling accounts. Allows you to monitor multiple Starling accounts.
  required: true
  type: list
name:
  description: A friendly name for your account.
  required: false
  type: string
  default: Starling
sandbox:
  description: For test purposes. Set to true if you are using an access token for a sandbox Starling account.
  required: false
  default: false
  type: boolean
access_token:
  description: Your personal access token.
  required: true
  type: string
balance_types:
  description: Choose to monitor your cleared or effective balance (or both).
  required: false
  type: list
  default: Both balance types will be monitored.
  keys:
    cleared_balance:
      description: Excludes outstanding transactions.
    effective_balance:
      description: Includes outstanding transactions.
{% endconfiguration %}
