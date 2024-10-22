---
title: Smart Meter B Route
description: Integrate your Smart Meter using B Route.
ha_category:
  - Energy
  - Sensor
ha_release: '2024.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@SeraphicRav'
ha_domain: smart_meter_b_route
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
---

The Smart Meter B Route integration allows you to access the data of your smart meter using the B Route protocol.

## Overview

This integration enables you to access and monitor your household energy consumption data from a smart meter using the B Route protocol in Home Assistant. You'll need a compatible USB dongle and your B Route credentials to set up this integration. It has been tested for the Japanese market.

## Requirements

1. **Compatible USB Dongle**: Tested with the Wi-SUN USB dongle from [Ratoc Systems](https://www.ratocsystems.com/products/wisun/usb-wisun/rs-wsuha/).
2. **B Route Credentials**: Obtain your B Route credentials from your utility company.
3. **Smart Meter**: A smart meter that supports the B Route protocol. The installation is free, but if you are renting, you will need to contact your house management company.

## Signal Reach

The Wi-SUN USB dongle has a typical signal reach of approximately 50 meters indoors and up to 200 meters outdoors, depending on environmental factors such as walls, interference, and other obstacles.

## Obtaining B Route Credentials

1. **Contact Your Utility Company**: Reach out to your electricity provider and request your B Route credentials. For instance, for Tokyo, it is TEPCO.
2. **Provide Necessary Information**: You may need to provide your smart meter ID, customer ID, or other identifying information.
3. **Receive Credentials**: Your utility company will provide you with a user ID and password for accessing the B Route data.

Even if you have a contract with a new power provider, you can use this service. For example, if you have a contract with a new power provider and live in Tokyo, you will need to apply to TEPCO.
Ensure that your power supply is not a bulk power supply for an apartment building.

Refer to the links below to apply for your B Route credentials:

- [Hokkaido Electric Power](https://www.hepco.co.jp/network/electric_life/service/electronic_meter/b_route_service_low.html)
- [Tohoku Electric Power](https://nw.tohoku-epco.co.jp/consignment/request/other/)
- [TEPCO](http://www.tepco.co.jp/pg/consignment/liberalization/smartmeter-broute.html)
- [Chubu Electric Power](https://www.chuden.co.jp/home/smartmeter/intro/use/index.html)
- [Hokuriku Electric Power](http://www.rikuden.co.jp/nw_kojin/b_routeservice.html)
- [Kansai Electric Power](http://www.kepco.co.jp/corporate/smartmeter/routeb/routeb_how.html)
- [Chugoku Electric Power](https://www.energia.co.jp/nw/safety/smartmeter/route-b.html)
- [Shikoku Electric Power](https://www.yonden.co.jp/nw/b_root/index.html)
- [Kyushu Electric Power](https://www.kyuden.co.jp/td_service_meter_b-root_index.html)
- [Okinawa Electric Power](https://www.okiden.co.jp/business-support/service/smartmeter/b-route/index.html)
