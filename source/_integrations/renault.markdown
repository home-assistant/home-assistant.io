---
title: Renault
description: Instructions on how to integrate Renault car into Home Assistant.
ha_category:
  - Car
  - Sensor
ha_release: 2021.8
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners: '@epenet'
ha_domain: renault
---

The Renault integration offers integration with the **MyRenault** cloud service and provides sensors such as charger state and temperature.

This integration provides the following platforms:

- Sensors - such as battery level, outside temperature, odometer, estimated range, and charging rate.

## Prerequisites

You need two API keys: one for Gigya and one for Kamereon and they shouldn't be confused with your API credentials. Instructions can be found at [https://github.com/jamesremuscat/pyze#obtaining-api-keys].


{% include integrations/config_flow.md %}

All vehicles linked to the account should then get added as devices, with sensors added as linked entity.

## Services

### Service `renault.ac_start`

Start A/C on vehicle.

  | Service data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |
  | `temperature` | yes | Target A/C temperature in °C |
  | `when` | no | Timestamp for the start of the A/C (optional - defaults to now) |

### Service `renault.ac_cancel`

Cancel A/C on vehicle.

  | Service data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |

### Service `renault.charge_set_schedules`

Update charge schedule on vehicle.

  | Service data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |
  | `schedules` | yes | Schedule details. Can be a single schedule or a list of schedules |

### Service `renault.charge_start`

Start charge on vehicle.

  | Service data attribute | Required | Description |
  | ---------------------- | -------- | ----------- |
  | `vehicle`| yes | device_id of the vehicle |

