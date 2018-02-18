---
layout: page
title: "Yahoo Weather"
description: "Instructions how to integrate Yahoo Weather within Home Assistant."
date: 2016-07-06 9:06
sidebar: true
comments: false
sharing: true
footer: true
logo: yahooweather.png
ha_category: Weather
ha_release: 0.47
---


The `yweather` platform uses [Yahoo Weather](https://www.yahoo.com/news/weather/) as a source for current meteorological data. This component will show you the condition and temperatures for max. 10 days.

<p class='note warning'>
Use of the Yahoo Weather API should not exceed reasonable request volume. Access is limited to 2000 signed calls per day.
</p>

The `woeid` (Where On Earth ID) for your location, as shown in the example below. You can find your WOEID by copying the numeric digits at the end of the URL for your location at [Yahoo Weather](https://www.yahoo.com/news/weather/). If you don't add a WOEID, it will be generated from Home Assistant's latitude and longitude.

To add Yahoo Weather to your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
weather:
  - platform: yweather
```

Configuration variables:

- **woeid** (*Optional*): See above.
- **name** (*Optional*): The name of the sensor. To easily recognize each sensor when adding more than one Yahoo weather sensor, it is recommended to use the name option. Defaults to `Yweather`. 


<p class='note'>
This platform is an alternative to the [`yweather`](/components/sensor.yweather/) sensor. 
</p>

Details about the API are available in the [Yahoo! Developer Network](https://developer.yahoo.com/weather/).

