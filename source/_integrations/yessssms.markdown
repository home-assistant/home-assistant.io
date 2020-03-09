---
title: yesss! SMS
description: Instructions on how to add Yesss-SMS notifications to Home Assistant.
ha_category:
  - Notifications
ha_release: 0.57
ha_codeowners:
  - '@flowolf'
ha_domain: yessssms
---

The `yessssms` platform is using the Austrian mobile operator [Yesss.at](https://yesss.at) and others to send SMS via their web-site.

Currently some MVNOs (mobile virtual network operators), in the A1 network, that use the kontomanager.at interface work. These are currently  (as of version 0.4.0 of [YesssSMS](https://pypi.org/project/YesssSMS/)): 
* YESSS
* billitel
* EDUCOM
* fenercell
* georg
* goood
* kronemobile
* kuriermobil
* SIMfonie
* teleplanet
* WOWWW
* yooopi

![supported providers](/images/screenshots/yessssms_brands.png)

<div class='note warning'>
Regular charges apply and a contract or prepaid plan is needed.
</div>

<div class='note warning'>
Do not use this for high frequency notifications. The web-SMS page is rate limited and sending more than 45 SMS/h might get you blocked.
</div>

You can send to any number, but your phone number will appear as sender.

To enable SMS notifications in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: yessssms
    username: YOUR_PHONE_NUMBER
    password: YOUR_PASSWORD
    recipient: PHONE_NUMBER_TO_NOTIFY
```

{% configuration %}
username:
  description: This is your login name (usually your phone number). Veryfy that you can use your credentials on the Yesss.at website.
  required: true
  type: string
password:
  description: This is the password you use to login to Yesss.at.
  required: true
  type: string
recipient:
  description: This is the phone number you want to send the SMS notification to.
  required: true
  type: string
provider:
  description: Possible values are `yesss`, `billitel`, `educom`, `fenercell`, `georg`, `goood`, `kronemobile`, `kuriermobil`, `simfonie`, `teleplanet`, `wowww` and `yooopi`.
  required: false
  default: "YESSS"
  type: string
{% endconfiguration %}

For an alternative provider you would set the `provider` option. An example configuration for the `educom` provider with SMS to yourself would be:
```yaml
# Example configuration.yaml entry
notify:
  - name: sms_to_self
    platform: yessssms
    username: 06641234567
    password: tops3cr3tpass0rd
    recipient: 06641234567
    provider: educom
```

<div class='note warning'>
Verify that your credentials work on the website of your provider.
Using the wrong credentials three times in a row will get you suspended for one hour.
</div>

Home Assistant will check your credentials on startup. Check the logs for errors. 
If the login credentials are not valid, re-check the credentials and restart Home Assistant.
