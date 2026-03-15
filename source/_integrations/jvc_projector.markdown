---
title: JVC Projector
description: Instructions on how to integrate JVC Projector into Home Assistant.
ha_category:
  - Remote
ha_release: '2023.6'
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@SteveEasley'
  - '@msavazzi'
ha_domain: jvc_projector
ha_platforms:
  - binary_sensor
  - remote
  - select
  - sensor
  - switch
ha_integration_type: device
---

The **JVC Projector** {% term integration %} allows for the automation of [JVC Projectors](https://www.jvc.com/usa/projectors/).

## Supported models

This integration is intended for the automation of any modern JVC Projector with a network port.

## Prerequisites

JVC is requiring newer 2024+ models to use a user-generated password to access the network port for security reasons.

To set up these models:

1. Set a password on the projector's network setup page.
2. Use this password when adding the JVC Projector integration in Home Assistant.

{% include integrations/config_flow.md %}

## Remote

The JVC Projector remote platform will create a [Remote](/integrations/remote/) entity for the device. This entity allows you to send the following commands via the [remote.send_command](/integrations/remote/) action.

- menu
- up
- down
- left
- right
- ok
- back
- info
- input
- hide
- mpc
- cmd
- advanced-menu
- anamorphic
- cinema
- color-profile
- color-temp
- gamma-settings
- gamma
- hdmi1
- hdmi2
- lens-aperture
- lens-control
- mode-1
- mode-2
- mode-3
- mode-4
- mode-5
- mode-6
- mode-7
- mode-8
- mode-9
- mode-10
- natural
- picture-adjust
- picture-mode
- setting-memory
- 3d-format

## Binary sensor

The JVC Projector binary sensor platform will create the following [Binary Sensor](/integrations/binary_sensor/) entity:

- **Power**
  - **Description**: Indicates whether the projector is powered on. Returns true when the projector has a status of "on" or "warming", and false when the status is "cooling" or "standby".
  - **Available for models**: all

## Sensor

The JVC Projector sensor platform will create the following [Sensors](/integrations/sensor/) entities. Some of these sensors are disabled by default and may not be available for your model.

- **Model name**
  - **Description**: The model series of the JVC Projector. Note this value will be different than your projector model name since the JVC communication protocol only identifies the model series by an internal code. In parentheses is the library's own identifier for the communication protocol version being used.
  - **Available for models**: all

- **Status**
  - **Description**: The power status of the projector.
  - **Available for models**: all

- **Light time**
  - **Description**: The number of hours on the light source (lamp/laser).
  - **Available for models**: all

- **Color depth**
  - **Description**: The signal color depth.
  - **Available for models**: all

- **Color space**
  - **Description**: The signal color space.
  - **Available for models**: all

- **HDR**
  - **Description**: The signal HDR mode.
  - **Available for models**: 2017-present

- **HDR processing**
  - **Description**: The signal HDR processing mode.
  - **Available for models**: 2017-present

- **Picture mode**
  - **Description**: The signal picture mode.
  - **Available for models**: all

## Select

The JVC Projector select platform will create the following [Select](/integrations/select/) entities. Some of these selects are disabled by default and may not be available for your model.

- **Input**
  - **Description**: The HDMI input source.
  - **Options**: hdmi1, hdmi2
  - **Available for models**: all

- **Installation mode**
  - **Description**: The installation mode.
  - **Options**: Dependent on your detected model.
  - **Available for models**: all

- **Light power**
  - **Description**: The light power setting.
  - **Options**: Dependent on your detected model.
  - **Available for models**: all

- **Dynamic control**
  - **Description**: The dynamic control setting.
  - **Options**: Dependent on your detected model.
  - **Available for models**: all

- **Clear motion drive**
  - **Description**: The clear motion drive setting.
  - **Options**: Dependent on your detected model.
  - **Available for models**: all

- **Anamorphic**
  - **Description**: The anamorphic setting.
  - **Options**: Dependent on your detected model.
  - **Available for models**: all

## Switch

The JVC Projector switch platform will create the following Switch entities. Some of these switches are disabled by default and may not be available for your model.

- **E-Shift**
  - **Description**: The E-Shift mode setting.
  - **Available for models**: 2014-present

- **Low Latency Mode**
  - **Description**: The low latency mode setting.
  - **Available for models**: 2017-present
