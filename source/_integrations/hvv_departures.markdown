---
title: HVV Departures
description: Display the departures of busses, trains and fairies in Hamburg within Home Assistant.
logo: hvv.png
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.106
ha_config_flow: true
ha_codeowners:
  - '@vigonotion'
---

The `hvv_departures` sensor will display the departures of busses, trains and fairies in Hamburg.

## Set up the integration via the integrations screen

Menu: *Configuration* > *Integrations*

Press on **HVV Departures** and configure the integration:

* You can keep the default host (only change it if you know what you are doing)
* Enter your api credentials (see [How to get the api credentials](#how-to-get-the-api-credentials))
* Enter your station. You can also enter your address or a point of interest.
* Select the station/address/poi you want

After that, you will get a sensor showing the time until the next departure.

## Options

Menu: *Configuration* > *Integrations* > *Select your new integration* > *Press the cog in the upper left corner*

* **select lines**: filter the departures on the station to only show departures for the selected lines.
* **offset**: set this if you want to list the departures some minutes in the future, for example if you live ten minutes away from the station.
* **use realtime data**: enable this to include delay and cancellation information.


## How to get the api credentials

You have to apply for credentials via the HVV website. You can see their official guide [here](https://www.hvv.de/de/fahrplaene/abruf-fahrplaninfos/datenabruf) (the page is only available in German).

In your mail, tell them you are using your api credentials for use within Home Assistant. They will send you a contract you will have to sign and send back. After about a week, you will receive your api credentials.

## Data

Data is provided by [HVV](https://www.hvv.de/).
