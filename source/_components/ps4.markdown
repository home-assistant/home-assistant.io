---
layout: page
title: "Sony PlayStation 4"
description: "Instructions on how to integrate a Sony PlayStation 4 into Home Assistant."
date: 2019-01-28 01:08
sidebar: true
comments: false
sharing: true
footer: true
logo: ps4.png
ha_category: Media Player
ha_release: 0.87
ha_iot_class: "Local Polling"
---

The `ps4` component allows you to control a
[Sony PlayStation 4 console](https://www.playstation.com/en-us/explore/ps4/).

- This component supports controlling a single PlayStation 4 for your instance. Additional consoles may work although it has not been tested.

## {% linkable_title Requirements %}

- Android or iOS device
- [PS4 Second Screen App](https://play.google.com/store/apps/details?id=com.playstation.mobile2ndscreen&hl=en_US) installed on device.

## {% linkable_title Set up %}

1. Download the Second Screen App and make sure that you can find and control your PlayStation 4 normally.

<p class='note warning'>
  Read the section "Granting Port Access" below before continuing.
</p>

2. Navigate to `Configuration -> Integrations` and select `Configure` for `PlayStation 4`.

3. Follow instructions displayed to generate user credentials. You will know this step is completed when a form with fields appears.

4. Pair Home Assistant to your PlayStation 4 by filling in the fields.
- **Note:** To find your correct region refer to the section below titled "Regions"

## {% linkable_title Granting Port Access %}

The PS4 component requires the use of privileged ports to work correctly. Depending on your OS of your Home Assistant instance you may need to allow usage of privileged ports manually.
Home Assistant installed on a Debian-type OS for example, such as *Hassbian*, *Rassbian*, and *Armbian* may require configuration.
There are varying methods to perform this, dependent on your OS running Home Assistant.

- **Note:** Hass.io on HassOS does not require additional configuration.

- Example for Debian:
`sudo setcap 'cap_net_bind_service=+ep' /usr/bin/python3.5`
Replace "/usr/bin/python3.5" with your path to Python that is running Home Assistant.


## {% linkable_title Configuration %}

- **Note:** The PlayStation 4 component does not use entries from `configuration.yaml`. You must configure this component by using `Integrations`

## {% linkable_title Regions %}

Some titles will have different SKUs in the PlayStation Store database. You must specify your specific region in your `configuration.yaml` in order to retrieve the cover art for such titles. If you do not know your [region](https://www.gamerbraves.com/ps4-games-region-codes-explained/), reference the table below:

|  Region ID  |  Locales                                       |
| ----------- |:---------------------------------------------- |
| R1          | Bermuda, Canada, United States                 |
|             | and U.S. territories                           |
| R2          | The Middle East, Western Europe,               |
|             | Central Europe, Egypt,                         |
|             | French overseas territories, Greenland,        |
|             | Japan, Lesotho, South Africa and Swaziland     |
| R3          | Southeast Asia, Hong Kong, Macau,              |
|             | South Korea and Taiwan                         |
| R4          | Australasia, Central America,                  |
|             | the Caribbean, Mexico, Oceania, South America  |
| R5          | The rest of Africa, Former Soviet Union,       |
|             | the Indian subcontinent, Mongolia, North Korea |

<p class='note warning'>
  Region 6: Mainland China, is not supported as there is no English database available.
</p>
