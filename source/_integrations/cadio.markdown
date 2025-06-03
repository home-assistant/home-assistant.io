---
layout: integration
sidebar_current: integrations:cadio
title: CADIO
description: Integration with CADIO Home Automation platform.
stage: custom
iot_class: local_push
integration_type: hub
documentation: https://egycad.com/cadio/docs/discover-cadio/
codeowners:
  - "@mohamed-rashad-ata"
---

The CADIO integration allows Home Assistant to communicate with the CADIO Home Automation system over MQTT.

## Configuration

Navigate to Settings → Integrations → Add Integration → CADIO.
Enter CADIO login required fields credentials (email / password).
your devices will be discovered and added.

## Features

- Auto-discovery of devices
- Realtime status updates via MQTT
