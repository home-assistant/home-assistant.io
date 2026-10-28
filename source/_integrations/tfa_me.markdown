---
title: TFA.me
description: Instructions on how to integrate the TFA.me integration into Home Assistant.
ha_release: "2025.XX"
ha_iot_class: Local Poll
ha_codeowners:
  - '@DrMatthiasBlaschke'
ha_domain: tfa_me
ha_integration_type: hub
ha_category:
  - Sensor
ha_platforms:
  - sensor
works_with:
  - local
---


The **TFA.me {% term integration %}** is used to integrate the **TFA.me** devices (Wi-Fi weather stations & measuring sensors) of [TFA Dostmann](https://www.tfa-dostmann.de/en/). The **TFA.me system** offers multi-day weather forecasts and precise monitoring of local measurements in combination with a powerful online platform.


## How it works

Each **TFA.me station** measures temperature and humidity internally, and depending on the model, other measurement data as well. Each station also has a 868 MHz radio receiver that can receive external {% term sensors %} such as temperature, humidity, wind and rain sensors. 

The internal and external measurement values ​​are partially displayed on the station's display and also transferred to the [**TFA.me cloud**](https://go.tfa.me). When measured values ​​are received station will add the current time stamp (UTC) and the 868 MHz RSSI (Radio Signal Strength Indicator) value to the data set. 

In addition, each **TFA.me station** also has the ability to hold the most recent measurement data in a table and make it available to Home Assistant via an integrated web server. Therefore, Home Assistant can query measurement data directly and locally from your station via the LAN (Wi-Fi).


{% include integrations/config_flow.md %}


## Supported TFA.me devices

Currently (winter 2025), the following [TFA.me stations and sensors ](https://www.tfa-dostmann.de/en/produkte/wetterstationen/wetterstationen-wlan/tfa-me/) are supported. This product range is continuously being expanded. 

{% details "Stations and sensors list ..." %}


[TFA.me](https://www.tfa-dostmann.de/en/produkte/wetterstationen/wetterstationen-wlan/tfa-me/) Station overview 

All stations cyclically deliver the following internal measured values ​​every 5 minutes: 

- [ID 01](https://www.tfa-dostmann.de/en/produkt/wlan-gateway-tfa-me-id-01-35-8103) (Temperature, Humidity) 
- [ID 02](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-02-35-8100) (Temperature, Humidity) 
- [ID 03](https://www.tfa-dostmann.de/en/produkt/wlan-funk-wetterstation-tfa-me-id-03-35-8101/) (Temperature, Humidity) 
- [ID 04](https://www.tfa-dostmann.de/en/produkt/wlan-funk-wetterstation-tfa-me-id-04-35-8102/) (Temperature, Humidity) 
- [ID 05](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-05-35-8106/) (Temperature, Humidity, Barometric pressure)
- [ID 06](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-06-35-8108/) (Temperature, Humidity) 
- [ID 07](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-07-35-8107/) (Temperature, Humidity) 
- [ID 08](https://www.tfa-dostmann.de/en/product/wifi-wireless-weather-station-tfa-me-id-08-35-8105/) (Temperature, Humidity) 


[TFA.me](https://www.tfa-dostmann.de/en/produkte/wetterstationen/wetterstationen-wlan/tfa-me/) Sensor overview

All 868 MHz sensors transmit cyclic the following measurement values in a data set: 


- [ID A0](https://www.tfa-dostmann.de/en/product/temperature-humidity-transmitter-id-a0-30-3900/) (Temperature, Humidity (TX=5))
- [ID A1](https://www.tfa-dostmann.de/en/product/rain-transmitter-tfa-me-id-a1-30-3903/) (Rain, (TX=120))
- [ID A2](https://www.tfa-dostmann.de/en/product/wind-meter-tfa-me-id-a2-30-3904/) (Wind direction, Wind speed, Wind gust (TX=5)
- [ID A3](https://www.tfa-dostmann.de/en/product/2-fold-temperature-transmitter-with-waterproof-cable-sensor-id-a3-30-3902/) (Temperature, Temperature probe (TX=5)
- [ID A4](https://www.tfa-dostmann.de/en/product/professional-temperature-humidity-transmitter-with-waterproof-cable-sensor-id-a4-30-3905/) (Temperature, Humidity, Temperature probe (TX=1))
- [ID A5](https://www.tfa-dostmann.de/en/product/temperature-transmitter-id-a5-30-3901/) (Temperature (TX=5)
- [ID A5](https://www.tfa-dostmann.de/en/product/pool-transmitter-tfa-me-id-a5-pool-30-3907/) (Temperature (Pool) (TX=5)
- [ID A6](https://www.tfa-dostmann.de/en/product/professional-temperature-humidity-transmitter-id-a6-30-3906/) (Temperature, Humidity (TX=1)


(**TX**: Transmission interval in minutes)

All sensors additional deliver a low battery value.

{% enddetails %}

{% tip %}
{% endtip %}


## Station: Basic configuration steps

**Quick start:**

{% details "1. Connect your station to your Wi-Fi" %}

**Note**: You can skip this step when your station is already connected to your Wi-Fi.
Otherwise please follow the instructions from the datasheets above. Basically it works like this:

1. Insert power supply cable and batteries.
2. Press **Wi-Fi button** for 5 seconds until you hear a **beep**. (The Wi-Fi button is placed in battery case.)
3. Go to the Wi-Fi settings of your device (Smartphone, tablet, PC) and look for a network named **TFA-ME-ID-XXX-XXX-XXX**. XXX-XXX-XXX is the 9-digit serial number of your station.
4. Connect your device to the Wi-Fi network **TFA-ME-ID-XXX-XXX-XXX**.
5. Open a browser and enter **192.168.8.1** or **me.local**.
6. Select your Wi-Fi network from the list, enter your password and press **Submit**.
7. Wait a few seconds until your station is connected to your Wi-Fi network.

{% enddetails %}


{% details "2. Activate Home Assistant funtionality of your station" %} 

**Use the station's network settings**:

The Home Assistant functionality in TFA.me stations is deactivated by default.
To get access to the internal web pages for settings & configurations open a web browser and enter the **IP address** or the **mDNS name** of your station.

**Use IP:** To get the IP address of your station press and hold the **+** key and wait until the IP is shown. 
**Example:** In your browser enter **192.168.1.35**. 

**Use mDNS name:** You can find the serial number on a sticker at the backside of your station. 
**Example:** In your browser enter **tfa-me-05B-3E4-E44.local**.


Change station settings to activate Home Assistant:

1. On the main website, click on the link **Network settings**.
2. Set **Local API** to **Yes** and press **Submit**, this activates the Home Assistant functionality of the station.

**Network settings:**
<p class='img'>
  <img src='/images/integrations/tfa_me/tfa_me_local_api_activation.png' width=50% height=50% />
</p>

3. Optional: Use link **HA menu** to enter main menu <br>
   (**IP/ha_menu** or **tfa-me-XXX-XXX-XXX.local**)

Your station is now prepared for Home Assistant. It generates a table with all station & sensor measurement values. The list may be emtpy at start because the sensor values were not received. Just wait some minutes until you see all sensors. Normally this only takes 5 minutes which is the typically sensor & station transmission interval. 

The list of sensor measured values ​​can also be found under the menu item **Sensors table**:

<p class='img'>
  <img src='/images/integrations/tfa_me/tfa_me_sensor_table.png' width=100% height=100% />
</p>



**Use the station's Home Assistant menu:**

You can also get direct access to the entire Home Assistant menu of the station and enter the **IP address** or the **mDNS name** of your station followed by path **/ha_menu**.

- **IP/ha_menu**
- **tfa-me-XXX-XXX-XXX.local** where XXX-XXX-XXX is the 9 digit serial number.

**Use IP:** To get the IP address of your station press and hold the **+** key and wait until the IP is shown. 
**Example:** In your browser enter **192.168.1.42/ha_menu**. 

**Use mDNS name:** You can find the serial number on a sticker at the backside of your station. 
**Example:** In your browser enter **tfa-me-017-654-321.local/ha_menu**.

Change station settings to activate Home Assistant:

1. Go to menu **All settings**.
2. Set check box **HA on** to **yes**. This activates the Home Assistant functionality of your station. 
3. Press button **Submit**.
4. Optional: Select the maximum number of sensors the **TFA.me station** should hold. When you have one station and N external sensors, set the size to (N+1). Enter this value in text field **Resize HA table** and press button **Resize**. The default value is set to 25, minimum is 2 & maximum is 75.

{% enddetails %}


{% details "3. Activate all your external sensors (insert batteries)" %}

**Note**: You can skip this step when your sensors are already available.
Otherwise please insert the batteries into all sensors you want to use.

{% enddetails %}


{% details "4. Add the TFA.me integration to your Home Assistant" %}

1. Open the web page of your Home Assistant and go no menu: **Settings** > **Devices & services**.
2. Click on the **+** sign to and search for **tfa**.
3. Click on **TFA** then **TFA.me station** to add the integration.

Please follow the configuration flow and make some basic setting.

1. Mandatory: Enter the IP address of your device or the 9 digit serial number **XXX-XXX-XXX**. To get the IP address of your station press and hold the **+** key and wait until the IP is shown. The serial number is placed at the backside of your station.
2. Optional: Checkbox  **Add station ID to device name**, when you only use one station leave this unchecked. If there is more than one station, sensors will likely received from multiple stations. To better distinguish between them, the station ID is also displayed after the sensor ID/name when the checkbox is selected.
3. Mandatory: Press button **OK**. 

The integration now requests sensor list & sensor measurement data once at start. When successful you will see a list with all sensors added. The integrationn also generates all entities (section **Entities**) and updates them every minute.. 

After completing the configuration flow, the **TFA.me** integration will be available.


**Recommendations**
 
- The stations use DHCP by default to obtain their IP address. However, this IP address can change during operation. If this happens, Home Assistant can no longer reach the station. We therefore recommend using the serial number. The **TFA.me integration** then addresses the station using the mDNS name **tfa-me-XXX-XXX-XXX.local**.
 
- If there are problems with DHCP or mDNS, we recommend operating the station with a static/fixed IP address.


{% enddetails %}


**Optional:**

{% details "5. Change the configuration or perform an action" %}

{% include integrations/option_flow.md %}

The following options or actions can be set or triggered:

- **Reset all rain sensors**: Set all **rain last hour** and **rain last 24 hours** to 0. (also see chapter **Entities**)

{% enddetails %}



{% details "6. Set your forecast area and time zone" %}

**Note**: You can skip this step when your weather forecast location is already set.
Otherwise please follow the instructions from the datasheets above. Basically it works like this:

1. Open a browser and enter [go.tfa.me](https://go.tfa.me) to enter the **TFA.me portal**.
2. Click on **Set Location**.
3. Enter your device ID (**XXX-XXX-XXX**) and press button **Search**.
4. Press the **Wi-Fi button** at your station (placed in battery case).
5. Select your location on the map or enter the your address.
6. Press button **Location from address** or **Location from browser**.
7. Press button **Save**.
8. Press the **Wi-Fi button** at your station again to confirm the location settings.

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

### Entities

Typically, you have one station and multiple sensors. If you have multiple stations, it's likely that sensors are received by more than one station.
To distinguish which station received a sensor signal, the following naming scheme for entities is always used:


`sensor.<Gateway-ID>_<Sensor-ID>_<Measurement value>`

**Example**: T/H-Sensor with ID A01-234-456 receiced via station with ID 017-654-321:

- `sensor.017654321_A01234567_temperature`
- `sensor.017654321_A01234567_humidity`
- `sensor.017654321_A01234567_rssi` 
- `sensor.017654321_A01234567_lowbatt` 

**Example**: T/H-Sensor with ID A01-234-456 receiced via station with ID 031-654-321:

- `sensor.031654321_A01234567_temperature`
- `sensor.031654321_A01234567_humidity`
- `sensor.031654321_A01234567_rssi` 
- `sensor.031654321_A01234567_lowbatt` 


{% details "Overview of all station & sensor entities" %}

All entity name starts with: `sensor.xxxxxxxxx_yyyyyyyyy_` followed by the measurement

- ID 01: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 02: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 03: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 04: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 05: `temperature`, `humidity`, `barometric_pressure`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 06: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 07: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID 08: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`

- ID A0: `temperature`, `humidity`, `rssi`, `low_batt`, `lowbatt_txt` 
- ID A1: `rain`, `rain_rel`, `rain_1_hour`, `rain_24_hours`, `rssi`, `lowbatt`, `lowbatt_txt` 
- ID A2: `wind_direction`, `wind_speed`, `wind_gust`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID A3: `temperature`, `temperature_probe`, `rssi`, `lowbatt`, `lowbatt_txt` 
- ID A4: `temperature`, `humidity`, `temperature_probe`, `rssi`, `lowbatt`, `lowbatt_txt` 
- ID A5: `temperature`, `rssi`, `lowbatt`, `lowbatt_txt`
- ID A6: `temperature`, `humidity`, `rssi`, `lowbatt`, `lowbatt_txt`

{% enddetails %}


{% details "Overview of all station & sensor entities uints" %}

All units are metric.

- `temperature`, `temperature_probe` in **°C**: Temperature
- `humidity`in **%**: Relative humidity
- `barometric_pressure` in **hPa**: Barometric pressure
- `rain`in **mm**: Rain fall (absolute value)
- `rain_rel`, `rain_1_hour`, `rain_24_hours` in **mm**: Rain fall (relative value)
- `rssi` in **1/256**: Signal strength<br>Theoretical range: 0 (bad) ... 255 (very good)<br>Practical range: 80 (bad) ... 230 (very good)|
- `lowbatt`, 0: battery good, 1: battery bad, 2: battery critical bad, 3: batteries not inserted/removed
- `lowbatt_txt`,  Good: battery good, Bad: battery bad, Critical: battery very bad, Removed: batteries not inserted/removed
- `wind_speed`, `wind_gust` in **m/s**: Speed is the average speed of last measurement period, gust is the maximum.
- `wind_direction`, Value range: 0...15 for the 16 main directions:<BR> 0=**N**, 1=**NNE**, 2=**NE**, 3=**ENE**, 4=**E**, 5=**ESE**, 6=**SE**, 7=**SSE**, 8=**S**, 9=**SSW**, 10=**SW**, 11=**WSW**, 12=**W**, 13=**WNW**, 14=**NW**, 15=**NNW**
- `wind_direction_deg` in **degress**: Value range: 0...337.5 for the 16 main directions (step 22.5):<BR> 0.0=**N**, 22.5=**NNE**, 45.0=**NE**, ... 337.5=**NNW**
- `wind_direction_txt`, Text values for the 16 main directions:<BR> **N**, **NNE**, **NE**, **ENE**, **E**, **ESE**, **SE**, **SSE**, **S**, **SSW**, **SW**, **WSW**, **W**, **WNW**, **NW**, **NNW**


{% enddetails %}



{% details "More informations to entities" %}

- `rain_rel`, `rain_1_hour` and `rain_24_hours` are generated entities and does not come from the rain sensor itself. 
- `rain_rel` is the rain value since the integration was started or since last reset of this value. This value can be reset by option **Reset all rain sensors**. 
- `rain_1_hour` is the rain value of the last hour. For that integration holds the history of rainfall values ​​from the last hour.
- `rain_24_hours` is the rain value of the last 24 hours. For that integration holds the history of rainfall values ​​from the last 24 hours.
- `rssi` values for stations are set to 255. They are internal values and not received via 868 MHz.
- Sensors not received longer then (2 * transmisson interval time + 0.5 minute) are marked as **unavailable**. A sensor that sends every 5 minutes is marked after (2 * 5 + 0.5) = 10.5 minutes.
- Dynamically Icons: Icons for measurement values (entities) are some time depending on the measuerement value itself.


{% details "List with icons for entities" %}

Depending on the measured value (value/range):

- `temperature` 
  - {% icon "mdi:thermometer" %} default 
  - {% icon "mdi:thermometer-high" %} high (> 25)
  - {% icon "mdi:thermometer-low" %} low (< 0)
- `humidity`
  - {% icon "mdi:water-percent" %} default (31...64)
  - {% icon "mdi:water-percent-alert" %} alert (0...30 or 65...99)
- `co2`
  - {% icon "mdi:molecule-co2" %} default
- `barometric_pressure`
  - {% icon "mdi:gauge" %} default
- `rssi`
  - {% icon "mdi:wifi" %} default
  - {% icon "mdi:wifi-strength-1" %} weak (0...99)
  - {% icon "mdi:wifi-strength-2" %} middle (100...149)
  - {% icon "mdi:wifi-strength-3" %} good  (150..219)
  - {% icon "mdi:wifi-strength-4" %} strong (220...255)
- `lowbatt` 
  - {% icon "mdi:battery" %} full  (0)
  - {% icon "mdi:battery-alert" %} low (1)
  - {% icon "mdi:battery-sync" %} critical (2)
  - {% icon "mdi:battery-off" %} removed (-1)
- `wind_direction` 
  - {% icon "mdi:compass-outline" %} default
  - {% icon "mdi:arrow-down" %} N, NNE  (0, 1)
  - {% icon "mdi:arrow-bottom-left" %} NE, ENE (2, 3)
  - {% icon "mdi:arrow-left" %} E, ESE (4, 5)
  - {% icon "mdi:arrow-top-left" %} SE, SSE (6, 7)
  - {% icon "mdi:arrow-up" %} S, SSW (8, 9)
  - {% icon "mdi:arrow-top-right" %}  SW, SSW (10, 11)
  - {% icon "mdi:arrow-right" %} W, WNW (12, 13)
  - {% icon "mdi:arrow-bottom-right" %} NW, NNW (14, 15)
- `wind_speed`
  - {% icon "mdi:weather-windy-variant" %} default 
- `wind_gust`
  - {% icon "mdi:weather-windy" %} default 
- `rain`
  - {% icon "mdi:weather-sunny" %} none (< 0.1 mm/hour)
  - {% icon "mdi:weather-partly-rainy" %} light (0.1 mm ... < 0.5 mm/hour)
  - {% icon "mdi:weather-rainy" %} moderate (0.5 mm/hour ... < 4.0 mm)/hour
  - {% icon "mdi:weather-pouring" %} heavy (>= 4.0 mm/hour)


{% enddetails %}
{% enddetails %}


## Troubleshooting

If you have any problems with please join the [Home Assistant Help](https://www.home-assistant.io/help/) pages.


## Removing the integration

This integration follows the standard integration removal process; no extra steps are required.

{% include integrations/remove_device_service.md %}

Optional: If you no longer use the Home Assistant functionality in your station, you can also deactivate it again.



