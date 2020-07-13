---
title: "Bright Sky"
description: "Instructions on how to integrate Bright Sky within Home Assistant."
logo: dwd.png
featured: false
ha_category:
  - Weather
ha_release: 2021.01
ha_iot_class: Cloud Polling
ha_quality_scale: silver
ha_codeowners:
  - '@mweinelt'
ha_domain: bright_sky
---

The `bright_sky` platform uses the [Bright Sky](https://brightsky.dev) JSON API to query meteorological provided by the Deutsche Wetterdienst (DWD)

One limitation of this integration stems from the DWDs focus on Germany and the Bright Sky maintainers state the following:
>  Due to its nature as German meteorological service, the observations published by the DWD have a strong focus on Germany. While there is data for some locations outside of Germany, mainly in the rest of Europe, it is currently not a priority for us. Your mileage may vary.

The API currently imposes no rate limits, this platform updates at most every 10 minutes. Details about the API are available in the [BrightSky documentation](https://brightsky.dev/docs/).

## Configuration

To add Bright Sky to your installation set it up via the **Integrations** menu: **Configuration** > **Integrations***:

+ Click on **Add Integration** in the lower right corner

* Fill out the configuration parameters and confirm by clicking **Submit**

