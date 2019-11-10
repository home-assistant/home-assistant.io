---
title: "Report the temperature with ESP8266 to MQTT"
description: "Step by step tutorial to use ESP8266 and a HDC1008 to ."
date: 2015-10-11 12:10:00 -0700
date_formatted: "October 11, 2015"
author: Paulus Schoutsen
author_twitter: balloob
categories: How-To MQTT ESP8266
og_image: /images/blog/2015-10-esp8266-temp/ha-sensor.png
---

{::options coderay_line_numbers="table" /}

I recently learned about the ESP8266, a $5 chip that includes WiFi and is Arduino compatible. This means that all your DIY projects can now be done for a fraction of the price.

For this tutorial, I'll walk through how to get going with ESP8266, get the temperature and humidity and report it to MQTT where Home Assistant can pick it up.

<p class='img'>
<img src='/images/blog/2015-10-esp8266-temp/setup.png' />
Picture of the final setup (+ 2 LED for decoration)
</p>

<p class='img'>
<img src='/images/blog/2015-10-esp8266-temp/ha-sensor.png' />
Home Assistant will keep track of historical values and allow you to integrate it into automation.
</p>

<!--more-->

### Components

I've been using Adafruit for my shopping:

 - [Adafruit HUZZAH ESP8266 Breakout](http://www.adafruit.com/product/2471) ([assembly instructions](https://learn.adafruit.com/adafruit-huzzah-esp8266-breakout/assembly))
 - [Adafruit HDC1008 Temperature & Humidity Sensor Breakout Board](http://www.adafruit.com/product/2635) ([assembly instructions](https://learn.adafruit.com/adafruit-hdc1008-temperature-and-humidity-sensor-breakout/assembly))
 - [MQTT server](/integrations/mqtt/#picking-a-broker)

_Besides this, you will need the usual hardware prototype equipment: a breadboard, some wires, soldering iron + wire, Serial USB cable._

### Alternatives

Since this article has been published the HDC1008 has been discontinued. Updated sketches are available for the following alternatives:

 - [DHT22 sensor](https://www.adafruit.com/product/385) and [updated sketch](https://gist.github.com/balloob/1176b6d87c2816bd07919ce6e29a19e9).
 - [BME280 sensor](https://www.adafruit.com/product/2652) and [updated sketch](https://gist.github.com/mtl010957/9ee85fb404f65e15c440b08c659c0419).

### Connections

On your breadboard, make the following connections from your ESP8266 to the HDC1008:

| ESP8266 | HDC1008 |
| ------- | ------- |
| GND | GND
| 3V | Vin
| 14 | SCL
| #2 | SDA

_I picked `#2` and `14` myself, you can configure them in the sketch._

### Preparing your IDE

Follow [these instructions](https://github.com/esp8266/Arduino#installing-with-boards-manager) on how to install and prepare the Arduino IDE for ESP8266 development.

After you're done installing, open the Arduino IDE, in the menu click on `sketch` -> `include library` -> `manage libraries` and install the following libraries:

- PubSubClient by Nick 'O Leary
- Adafruit HDC1000

### Sketch

If you have followed the previous steps, you're all set.

 - Open Arduino IDE and create a new sketch (`File` -> `New`)
 - Copy and paste the below sketch to the Arduino IDE
 - Adjust the values line 6 - 14 to match your setup
 - Optional: If you want to connect to an MQTT server without a username or password, adjust line 62.
 - To have the ESP8266 accept our new sketch, we have to put it in upload mode. On the ESP8266 device keep the GPIO0 button pressed while pressing the reset button. The red led will glow half bright to indicate it is in upload mode.
 - Press the upload button in Arduino IDE
 - Open the serial monitor (`Tools` -> `Serial Monitor`) to see the output from your device

This sketch will connect to your WiFi network and MQTT broker. It will read the temperature and humidity from the sensor every second. It will report it to the MQTT server if the difference is > 1 since last reported value. Reports to the MQTT broker are sent with retain set to `True`. This means that anyone connecting to the MQTT topic will automatically be notified of the last reported value.

```cpp
#include <ESP8266WiFi.h>
#include <Wire.h>
#include <PubSubClient.h>
#include <Adafruit_HDC1000.h>

#define wifi_ssid "YOUR WIFI SSID"
#define wifi_password "WIFI PASSWORD"

#define mqtt_server "YOUR_MQTT_SERVER_HOST"
#define mqtt_user "your_username"
#define mqtt_password "your_password"

#define humidity_topic "sensor/humidity"
#define temperature_topic "sensor/temperature"

WiFiClient espClient;
PubSubClient client(espClient);
Adafruit_HDC1000 hdc = Adafruit_HDC1000();

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);

  // Set SDA and SDL ports
  Wire.begin(2, 14);

  // Start sensor
  if (!hdc.begin()) {
    Serial.println("Couldn't find sensor!");
    while (1);
  }
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(wifi_ssid);

  WiFi.begin(wifi_ssid, wifi_password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    // If you do not want to use a username and password, change next line to
    // if (client.connect("ESP8266Client")) {
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

bool checkBound(float newValue, float prevValue, float maxDiff) {
  return !isnan(newValue) &&
         (newValue < prevValue - maxDiff || newValue > prevValue + maxDiff);
}

long lastMsg = 0;
float temp = 0.0;
float hum = 0.0;
float diff = 1.0;

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 1000) {
    lastMsg = now;

    float newTemp = hdc.readTemperature();
    float newHum = hdc.readHumidity();

    if (checkBound(newTemp, temp, diff)) {
      temp = newTemp;
      Serial.print("New temperature:");
      Serial.println(String(temp).c_str());
      client.publish(temperature_topic, String(temp).c_str(), true);
    }

    if (checkBound(newHum, hum, diff)) {
      hum = newHum;
      Serial.print("New humidity:");
      Serial.println(String(hum).c_str());
      client.publish(humidity_topic, String(hum).c_str(), true);
    }
  }
}
```

### Configuring Home Assistant

The last step is to integrate the sensor values into Home Assistant. This can be done by setting up Home Assistant to connect to the MQTT broker and subscribe to the sensor topics.

```yaml
mqtt:
  broker: YOUR_MQTT_SERVER_HOST
  username: your_username
  password: your_password

sensor:
  platform: mqtt
  name: "Temperature"
  state_topic: "sensor/temperature"
  qos: 0
  unit_of_measurement: "ºC"

sensor 2:
  platform: mqtt
  name: "Humidity"
  state_topic: "sensor/humidity"
  qos: 0
  unit_of_measurement: "%"
```
