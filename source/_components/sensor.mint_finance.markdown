---
layout: page
title: "Mint Finance"
description: "Instructions how to setup Mint Finance within Home Assistant."
date: 2017-02-20 21:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mint_finance.png
ha_category: Finance
ha_iot_class: "Cloud Polling"
featured: false
ha_release: 0.40
---

The `mint_finance` platform uses [Mint Finance](https://www.mint.com/) to retrive your bank accounts.

To enable the `mint_finance` platform, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: mint_finance
    username: USERNAME
    password: PASSWORD
    thx_guid: 92658fds687sf79
    ius_session: 8s6g86g86wg8
    accounts:
      - id: 123456789
        name: Check account
        currency: CAD
      - id: 987654321
        name: Credit card
        currency: CAD
```

Configuration variables:

- **username** (*Required*): Your mint username.
- **password** (*Required*): Your mint password.
- **thx_guid** (*Required*): Your mint thx_guid.
- **ius_session** (*Required*): Your mint ius_session.
- **ius_session** (*Required*): Your mint ius_session.
- **accounts** array (*Required*): List of your bank accounts.
  * **id** (*Required*): Bank account ID from mint. (Usually 7 integers)
    **name** (*Required*): Bank account name. This is use to create sensor name.
    **currency** (*Required*): Bank account currency. This is used as unit of measurement.


<p class='note'>
You will need an ius_session and thx_guid.
These are session cookies that must persists.
You must obtain these values by searching your browser's cookies.
In Chrome, for example, visit chrome://settings/cookies and type intuit.

Alternatively, you can login to Mint manually with your browser in inspect
mode and poke around in the network tab. Providing these two cookies
eliminates the need to 2-step authenticate. Mint requires this with all new
browsers attempting to connect.

If you need more information about how to find your *thx_guid* and *ius_session*,
please read the mintapi documentation: https://github.com/mrooney/mintapi
</p>

<p class='note'>
You can find your bank account IDs using your browser.

To do that, go to mint.com and login.
Then click on the wanted bank account.

Look at the **FULL** URL in your web browser address bar.
You should see something like: *https://mint.intuit.com/transaction.event?accountId=1234567*
In this example, your bank account ID is: 1234567
</p>
