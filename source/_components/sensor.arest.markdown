---
layout: page
title: "aREST sensor support"
description: "Instructions how to integrate aREST sensors within Home Assistant."
date: 2015-09-07 18:15
sidebar: false
comments: false
sharing: true
footer: true
logo: arest.png
ha_category: Sensor
---

<img src='/images/supported_brands/arest.png' class='brand pull-right' />
The arest sensor platform allows you to get all data from your devices (like Arduinos with a ethernet/wifi connection, the ESP8266, and the Raspberry Pi) running the [aREST](http://arest.io/) RESTful framework.

To use your aREST enabled device in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: arest
  resource: http://IP_ADDRESS
  name: Office
  monitored_variables:
    - name: temperature
      unit_of_measurement: '°C'
    - name: humidity
      unit_of_measurement: '%'
    pins:
      A0:
        name: Pin 0 analog
        unit_of_measurement: "ca"
        correction_factor: 0.01
        decimal_places: 1
      3:
        name: Pin 3 digital
```

Configuration variables:

- **resource** (*Required*): IP address and schema of the device that is exposing an aREST API, e.g. http://192.168.1.10.
- **name** (*Optional*): Let you overwrite the the name of the device. By default *name* from the device is used.
- **monitored_variables** array (*Optional*): List of exposed variables.
  - **name** (*Required*): The name of the variable you wish to monitor.
  - **unit** (*Optional*): Defines the units of measurement of the sensor, if any.
- **pins** array (*Optional*): List of pins to monitor. Analog pins need a leading **A** for the pin number.
  - **name** (*Optional*): The name of the variable you wish to monitor.
  - **unit_of_measurement** (*Optional*): Defines the unit of measurement of the sensor, if any.
  - **correction_factor** (*Optional*): A float value to do some basic calculations.
  - **decimal_places** (*Optional*): Number of decimal places of the value. Default is 0.

The variables in the `monitored_variables` array must be available in the response of the device. As a starting point you find below a sketch for the Arduino device family. There are two variables (`temperature` and `humidity`) which will act as endpoints. 

```c
/*
  This modified sketch is based on the Ethernet example of the aREST 
  (http://arest.io/) library.
*/

// Libraries
#include <SPI.h>
#include <Ethernet.h>
#include <aREST.h>
#include <avr/wdt.h>

// Device settings
char* deviceId = "sensor02";
char* deviceName = "livingroom";
byte deviceMac[] = { 0x20, 0xD5, 0xD3, 0x03, 0xFE, 0x31 };
IPAddress deviceIp(192, 168, 1, 12);

EthernetServer server(80);
aREST rest = aREST();

// Variables to be exposed to the API
int temperature;
int humidity;

void setup(void) {
  Serial.begin(57600);

  // Init variables and expose them to REST API
  temperature = 0;
  humidity = 0;
  
  rest.variable("temperature", &temperature);
  rest.variable("humidity", &humidity);

  // Give name and ID to device
  rest.set_id(deviceId);
  rest.set_name(deviceName);

  Ethernet.begin(deviceMac, deviceIp);
 
  server.begin();
  Serial.print("Sensor is ready...");

  // Start watchdog
  wdt_enable(WDTO_4S);
}

void loop() {
  EthernetClient client = server.available();
  rest.handle(client);
  wdt_reset();

  // Replace this with your actual sensor readings, like
  // temperature = (((analogRead(A0) * 5.0) / 1024) - 0.5) * 10;
  temperature = random(400);
  humidity = random(600);
  delay(500);
}

```
Accessing one of the endpoints (eg. http://192.168.1.10/temperature) will give you the value inside a JSON response.

```json
{"temperature": 23, "id": "sensor01", "name": "livingroom", "connected": true}
```

The root will give you a JSON response that contains all variables and their current values along with some device details.

```json
{
   "variables" : {
      "temperature" : 23,
      "humidity" : 82
   },
   "id" : "sensor01",
   "name" : "livingroom",
   "connected" : true
}
```

