---
layout: page
title: "Bunq Bank"
description: "How to integrate your Bunq Bank account within Home Assistant."
date: 2018-10-15
sidebar: true
comments: false
sharing: true
footer: true
logo: bunq.jpg
ha_category: Finance
featured: false
ha_release: "0.81"
ha_iot_class: "Cloud Polling"
---

The Bunq Bank sensor platform allows you to monitor your account balance data as sensors in Home Assistant.

* Turn off the lights when money's tight?
* Play a song when you reach a savings goal?

You can find more information about Bunq Bank at [their website](https://www.bunq.com/). Information on their API can be found on their [developers site](https://www.bunq.com/developer).

## {% linkable_title API Key %}

Once you have your own Bunq bank account you will need to create an API key, there are restriction on that for specific types of Bunq accounts, at least for Premium and Pack users this is available. 
1. Go to your Profile in the app
2. Go to Security & Settings
3. Go to Developers
4. Click Api Keys
5. Add API Key
6. Read and agree to the API Terms & Conditions
7. Click on the newly created Unassigned API Key
8. Reveal key and copy it so you can get it into your config (secrets)

## {% linkable_title Configuration %}

To add Bunq account balance sensors to your installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
sensor:
  - platform: bunq
    api_key: <the newly created key>
```

{% configuration %}
api_key:
  description: The API key created in the app.
  required: true
  type: string
prefix:
  description: Your accounts will be prefixed with this.
  required: false
  type: string
  default: Bunq
sandbox:
  description: For test purposes. Set to true if you are using an access token for a sandbox Bunq account.
  required: false
  default: false
  type: boolean
{% endconfiguration %}
