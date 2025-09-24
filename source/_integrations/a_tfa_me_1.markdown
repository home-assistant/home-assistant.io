---
title: TFA.me
description: Instructions on how to integrate the TFA.me integration into Home Assistant.
ha_release: "2025.10"
ha_iot_class: Local Poll
ha_codeowners:
  - '@DrMatthiasBlaschke'
ha_domain: a_tfa_me_1
ha_integration_type: hub
ha_category:
  - Sensor
ha_platforms:
  - diagnostics
  - sensor
works_with:
  - local
---


The **TFA.me {% term integration %}** is used to integrate the **TFA.me** devices (WiFi weather stations & measuring sensors) of [TFA Dostmann](https://www.tfa-dostmann.de/en/). The **TFA.me system** offers multi-day weather forecasts and precise monitoring of local measurements in combination with a powerful online platform.


## How it works

Each **TFA.me station** measures temperature and humidity internally, and depending on the model, other measurement data as well. Each station also has an 868 MHz radio receiver that can receive external {% term sensors %} such as temperature, humidity, wind and rain sensors. 

The internal and external measurement values ​​are partially displayed on the station's display and also transferred to the [**TFA.me cloud**](https://go.tfa.me). When measured values ​​are received station will add the current time stamp (UTC) and the 868 MHz RSSI (Radio Signal Strength Indicator) value to the data set. 

In addition, each **TFA.me station** also has the ability to hold the most recent measurement data in a table and make it available to Home Assistant via an integrated web server. Therefore, Home Assistant can query measurement data directly and locally from your station via the LAN (WiFi).


{% include integrations/config_flow.md %}


## Supported TFA.me devices

Currently (summer 2025), the following [TFA.me stations and sensors ](https://www.tfa-dostmann.de/en/produkte/wetterstationen/wetterstationen-wlan/tfa-me/) are supported. This product range is continuously being expanded. 

{% details "Stations and sensors list ..." %}


[TFA.me](https://www.tfa-dostmann.de/en/produkte/wetterstationen/wetterstationen-wlan/tfa-me/) Stations 

All stations deliver cyclic the following internal measurement values. 

| ID | Value 1 | Value 2 | Value 3 | TX(*) | Events |
| ---|---------|---------|---------|-------------|--------|
| [01](https://www.tfa-dostmann.de/en/produkt/wlan-gateway-tfa-me-id-01-35-8103)| Temperature | Humidity | - | 5 | No |
| [02](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-02-35-8100) | Temperature | Humidity | - | 5 | No |[02]
| [03](https://www.tfa-dostmann.de/en/produkt/wlan-funk-wetterstation-tfa-me-id-03-35-8101/) | Temperature | Humidity | - | 5 | No |
| [04](https://www.tfa-dostmann.de/en/produkt/wlan-funk-wetterstation-tfa-me-id-04-35-8102/) | Temperature | Humidity | - | 5 | No |
| [05](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-05-35-8106/) | Temperature | Humidity | Barometric<BR>Pressure | 5 | No |
| [06](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-06-35-8108/) | Temperature | Humidity | - | 5 | No |
| [07](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-07-35-8107/) | Temperature | Humidity | - | 5 | No |
| [08](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-08-35-8105/) | Temperature | Humidity | - | 5 | No |


[TFA.me](https://www.tfa-dostmann.de/en/produkte/wetterstationen/wetterstationen-wlan/tfa-me/) Sensors

All 868 MHz sensors transmit cyclic the following measurement values in a data set: 

| ID | Value 1 | Value 2 | Value 3 | TX(*) | Events |
|----|---------|---------|---------|--------------|--------|
| [A0](https://www.tfa-dostmann.de/en/product/temperature-humidity-transmitter-id-a0-30-3900/) | Temperature | Humidity | - | 5 | No |
| [A1](https://www.tfa-dostmann.de/en/product/rain-transmitter-tfa-me-id-a1-30-3903/) | Rain | - | - | 120 | Rain |
| [A2](https://www.tfa-dostmann.de/en/product/wind-meter-tfa-me-id-a2-30-3904/)| Wind direction | Wind speed | Wind gust | 5 | No |
| [A3](https://www.tfa-dostmann.de/en/product/2-fold-temperature-transmitter-with-waterproof-cable-sensor-id-a3-30-3902/) | Temperature | Temperature probe | - | 5 | No |
| [A4](https://www.tfa-dostmann.de/en/product/professional-temperature-humidity-transmitter-with-waterproof-cable-sensor-id-a4-30-3905/)| Temperature | Humidity | Temperature<BR> probe | 1 | No |
| [A5](https://www.tfa-dostmann.de/en/product/temperature-transmitter-id-a5-30-3901/) | Temperature | - | - | 5 | No |
| [A5](https://www.tfa-dostmann.de/en/product/pool-transmitter-tfa-me-id-a5-pool-30-3907/) | Temperature (Pool) | - | - | 5 | No |
| [A6](https://www.tfa-dostmann.de/en/product/professional-temperature-humidity-transmitter-id-a6-30-3906/)| Temperature | Humidity | - | 1 | No |


(*) TX: Transmission interval in minutes

All sensors additional deliver a low battery value.

{% enddetails %}

{% tip %}
{% endtip %}


## Station: Basic configuration steps

**Quick start:**

{% details "1. Connect your station to your WiFi" %}

**Note**: You can skip this step when your station is already connected to your WiFi.
Otherwise please follow the instructions from the datasheets above. Basically it works like this:

1. Insert power supply cable and batteries
2. Press **WiFi button** for 5 seconds until you hear a **"beep"**. (The WiFi button placed in battery case)
3. Go to the Wi-Fi settings of your device (Smartphone, tablet, PC) and look for a network named **TFA-ME-ID-XXX-XXX-XXX**. XXX-XXX-XXX is the 9-digit serial number of your station.
4. Connect your device to the Wi-Fi network **TFA-ME-ID-XXX-XXX-XXX**
5. Open a browser and enter **"192.168.8.1"** or **"me.local"**
6. Select your Wi-Fi network from the list, enter your password, and select **Submit**
7. Wait a few seconds until your station is connected to your Wi-Fi network

{% enddetails %}


{% details "2. Activate Home Assistant funtionality of your station" %} 

**Use the station's network settings**:

The Home Assistant functionality in TFA.me stations is deactivated by default.
To get access to the internal web pages for settings & configurations open a web browser and enter the **IP address** or the **mDNS name** of your station.

**Use IP:** To get the IP address of your station press and hold the **"+"** key and wait until the IP is shown. 
**Example:** In your browser enter "192.168.1.35" 

**Use mDNS name:** You can find the serial number on a sticker at the backside of your station. 
**Example:** In your browser enter "tfa-me-05B-3E4-E44.local"


Change station settings to activate Home Assistant:

1. On the main website, click on the link **"Network settings"**
2. Set "Local API" to "Yes" and press "Submit", this activates the Home Assistant functionality of the station.

**Network settings:**
<p class='img'>
  <img src='/images/integrations/a_tfa_me_1/tfa_me_local_api_activation.png' width=50% height=50% />
</p>

3. Optional: Use link **"HA menu"** to enter main menu <br>
   ("IP/ha_menu" or "tfa-me-XXX-XXX-XXX.local")

Your station is now prepared for Home Assistant. It generates a table with all station & sensor measurement values. The list may be emtpy at start because the sensor values were not received. Just wait some minutes until you see all sensors. Normally this only takes 5 minutes which is the typically sensor & station transmission interval. 

The list of sensor measured values ​​can also be found under the menu item **Sensors table**:

<p class='img'>
  <img src='/images/integrations/a_tfa_me_1/tfa_me_sensor_table.png' width=100% height=100% />
</p>



**Use the station's Home Assistant menu:**

You can also get direct access to the entire Home Assistant menu of the station and enter the **IP address** or the **mDNS name** of your station followed by path "/ha_menu"

- "IP/ha_menu"
- "tfa-me-XXX-XXX-XXX.local" where XXX-XXX-XXX is the 9 digit serial number.

**Use IP:** To get the IP address of your station press and hold the **"+"** key and wait until the IP is shown. 
**Example:** In your browser enter "192.168.1.42/ha_menu" 

**Use mDNS name:** You can find the serial number on a sticker at the backside of your station. 
**Example:** In your browser enter "tfa-me-017-654-321.local/ha_menu"

Change station settings to activate Home Assistant:

1. Go to menu **All settings**
2. Set check box **"HA on"** to **"yes"**. This activates the Home Assistant functionality of your station. 
3. Press button **"Submit"**.
4. Optional: Select the maximum number of sensors the **TFA.me station** should hold. When you have one station and N external sensors, set the size to (N+1). Enter this value in text field **"Resize HA table"** and press button **"Resize"**. The default value is set to 25, minimum is 2 & maximum is 75.

{% enddetails %}


{% details "3. Activate all your external sensors (insert batteries)" %}

**Note**: You can skip this step when your sensors are already available.
Otherwise please insert the batteries into all sensors you want to use.

{% enddetails %}


{% details "4. Add the TFA.me integration to your Home Assistant" %}

1. Open the web page of your Home Assistant and go no menu: **Settings** > **Devices & services**.
2. Click on the "+" sign to and search for "**tfa**"
3. Click on "**TFA**" then "**TFA.me station**" to add the integration.

Please follow the configuration flow and make some basic setting.

1. Mandatory: Enter the IP address of your device or the 9 digit serial number **"XXX-XXX-XXX"**. To get the IP address of your station press and hold the **"+"** key and wait until the IP is shown. The serial number is placed at the backside of your station.
2. Optional: Change the interval time the integration should request data (default {% term polling %} time are 60 seconds)
3. Optional: Checkbox  **"Multiple entities"**, when you only use one station leave this unchecked. Otherwise look at section **Entities** for more informations. 
4. Mandatory: Press button **"OK"**. 

The integration now requests sensor list & sensor measurement data once at start. When successful you will see a list with all sensors added. The integrationn also generates all entities (section **"Entities"**). 


After completing the configuration flow, the **TFA.me** integration will be available.

**Recommendations**
 
- The stations use DHCP by default to obtain their IP address. However, this IP address can change during operation. If this happens, Home Assistant can no longer reach the station. We therefore recommend using the serial number. The **TFA.me integration** then addresses the station using the mDNS name **tfa-me-XXX-XXX-XXX.local**.
 
- Most sensors and all station transmit new values every 5 minutes. Professional sensors do this every minute. Therefore, it makes little sense to set the query interval ​​more frequently than every 1 or 5 minutes.

- You can add the integration even when your TFA.me station if offline. Home Assistant tries cyclic to reach the station again.

{% enddetails %}


**Optional:**

{% details "5. Change the configuration or perform an action" %}

{% include integrations/option_flow.md %}

The following options or actions can be set or triggered:

- **Change request interval**: Change the interval the integration requests the measurement data from station.
- **Discover new sensors**: Reload the sensor list & measurement values and add all missing entities.
- **Reset all rain sensors**: Set all `rain_rel` to 0. (also see chapter **Entities**)
- **Reload sensor data**: Reload all sensor measurement values.

{% enddetails %}



{% details "6. Set your forecast area and time zone" %}

**Note**: You can skip this step when your weather forecast location is already set.
Otherwise please follow the instructions from the datasheets above. Basically it works like this:

1. Open a browser and enter [go.tfa.me](https://go.tfa.me) to enter the **TFA.me portal**
2. Click on **"Set Location"**
3. Enter your device ID ("XXX-XXX-XXX") and press button **"Search"**
4. Press the **Wifi button** at your station (placed in battery case)
5. Select your location on the map or enter the your address
6. Press button **"Location from address"** or **"Location from browser"**
7. Press button **"Save"**
8. Press the **Wifi button** at your station again to confirm the location settings

The station in now configured and should see the correct local time & date at the display of your station.

{% enddetails %}


... and now do all the amazing stuff Home Assistant offers!


For steps 1 and 6, please follow the instructions in the station manuals (PDF), which you can find here:
- Station ID 01: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32490-b4d9233472652.pdf) or [manual](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32424-7339452064962.pdf)
- Station ID 02: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32488-a599999684365.pdf) or [manual](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32416-0f0f952028916.pdf)
- Station ID 03: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32486-da31350748054.pdf) or [manual](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32420-99cd613999497.pdf)
- Station ID 04: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32492-a085903128848.pdf) or [manual](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/32432-3e4d128334262.pdf)
- Station ID 05: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/34198-944a947928662.pdf) or manual (coming soon)
- Station ID 06: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/34202-71a5856072875.pdf) or manual (coming soon)
- Station ID 07: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/34200-288c483905760.pdf) or manual (coming soon)
- Station ID 08: [Quick start](https://com-tradebyte-core-tbone-media-live.s3.eu-central-1.amazonaws.com/media/1768/34196-acf3991570949.pdf) or manual (coming soon)




## Supported functionality

### Single entities

Typically, you have one station and multiple sensors. In this case, we recommend using the **Single entities** option. This creates exactly one {% term entity %} for each sensor measurement.

The naming scheme is as follows:

- `sensor.<Sensor-ID>_<Measurement value>`

**Example**: T/H-Sensor "A01-234-456" receiced via station/gateway "017-654-321":

- `sensor.A01234567_temperature` 
- `sensor.A01234567_humidity` 
- `sensor.A01234567_rssi` 
- `sensor.A01234567_lowbatt` 
- `sensor.A01234567_lowbatt_txt` 


### Multiple entities

If you have multiple stations, it's likely that sensors are received by more than one station. In this case, you can decide whether measurement values ​​are stored twice and whether two different entities are **Multiple entities**.

The naming scheme is as follows:

`sensor.<Gateway-ID>_<Sensor-ID>_<Measurement value>`

**Example**: T/H-Sensor A01-234-456 receiced via gateway 017-654-321:

- `sensor.017654321_A01234567_temperature`
- `sensor.017654321_A01234567_humidity`
- `sensor.017654321_A01234567_rssi` 
- `sensor.017654321_A01234567_lowbatt` 
- `sensor.017654321_A01234567_lowbatt_txt` 

**Example**: T/H-Sensor A01-234-456 receiced via gateway 031-654-321:

- `sensor.031654321_A01234567_temperature`
- `sensor.031654321_A01234567_humidity`
- `sensor.031654321_A01234567_rssi` 
- `sensor.031654321_A01234567_lowbatt` 
- `sensor.031654321_A01234567_lowbatt_txt` 


When **Single entities** is chosen and a sensor is received from more the one station/gateway, Home Assistant will remove one of then, because they have the same entity name.


{% details "Overview of all station & sensor entities" %}

All entity name starts with: `sensor.xxxxxxxxx_yyyyyyyyy_` followed by the measurement

- ID 01: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 02: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 03: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 04: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 05: `temperature`, `humidity`, `barometric_pressure`, `rssi`, `lowbatt`


- ID A0: `temperature`, `humidity`, `rssi`, `low_batt`, `lowbatt_txt` 
- ID A1: `rain`, `rain_rel`, `rain_1_hour`, `rain_24_hours`, `rssi`, `lowbatt`, `lowbatt_txt` 
- ID A2: `wind_direction`, `wind_speed`, `wind_gust`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID A3: `temperature`, `temperature_probe`, `rssi`, `lowbatt`, `lowbatt_txt` 
- ID A4: `temperature`, `humidity`, `temperature_probe`, `rssi`, `lowbatt`, `lowbatt_txt` 
- ID A5: `temperature`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID A6: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`

(*) yyyyyyyyy only used if **Multiple entities** is chosen. 

{% enddetails %}


{% details "Overview of all station & sensor entities uints" %}

All units are metric.

| Measurements | Unit | Comments |
|---------------|------|----------|
|`temperature`, `temperature_probe`|**°C**|Temperature|
|`humidity`|**%**|Relative humidity|
|`barometric_pressure`|**hPa**|Barometric pressure|
|`rain`|**mm**| Rain fall, absolute value|
|`rain_rel`, `rain_1_hour`, `rain_24_hours`|**mm**| Rain fall, relative value|
|`rssi`|**1/256**| Theoretical range: 0(bad) ... 255(very good)<br>Practical range: 80(bad) ... 230(very good)|
|`lowbatt`|**-**| 0: battery good, 1: battery bad|
|`lowbatt_txt`|**-**| No: battery good, Yes: battery bad|
|`wind_speed`, `wind_gust `|**m/s**|Speed is the average speed of last measurement period, gust is the maximum.|
|`wind_direction`|**-**|Value range: 0...15 for the 16 main directions:<BR> 0="N", 1="NNE", 2="NE", 3="ENE", 4="E", 5="ESE", 6="SE", 7="SSE", 8="S", 9="SSW",10="SW", 11="WSW", 12="W", 13="WNW", 14="NW", 15="NNW"|
|`wind_direction_deg`|**degress**|Value range: 0...337.5 for the 16 main directions (step 22.5):<BR> 0.0="N", 22.5="NNE", 45.0="NE", ... 337.5="NNW"|
|`wind_direction_txt`|**-**|Text values for the 16 main directions:<BR> "N", "NNE", "NE", "ENE", "E","ESE", "SE", "SSE","S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"|

{% enddetails %}



{% details "More informations to entities" %}

- `rain_rel`, `rain_1_hour` and `rain_24_hours` are generated entities and does not come from the rain sensor itself. 
- `rain_rel` is the rain value since the integration was started or since last reset of this value. This value can be reset by option **"Reset all rain sensors**" 
- `rain_1_hour` is the rain value of the last hour. For that integration holds the history of rainfall values ​​from the last hour.
- `rain_24_hours` is the rain value of the last 24 hours. For that integration holds the history of rainfall values ​​from the last 24 hours.
- `rssi` values for stations are set to 255. They are internal values and not received via 868 MHz.
- Sensors not received longer then (2 * transmisson interval time + 1 minute) are marked as **unavailable**. A sensor that sends every 5 minutes is marked after (2 * 5 + 1) = 11 minutes.
- Dynamically Icons: Icons for measurement values (entities) are some time depending on the measuerement value itself.


{% details "List with icons for entities" %}


| Entity              | Value | Icon |Value/Range|
|---------------------|-------|------|-----|
| temperature | default | {% icon "mdi:thermometer" %} | |
| temperature | high    | {% icon "mdi:thermometer-high" %} | > 25|
| temperature | low     | {% icon "mdi:thermometer-low" %}  |  < 0|
| humidity    | default| {% icon "mdi:water-percent" %}       | 31...64 |
| humidity    | alert  | {% icon "mdi:water-percent-alert" %} | 0...30 or 65...99 |
| co2         | default  | {% icon "mdi:molecule-co2" %} |  |
| barometric_pressure | default  | {% icon "mdi:gauge" %} | |
| rssi | default  | {% icon "mdi:wifi" %} | |
| rssi | weak     | {% icon "mdi:wifi-strength-1" %} | 0...99 |
| rssi | middle   | {% icon "mdi:wifi-strength-2" %} | 100...149 |
| rssi | good     | {% icon "mdi:wifi-strength-3" %} | 150..219 |
| rssi | strong   | {% icon "mdi:wifi-strength-4" %} | 220...255 |
| lowbatt | full  | {% icon "mdi:battery" %} | 1 |
| lowbatt | low   | {% icon "mdi:battery-alert" %} | 0 |
| wind_direction | default   | {% icon "mdi:compass-outline" %} | |
| wind_direction | N, NNE | {% icon "mdi:arrow-down" %}     | 0, 1 |
| wind_direction | NE, ENE| {% icon "mdi:arrow-bottom-left" %}     | 2, 3 |
| wind_direction | E, ESE | {% icon "mdi:arrow-left" %}         | 4, 5 |
| wind_direction | SE, SSE| {% icon "mdi:arrow-top-left" %}  | 6, 7 |
| wind_direction | S, SSW | {% icon "mdi:arrow-up" %}          | 8, 9 |
| wind_direction | SW, SSW| {% icon "mdi:arrow-top-right" %}   | 10, 11 |
| wind_direction | W, WNW | {% icon "mdi:arrow-right" %}          | 12, 13 |
| wind_direction | NW, NNW| {% icon "mdi:arrow-bottom-right" %}      | 14, 15 |
| wind_speed     | default   | {% icon "mdi:weather-windy-variant" %} | | 
| wind_gust      | default   | {% icon "mdi:weather-windy" %} | |
| rain | none     | {% icon "mdi:weather-sunny" %} | (< 0.1 mm)/hour|
| rain | light    | {% icon "mdi:weather-partly-rainy" %} | (0.1 mm ... < 0.5 mm)/hour|
| rain | moderate | {% icon "mdi:weather-rainy" %} | (0.5 mm ... < 4.0 mm)/hour|
| rain | heavy    | {% icon "mdi:weather-pouring" %} | (> 4.0 mm)/hour|


{% enddetails %}
{% enddetails %}


## Troubleshooting

If you have any problems with please join the [Home Assistant Help](https://www.home-assistant.io/help/) pages.


## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}

Optional: If you no longer use the Home Assistant functionality in your station, you can also deactivate it again.



