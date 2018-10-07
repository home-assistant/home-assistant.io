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
ha_release: "0.79"
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
It is important that you select your OAuth client type to be Confidential. Otherwise Home Assistant will be unable to renew the Monzo access token once it expires
</p>

## {% linkable_title Configuration %}

To add a Monzo account balance sensor to your installation, add the following to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
sensor:
  - platform: monzo
```

On restarting Home Assistant, a default `monzo.conf` file will be generated in the configuration folder.

```json
{
    "client_id": "CLIENT_ID_HERE",
    "client_secret": "CLIENT_SECRET_HERE"
}
```

Input the `client_id` and `client_secret` from the Monzo developer playground here.

On returning to Home Assistant you will be directed to the authentication start point which will redirect you to Monzo. By clicking the magic link in the email Monzo sends after authentication you give Home Assistant access to the API.

{% configuration %}
id:
  description: A unique identifier for your Monzo account. If this is not set the Monzo sensor will track the first of your accounts returned by the Monzo API. You may want to manually set this if you have previously held a prepaid Monzo account which is now closed, or have multiple Monzo accounts such as a joint account which you want to track. The account id numbers for your accounts can be found using the "List Accounts" endpoint on the developer playground.
  required: false
  type: string
monitored_resources:
  description: Choose to monitor your cleared or effective balance (or both).
  required: false
  type: list
  default: balance
  keys:
    balance:
      description: The current balance of your Monzo account
    spend_today:
      description: The total of all transactions you have made today.
    pots:
      description: Tracks the balances of all of your Monzo Pots
{% endconfiguration %}
