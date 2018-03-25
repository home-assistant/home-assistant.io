---
layout: page
title: "FinTS Sensor"
description: "Instructions on how to use the FinTS sensor."
date: 2018-03-25 13:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Sensor
ha_release: 0.66
ha_iot_class: "Local Push"
logo: home-assistant.png
---

With the FinTS sensor you can fetch your account information from your bank. This only works with banks that support the FinTS (aka. HBCI) standard. The FinTS standard used by many German banks. So if you do not have a German bank account, this will most likely not work for you. To find out if your bank supports FinTS, check the bank's website or call their hotline.

For each account you have with the bank, a separate sensor is created. If you have several accounts with a bank, you can select which ones you want to have and you can also give the accounts a name.

{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
 - platform: fints
    name: <give the bank a name> 
    bank_identification_number: <for your bank>
    username: <your FinTS user name>
    pin: <your FinTS pin>
    url: <FinTS url of your bank>
    accounts: # optional
    - iban: <some iban number>
      name: <give the account a name>
```
{% endraw %}

To find out the configuration for your bank, check their website or call their hotline. Do not use random information you find on the Internet! As you're storing your bank account information in the Home Assistant configuration: make sure that this configuration is not accessable to anyone.

{% configuration %}
  sensors:
    description: List of your sensors.
    required: true
    type: map
    keys:
      name:
        description: (optional) name of the bank
        required: false
        type: string
      bank_identification_number: 
        description: bank identifcation number, in most cases the "Bankleitzahl"
        required: true
        type: string
      username: 
        description: your FinTS user name
        required: true
        type: string
      pin:
        description: your FinTS PIN or password
        required: true
        type: string
      url: 
        description: url of your bank's FinTS server
        required: true
        type: string
      accounts:
        description: (optional) You can configure with of the accounts of your bank shall be shown in Home Assistant. If this attribute is set, only the accounts listed here are shown. 
        required: false
        type: list
        keys: 
          iban:
            description: IBAN of the account to be shown.
            required: true
            type: string
          name:
            description: (optional) Use this field to give the account a meaningful name.
            required: false
            type: string           

{% endconfiguration %}


