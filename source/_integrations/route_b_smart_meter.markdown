---
title: Smart Meter B Route
description: Integrate your Smart Meter using B Route.
ha_category:
  - Energy
  - Sensor
ha_release: '2025.10'
ha_iot_class: Local Polling
ha_codeowners:
  - '@SeraphicRav'
ha_domain: route_b_smart_meter
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: device
ha_quality_scale: bronze
---

The **Smart Meter B Route** {% term integration %} allows you to access the data of your smart meter using the B Route protocol.

## Overview

This integration enables you to access and monitor your household energy consumption data from a smart meter using the B Route protocol in Home Assistant. You'll need a compatible USB dongle and your B Route credentials to set up this integration. It has been tested for the Japanese market and most households are eligible, the installation of a smart meter is free. You can find some information by TEPCO [here](https://www.tepco.co.jp/en/pg/development/domestic/smartmeter-e.html) but other utility companies may have similar pages.

## Prerequisites

Even if you have a contract with a new power provider, you can still use this service by applying to the regional utility company (for example, TEPCO in Tokyo).
Ensure that your power supply is not a bulk power supply for an apartment building.

1. Compatible USB dongles (tested with):
    - Wi-SUN USB dongle from [Ratoc Systems](https://www.ratocsystems.com/products/wisun/usb-wisun/rs-wsuha/).
    - Wi-SUN Module RL7023 Stick-D/DSS from [Tessera Technology Inc.](https://www.tessera.co.jp/product/rfmodul/rl7023stick-d_dss.html).
    - Wi-SUN Module RL7023 Stick-D/IPS from [Tessera Technology Inc.](https://www.tessera.co.jp/product/rfmodul/rl7023stick-d_ips.html) (Production ended).
2. [B Route credentials from your utility company](#obtaining-b-route-credentials).
3. Smart meter:
    - A smart meter that supports the B Route protocol.
    - If you are renting but do not have a smart meter equipped, you will need to contact your house management company, as the installation is free but may require permission.

{% include integrations/config_flow.md %}

### Signal reach

The Wi-SUN USB dongle has a typical signal reach of approximately 50 meters indoors and up to 200 meters outdoors, depending on environmental factors such as walls, interference, and other obstacles.

## Obtaining B Route credentials

1. **Contact your utility company**: Reach out to your electricity provider and request your B Route credentials. For example, if you live in Tokyo, contact TEPCO.
2. **Provide necessary information**: You may need to provide your smart meter ID, customer ID, or other identifying information.
3. **Receive credentials**: Your utility company will provide you with a user ID and password for accessing the B Route data.

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

## Retrieving your monthly consumption data

By default, the data you get is the total consumption since an unknown date in the past. If you want to get your monthly consumption data, you can use the [utility_meter](/integrations/utility_meter/) {% term integration %}.

## Retrieving your monthly cost data

To get your monthly cost data, you can use the [template sensor](/integrations/template/) {% term integration %} along with the [utility_meter](/integrations/utility_meter/) {% term integration %}. You will need to know your electricity rate (cost per kWh) to calculate the cost. For instance, if you are using Tokyo Gas and have a price depending on your usage, you can use the following template with a unit of measurement set to your currency per kWh (for example, JPY/kWh) and the appropriate sensor name:

```yaml
{% raw %}
{% set consumption = states('sensor.tokyo_gas_electricity_monthly_consumption') | float(0) %}
{% if consumption < 120 %}
29.9
{% elif consumption < 300 %}
35.41
{% else %}
37.47
{% endif %}
{% endraw %}
```

## Removing the {% term integration %}

This {% term integration %} follows standard {% term integration %} removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
