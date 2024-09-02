---
title: One-Time Password (OTP)
description: Instructions on how to add One-Time Password (OTP) sensors into Home Assistant.
ha_category:
  - Sensor
  - Utility
ha_iot_class: Local Polling
ha_release: 0.49
ha_quality_scale: internal
ha_domain: otp
ha_platforms:
  - sensor
ha_config_flow: true
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The `otp` {% term integration %} generates One-Time Passwords according to [RFC6238](https://tools.ietf.org/html/rfc6238) that is compatible with most OTP generators available, including Google Authenticator. You can use this when building custom security solutions and want to use "rolling codes", that change every 30 seconds.

{% include integrations/config_flow.md %}

## Generating a token

A simple way to generate a `token` for a new sensor is to run this snippet of Python code in your Home Assistant virtual environment:

```shell
$ pip3 install pyotp
$ python3 -c 'import pyotp; print("Token:", pyotp.random_base32())'
Token: IHEDPEBEVA2WVHB7
```

To run in a Docker container:

```shell
$ docker exec -it home-assistant python -c 'import pyotp; print("Token:", pyotp.random_base32())'
Token: IHEDPEBEVA2WVHB7
```

Copy and paste the token into your Home Assistant configuration and add it to your OTP generator. Verify that they generate the same code.

{% important %}
It is vital that your system clock is correct both on your Home Assistant instance and on your OTP generator device (e.g., your phone). If not, the generated codes will not match! Make sure NTP is running and syncing your time correctly before creating an issue.
{% endimportant %}
