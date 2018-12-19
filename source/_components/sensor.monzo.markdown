---
layout: page
title: "Monzo Bank"
description: "How to integrate your Monzo Bank account within Home Assistant."
date: 2018-09-07 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: "monzobank.png"
ha_category: Finance
featured: false
ha_release: "0.85"
ha_iot_class: "Cloud Polling"
---

The Monzo Bank sensor platform allows you to monitor the balance and other information of your [Monzo](https://monzo.com) bank account as sensors in Home Assistant.

* Turn off the lights when money's tight?
* Play a song when your Pots have reached their savings goals?
* Sound an alarm if you go into your overdraft?

Documentation of the Monzo API can be found [here](https://docs.monzo.com/) (This is slightly incomplete but you can see the capabilities on the Monzo [developers site](https://developers.monzo.com/)).

<p class='note info'>
The publicly available Monzo API does not allow transfering money out of your account except to your Pots. While you can't directly lose money through use of the API, it is possible to go into your overdraft if you make transactions after placing your full balance into Pots.

This sensor only reads information related to account and pot balances and does not perform transfers so this will not occur.
</p>

## {% linkable_title OAuth Client Setup %}

Once you have your own Monzo account you will need log in to the Monzo developer website. You won't need to do any development but you will need to create a client id and secret pair that will allow the integration to access your account balance.

Once you've signed up:
1. Head to the [Clients Section](https://developers.monzo.com/apps/home) of the developer playground.
2. Click "New OAuth Client".
3. Give your client a name e.g. "Home Assistant".
4. Enter the "Redirect URL" as `http://[Home Assistant URL]/api/monzo/callback`
5. Select "Confidential" from the Confidentiality dropdown box.
6. Click "Submit" and make a note of the newly created client id and secret, you will need this for your Home Assistant configuration.

<p class='note info'>
It is important that you select your OAuth client type to be Confidential. Otherwise Home Assistant will be unable to renew the Monzo access token once it expires.
</p>

## {% linkable_title Configuration %}

To add the Monzo component to your Home Assistant, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
monzo:
  client_id: "your_client_id"
  client_secret: "your_client_secret"
  sensors:
    monitored_resources:
      - balance
```

An entry will be added to the integrations page of your Home Assistant which will direct you to the Monzo authentication start point. Enter the email address that you used to sign up for your Monzo account and Monzo will send you a magic link to this email. Clicking this link will give Home Assistant access to details about your account through the API.

{% configuration %}
client_id:
  description: The client id associated with Home Assistant as given on the Monzo developer website
  required: true
  type: string
client_secret:
  description: The client secret associated with Home Assistant as given on the Monzo developer website
  required: true
  type: string
sensors:
  keys:
    monitored_resources:
      description: Monitored values from your account.
      required: false
      type: list
      default: balance, dailyspend, pots
      keys:
        balance:
          description: The current balance of your Monzo account
        dailyspend:
          description: The total of all transactions you have made today.
        pots:
          description: Tracks the balances of all of your Monzo Pots
{% endconfiguration %}
