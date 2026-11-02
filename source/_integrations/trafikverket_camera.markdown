---
description: Instructions on how to integrate Trafikverket Camera within Home Assistant.
ha_release: 2023.9
ha_domain: trafikverket_camera
---

The **Trafikverket Camera** {% term integration %} shows images from the public traffic cameras of [Trafikverket](https://www.trafikverket.se/), the Swedish Transport Administration. Use it to check road and traffic conditions on your route in Sweden directly from your Home Assistant dashboard.

Each camera you add becomes its own entry in Home Assistant, with a camera entity showing the latest picture and sensors with details about the camera.

## Use cases

- Check the road conditions on your daily commute before you leave home.
- Show a traffic camera next to the weather on your dashboard, for example together with the [Trafikverket Weather Station](/integrations/trafikverket_weatherstation/) integration.
- Get a notification when a camera you rely on stops working.
- Save a snapshot of the road at a fixed time every day.

## Prerequisites

1. Register an account on the [Trafikverket open data portal](https://data.trafikverket.se/).
2. After you sign in, create an API key and copy it.
3. Find the camera you want to add on the [Trafikverket traffic information map](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=0%2F650778%2F7200000%2F&Layers=TrafficCameras%2B=). Note the name or location of the camera.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: "The API key you created on the [Trafikverket open data portal](https://data.trafikverket.se/)."
Location:
  description: "The name, description, or ID of the camera, or part of it. For example, `Hisingsleden`. Be as specific as possible, so the search finds only one camera."
{% endconfiguration_basic %}

If more than one camera matches your search, Home Assistant shows a list of the matching cameras. Each camera is listed with its ID, name, and location.

{% configuration_basic %}
Choose camera:
  description: "The camera you want to add from the list of matching cameras."
{% endconfiguration_basic %}

For example, a search for [Hisingsleden](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=12%2F312855%2F6401262.65%2F&Layers=TrafficCameras%2B=) matches several cameras. To go straight to one camera, use a more detailed location, such as `Hisingsleden norrut`.

To add more cameras, add the integration again for each camera.

## Reconfiguration

You can change the API key or switch to another camera without removing the integration.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Trafikverket Camera** integration.
2. Next to the camera entry, select the three dots {% icon "mdi:dots-vertical" %} menu, then select **Reconfigure**.
3. Enter the new **API key** or **Location**, and select **Submit**.

## Supported functionality

The **Trafikverket Camera** integration provides the following entities for each camera.

### Camera

- **Camera**
  - **Description**: The latest picture from the traffic camera. If Trafikverket provides a full-size picture, the integration uses it.
  - **Attributes**:
    - **Description**: A free-text description of the camera.
    - **Location**: Where the camera is placed.
    - **Camera type**: The type of camera.

### Binary sensors

- **Active**
  - **Description**: Shows whether the camera is active.

### Sensors

- **Direction**
  - **Description**: The direction the camera is pointing, in degrees.
- **Photo time**
  - **Description**: The date and time when the latest picture was taken.
- **Modified**
  - **Description**: The date and time when the camera information was last changed.
  - **Remarks**: [Disabled by default](/docs/configuration/customizing-entities/#disabling-or-enabling-an-entity).
- **Photo URL**
  - **Description**: The web address of the latest picture.
  - **Remarks**: Disabled by default.
- **Status**
  - **Description**: The status of the camera, as reported by Trafikverket.
  - **Remarks**: Disabled by default.
- **Camera type**
  - **Description**: The type of camera.
  - **Remarks**: Disabled by default.

## Trafikverket Camera automation examples

You can use the camera entities in automations, for example to know when a camera stops working or to keep a picture of the road from a certain time of day.

{% include docs/paste_yaml_tip.md %}

### Automation: Get notified when a camera stops working

If you rely on a camera to check your route, it's useful to know when it's no longer active. This automation sends a notification to your phone when the **Active** binary sensor has been off for 30 minutes.

- **Trigger**: State changed
  - **Target**: Hisingsleden norrut Active (`binary_sensor.hisingsleden_norrut_active`)
  - **To**: Off
  - **For**: 00:30:00
  - **For at least**: `00:30:00`
- **Action**: Send a notification message
  - **Target**: My Device (`notify.my_device`)

{% details "YAML example for a notification when a camera stops working" %}

{% example %}
automation: |
  alias: "Notify when traffic camera stops working"
  triggers:
    - trigger: state
      entity_id: binary_sensor.hisingsleden_norrut_active
      to: "off"
      for:
        minutes: 30
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_device
      data:
        message: >
          The Hisingsleden norrut traffic camera is no longer active.
{% endexample %}

{% enddetails %}

### Automation: Save a picture of the road every morning

This automation saves a picture from the camera every weekday morning, so you can look back at the road conditions on different days.

- **Trigger**: Time: At 07:00:00
- **Condition**: Time: Weekdays Monday to Friday
- **Action**: Take camera snapshot
  - **Target**: Hisingsleden norrut (`camera.hisingsleden_norrut`)
  - **Filename**: {% raw %}`/config/www/traffic/hisingsleden_{{ now().strftime('%Y-%m-%d') }}.jpg`{% endraw %}

{% details "YAML example for saving a picture every morning" %}

{% example %}
automation: |
  alias: "Save traffic camera picture every morning"
  triggers:
    - trigger: time
      at: "07:00:00"
  conditions:
    - condition: time
      weekday:
        - mon
        - tue
        - wed
        - thu
        - fri
  actions:
    - action: camera.snapshot
      target:
        entity_id: camera.hisingsleden_norrut
      data:
        filename: "/config/www/traffic/hisingsleden_{{ now().strftime('%Y-%m-%d') }}.jpg"
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} Trafikverket for new camera information and a new picture every 5 minutes.

Trafikverket cameras take new pictures on their own schedule, which can be less often than every 5 minutes. The **Photo time** sensor shows when the current picture was taken.

## Known limitations

- Only cameras from Trafikverket in Sweden are available.
- The integration shows still pictures, not a live video stream.
- Each integration entry covers one camera. To follow several cameras, add the integration once for each camera.

## Troubleshooting

{% details "Could not find a camera location with the specified name" %}

### Symptom: "Could not find a camera location with the specified name"

When you set up or reconfigure the integration, the form shows the message "Could not find a camera location with the specified name".

#### Description

No camera matches the text you entered in **Location**.

#### Resolution

1. Open the [Trafikverket traffic information map](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=0%2F650778%2F7200000%2F&Layers=TrafficCameras%2B=) and select the camera you want to add.
2. Copy the name of the camera exactly as it's shown on the map.
3. Paste it in **Location** and try again. If you still get the message, try a shorter part of the name.

{% enddetails %}

{% details "Invalid authentication" %}

### Symptom: "Invalid authentication"

During setup, the form shows the message "Invalid authentication". Or, after setup, Home Assistant asks you to reauthenticate the integration.

#### Description

Trafikverket did not accept the API key. The key may have been entered incorrectly, or it may have been removed on the Trafikverket open data portal.

#### Resolution

1. Sign in to the [Trafikverket open data portal](https://data.trafikverket.se/) and check that your API key is still listed.
2. Copy the API key again, or create a new one.
3. Enter the API key in Home Assistant. If Home Assistant asks you to reauthenticate, follow the steps on the screen.

{% enddetails %}

{% details "The camera picture is old or doesn't change" %}

### Symptom: The camera picture doesn't update

The camera entity keeps showing the same picture.

#### Description

The camera may be inactive, or it may not have taken a new picture yet.

#### Resolution

1. Check the **Active** binary sensor. If it's off, the camera is not in service at the moment.
2. Check the **Photo time** sensor to see when the latest picture was taken.
3. If the camera is active and the picture is still old, check the [Trafikverket traffic information map](https://www.trafikverket.se/trafikinformation/vag/?TrafficType=personalTraffic&map=0%2F650778%2F7200000%2F&Layers=TrafficCameras%2B=) to see if the picture is also old there.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

If you no longer use the API key for anything else, you can also remove it from the [Trafikverket open data portal](https://data.trafikverket.se/).
