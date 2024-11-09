---
title: Volkszaehler
description: Instructions on how to integrate Volkszaehler sensors into Home Assistant.
ha_category:
  - System monitor
ha_iot_class: Local Polling
ha_release: 0.78
ha_domain: volkszaehler
ha_platforms:
  - sensor
ha_integration_type: integration
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Volkszaehler** {% term integration %} consumes the system information provided by the [Volkszaehler](https://wiki.volkszaehler.org/) API.

## Configuration

To enable the Volkszaehler {% term integration %}, use the Home Assistant user interface to configure the integration. This eliminates the need to manually edit the `configuration.yaml` file.

### Step-by-Step Guide

1. **Open Home Assistant**:
   - Access your Home Assistant interface through your web browser.

2. **Navigate to Integrations**:
   - Go to **Settings** > **Integrations**.

3. **Add Integration**:
   - Click on the **+ Add Integration** button at the bottom right.

4. **Search for Volkszaehler**:
   - Type "**Volkszaehler**" in the search bar and select the integration from the list.

5. **Fill Out the Configuration Form**:
   - **Host**: The IP address or hostname of your Volkszaehler server (e.g., `192.168.1.100`).
   - **Port**: The port on which the Volkszaehler server is listening (Default: `80`).
   - **UUID**: The unique identifier (UUID) of your Volkszaehler data point.
   - **Name**: A custom name for the integration (Default: `Volkszaehler`).
   - **From**: *(Optional)* Start time for data collection. Must be specified in milliseconds since epoch or follow [PHP Date and Time Formats](https://www.php.net/manual/en/datetime.formats.php). If a relative value is provided, it refers to `now`. If `to` is not specified, it defaults to `now` minus 24 hours.
   - **To**: *(Optional)* End time for data collection. Must be specified in milliseconds since epoch or follow [PHP Date and Time Formats](https://www.php.net/manual/en/datetime.formats.php). If a relative value is provided, it refers to the `from` timestamp. If `from` is not specified, it defaults to `now`.
   - **Scan Interval**: The update interval in seconds (Default: `60` seconds). Range: `10` to `86400` seconds (24 hours).
   - **Monitored Conditions**: A list of conditions to monitor (Default: `["average", "consumption", "max", "min", "last"]`).

6. **Complete Configuration**:
   - Click **Submit** to finalize the setup. Home Assistant will attempt to connect to the Volkszaehler server and create the necessary sensors.

### Configuration Options

{% configuration %}
host:
  description: The IP address or hostname of your Volkszaehler server.
  required: false
  type: string
  default: localhost
port:
  description: The port on which the Volkszaehler server is listening.
  required: false
  type: integer
  default: 80
uuid:
  description: The UUID of the device to track.
  required: true
  type: string
name:
  description: The prefix for the sensors.
  required: false
  type: string
  default: Volkszaehler
from:
  description: Start time for data collection. Must be specified in milliseconds since epoch or follow [PHP Date and Time Formats](https://www.php.net/manual/en/datetime.formats.php). If `from` is not specified, it defaults to `now`.
  required: false
  type: string
  default: None
to:
  description: End time for data collection. Must be specified in milliseconds since epoch or follow [PHP Date and Time Formats](https://www.php.net/manual/en/datetime.formats.php). If `to` is not specified, it defaults to `now-24h`.
  required: false
  type: string
  default: None
scan_interval:
  description: The update interval in seconds.
  required: false
  type: integer
  default: 60
monitored_conditions:
  description: Entries to monitor.
  required: false
  type: list
  default: average, consumption, max, min, last
  keys:
    average:
      description: The average power.
    consumption:
      description: The power consumption.
    max:
      description: The maximum power.
    min:
      description: The minimum power.
    last:
      description: The last measured power value.
{% endconfiguration %}

### Timestamp Formats and Relative Values

The `from` and `to` timestamps can be specified in two formats:

- **Milliseconds Since Epoch**: An integer representing milliseconds since January 1, 1970 (e.g., `1672531200000`).
- **PHP Date and Time Formats**: A string following [PHP Date and Time Formats](https://www.php.net/manual/en/datetime.formats.php) (e.g., `"2023-01-01 00:00:00"`).

| Relative Value | Example |
|----------------|---------|
| yesterday | yesterday 14:00 |
| back of hour | "back of 7pm", "back of 15" |
| today | 00:00:00 of current day |
| tomorrow | 00:00:00 of next day |
| number + unit | "+5 weeks", "12 days", "-7 weekdays" |
|first day of                      |"first day of January 2024"        |

## Options

After setup, you can modify additional options via the Options Flow. This allows you to adjust the `scan_interval`, `from`,`to` and `monitored_conditions` without reconfiguring the entire integration.

### Changing Options

1. **Open Home Assistant**:
   - Access your Home Assistant interface through your web browser.

2. **Navigate to Integrations**:
   - Go to **Settings** > **Integrations**.

3. **Find the Volkszaehler Integration**:
   - Locate your **Volkszaehler** integration and click on it.

4. **Open Options**:
   - Click on **Options**.

5. **Adjust Options**:
   - **Scan Interval**: Change the update interval in seconds. Range: `10` to `86400` seconds.
   - **From**: Modify the start time for data collection
   - **To**: Modify the end time for data collection
   - **Monitored Conditions**: Select the conditions you want to monitor (e.g., `average`, `consumption`, `max`, `min`, `last`).

6. **Save Changes**:
   - Click **Save** to apply the changes. The integration will automatically adopt the new settings without requiring a Home Assistant restart.

## Sensors

The **Volkszaehler**-integration creates various sensors based on the monitored conditions. These sensors can be used in your Home Assistant dashboards to display real-time data.

### Available Sensors

| Condition        | Sensor Name            | Unit of Measurement | Icon                 |
|------------------|------------------------|---------------------|----------------------|
| **average**      | Average                | Watt (`W`)          | mdi:power-off        |
| **consumption**  | Consumption            | Watt-hour (`Wh`)    | mdi:power-plug       |
| **max**          | Max                    | Watt (`W`)          | mdi:arrow-up         |
| **min**          | Min                    | Watt (`W`)          | mdi:arrow-down       |
| **last**         | Last                   | Watt (`W`)          | mdi:history          |

### Example Sensors

- **Volkszaehler Average**: Displays the average power in watts.
- **Volkszaehler Consumption**: Displays the total consumption in watt-hours.
- **Volkszaehler Max**: Displays the maximum power value in watts.
- **Volkszaehler Min**: Displays the minimum power value in watts.
- **Volkszaehler Last**: Displays the most recently measured power value in watts.

## Full Examples

Since the integration is now configured via the Home Assistant user interface (`config_flow`), there are no `configuration.yaml` examples required. However, for reference, here's how a YAML configuration looked before the update:

```yaml
# Example configuration.yaml entry (Deprecated)
sensor:
  - platform: volkszaehler
    host: demo.volkszaehler.org
    uuid: "57acbef0-88a9-11e4-934f-6b0f9ecd95a8"
    monitored_conditions:
      - average
      - consumption
      - min
      - max
```
