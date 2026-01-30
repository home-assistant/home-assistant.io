---
title: Washington State Department of Transportation (WSDOT)
description: Instructions on how to integrate WSDOT data into your home.
ha_category:
  - Transport
ha_iot_class: Cloud Polling
ha_release: 0.37
ha_domain: wsdot
ha_platforms:
  - sensor
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs
ha_config_flow: true
ha_codeowners:
  - '@ucodery'
---

The **Washington State Department of Transportation (WSDOT)** {% term integration %} will give you travel time information from the [Washington State Department of Transportation (WSDOT)](https://wsdot.com/).

## Prerequisites

You need to get a free Traveler Information API key from the [WSDOT API webpage](https://wsdot.com/traffic/api/). Enter your email address to instantly receive the key.

{% include integrations/config_flow.md %}

{% configuration_basic %}
API key:
  description: Your API key from WSDOT. This is a series of eight, four, four, four, and twelve hexadecimal components separated by dashes (for example, `0123456a-789b-012c-345d-6789012345ef`).
{% endconfiguration_basic %}

### Adding travel time routes

After you've set up the integration with your API key, you can add individual travel time routes:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. On the **WSDOT** integration card, select **Add entry**.
3. Select the route you want to monitor from the dropdown list.
4. Select **Submit**.

You can add as many routes as you need by repeating these steps. Each route will create a separate sensor showing the current travel time for that route.

## Supported functionality

The **WSDOT** integration provides the following functionality.

### Sensors

- **Travel time sensors**: Display the current travel time in minutes for each configured route. The sensor updates every 2 minutes with the latest data from WSDOT.

{% note %}
While WSDOT provides information about ferry schedules, mountain passes, and tolls, this integration currently supports only travel time data.
{% endnote %}

## Examples

Here's an example of the sensor in use:

<p class='img'>
    <img
        src='/images/screenshots/wsdot_sensor.png'
        alt='screenshot of a travel duration x time of day graph showing that the I-90 Eastbound HOV lane from Seattle to Bellevue has held steady at 11 minutes for the last 16 minutes'
    />
</p>

## Data updates

**WSDOT** retrieves travel time updates every 2 minutes. This is not currently configurable.

## Advanced configuration

While the UI-based configuration is recommended, you can also manually configure routes using YAML if needed. This allows you to customize sensor names or select specific route IDs.

To manually configure routes, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: wsdot
    api_key: YOUR_API_KEY_HERE
    travel_time:
      - id: 96
        name: I-90 Eastbound HOV
      - id: 97
```

{% include integrations/restart_ha_after_config_inclusion.md %}

To find the Travel Time ID for your routes, visit <https://wsdot.com/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=[your_api_key_here]> (substitute your API key). This returns a JSON list of all available routes. Search for the `TravelTimeID` field to find the number you need.

## Troubleshooting

If no tips here help resolve your issue, feel free to
[open a bug](https://github.com/home-assistant/core/issues/new?template=bug_report.yml&integration_name=wsdot&integration_link=https%3A%2F%2Fwww.home-assistant.io%2Fintegrations%2Fwsdot)
and make sure to include the
[debug logs](/docs/configuration/troubleshooting/#debug-logs-and-diagnostics) and
[diagnostics data](/integrations/diagnostics) whenever possible.

### Can't set up the device

#### Symptom: "Invalid API Key"

When trying to set up the integration, the form shows the message "Invalid API Key".

##### Description

This means that the API key entered in the configuration was denied access to <https://wsdot.wa.gov>.

##### Resolution

To resolve this issue, try the following steps:

1. Double-check that you input your API key correctly.
   - A correct API Key is a series of eight, four, four, four, twelve hexadecimal (`0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f`) components.
   - Example: `0123456a-789b-012c-345d-6789012345ef`.
   - Make sure that you included the dashes, and no extra spaces or newlines.
2. Test your API key.
   - Test your API key directly against WSDOT by entering it into the following URL in your browser:<https://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson?AccessCode=[your-api-key-here]>.
   - If this returns a "Request Error" page saying "Invalid Access Code", you will need to check your key, or obtain a new one.
   - If this returns a page of raw JSON data, your API key is valid.
3. Obtain a new API key.
   - If you have not yet obtained an API key, or you lost or mistyped an earlier API key, you can get a new one.
   - Navigate to <https://wsdot.wa.gov/traffic/api/>, enter your email and hit the <kbd>Submit</kbd> button. The new API key will immediately be displayed below the input box.

### No data displayed

#### Symptom: "Unknown" time shown

##### Description

One or more **WSDOT** sensor displays `unknown`.

##### Resolution

The **WSDOT** travel sensors poll for new travel times every 2 minutes.
You may have to wait up to 4 minutes for initial durations to populate.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
