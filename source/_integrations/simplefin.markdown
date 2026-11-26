---
description: Instructions on the SimpleFIN Integration for personal finance.
ha_release: 2024.8
ha_domain: simplefin
---

[SimpleFIN](http://simplefin.org) allows users to share read-only financial data. This is a paid service although it is quite affordable ($1.50 a month).

{% include integrations/config_flow.md %}



## Setup Guide

Within the SimpleFIN Interface, you can create a **Claim Token**, a one-time token that can be exchanged for an **Access URL**. You can enter either a **Claim Token** or an **Access URL** as a configuration element for this integration.

### Accounts & Devices

Each `account` will be set up as a device in Home Assistant, and it will contain the following sensors:

|Sensor|Description|
|-------|---------------|
|Age| This sensor shows when the data was retrieved by the SimpleFin API |
|Balance|Account balance|
|Problem| Binary sensor that indicates whether the account sync may have a problem |
