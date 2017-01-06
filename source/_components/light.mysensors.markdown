---
layout: page
title: "MySensors Light"
description: "Instructions how to integrate MySensors lights into Home Assistant."
date: 2016-10-01 15:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category: Light
ha_release: 0.13
ha_iot_class: "Local Push"
---

Integrates MySensors lights into Home Assistant. See the [main component] for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.4

S_TYPE   | V_TYPE
---------|--------------
S_DIMMER | V_DIMMER\*, V_LIGHT\*

##### MySensors version 1.5 and higher

S_TYPE      | V_TYPE
------------|-------------
S_DIMMER    | [V_DIMMER\* or V_PERCENTAGE\*], [V_LIGHT\* or V_STATUS\*]
S_RGB_LIGHT | V_RGB*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]

V_TYPES with a star (\*) denotes V_TYPES that should be sent with every update. I.e., for an S_DIMMER, send both a V_DIMMER/V_PERCENTAGE and a V_LIGHT/V_STATUS message.  For an S_RGB_LIGHT, send both a V_RGB and a V_LIGHT/V_STATUS message with a V_DIMMER/V_PERCENTAGE message being optional.  

For more information, visit the [serial api] of MySensors.

### {% linkable_title MySensors 1.x example sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/dimmer
 */

#include <MySensor.h>
#include <SPI.h>

#define SN "DimmableRGBLED"
#define SV "1.0"
#define CHILD_ID 1
#define LED_PIN 5

MySensor gw;

char rgb[7] = "ffffff"; // RGB value.
int currentLevel = 0;  // Current dimmer level.
MyMessage dimmerMsg(CHILD_ID, V_PERCENTAGE);
MyMessage lightMsg(CHILD_ID, V_STATUS);
MyMessage rgbMsg(CHILD_ID, V_RGB);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_RGB_LIGHT);
  // Send initial values.
  gw.send(lightMsg.set(currentLevel > 0 ? 1 : 0));
  gw.send(dimmerMsg.set(currentLevel));
  gw.send(rgbMsg.set(rgb));
}

void loop()
{
  gw.process();
}

void incomingMessage(const MyMessage &message) {
  if (message.type == V_RGB) {
    // Retrieve the RGB value from the incoming message.
    // RGB LED not implemented, just a dummy print.
    String hexstring = message.getString();
    hexstring.toCharArray(rgb, sizeof(rgb));
    Serial.print("Changing color to ");
    Serial.println(rgb);
    gw.send(rgbMsg.set(rgb));
  }

  if (message.type == V_STATUS || message.type == V_PERCENTAGE) {
    // Retrieve the light status or dimmer level from the incoming message.
    int requestedLevel = atoi(message.data);

    // Adjust incoming level if this is a V_LIGHT update [0 == off, 1 == on].
    requestedLevel *= (message.type == V_STATUS ? 100 : 1);

    // Clip incoming level to valid range of 0 to 100
    requestedLevel = requestedLevel > 100 ? 100 : requestedLevel;
    requestedLevel = requestedLevel < 0   ? 0   : requestedLevel;

    // Change level value of LED pin.
    analogWrite(LED_PIN, (int)(requestedLevel / 100. * 255));
    currentLevel = requestedLevel;

    // Update the gateway with the current V_STATUS and V_PERCENTAGE.
    gw.send(lightMsg.set(currentLevel > 0 ? 1 : 0));
    gw.send(dimmerMsg.set(currentLevel));
    }
}
```
### {% linkable_title MySensors 2.x example sketch %}

```cpp
/**
 * Created by Henrik Ekblad <henrik.ekblad@mysensors.org>
 * Copyright (C) 2013-2015 Sensnology AB
 * Full contributor list: https://github.com/mysensors/Arduino/graphs/contributors
 *
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 */

// Enable debug prints
#define MY_DEBUG

// Enable and select radio type attached
#define MY_RADIO_NRF24
//#define MY_RADIO_RFM69

#include <MySensors.h>

#define CHILD_ID_LIGHT 1

#define EPROM_LIGHT_STATE 1
#define EPROM_DIMMER_LEVEL 2

#define LIGHT_OFF 0
#define LIGHT_ON 1

#define SN "Dimable Light"
#define SV "1.0"

int16_t LastLightState=LIGHT_OFF;
int16_t LastDimValue=100;

MyMessage lightMsg(CHILD_ID_LIGHT, V_LIGHT);
MyMessage dimmerMsg(CHILD_ID_LIGHT, V_DIMMER);

void setup()
{
	//Retreive our last light state from the eprom
	int LightState=loadState(EPROM_LIGHT_STATE);
	if (LightState<=1) {
		LastLightState=LightState;
		int DimValue=loadState(EPROM_DIMMER_LEVEL);
		if ((DimValue>0)&&(DimValue<=100)) {
			//There should be no Dim value of 0, this would mean LIGHT_OFF
			LastDimValue=DimValue;
		}
	}

	//Here you actualy switch on/off the light with the last known dim level
	SetCurrentState2Hardware();

	Serial.println( "Node ready to receive messages..." );
}

void presentation()
{
	// Send the Sketch Version Information to the Gateway
	sendSketchInfo(SN, SV);

	present(CHILD_ID_LIGHT, S_DIMMER );
}

void loop()
{
}

void receive(const MyMessage &message)
{
	if (message.type == V_LIGHT) {
		Serial.println( "V_LIGHT command received..." );

		int lstate= atoi( message.data );
		if ((lstate<0)||(lstate>1)) {
			Serial.println( "V_LIGHT data invalid (should be 0/1)" );
			return;
		}
		LastLightState=lstate;
		saveState(EPROM_LIGHT_STATE, LastLightState);

		if ((LastLightState==LIGHT_ON)&&(LastDimValue==0)) {
			//In the case that the Light State = On, but the dimmer value is zero,
			//then something (probably the controller) did something wrong,
			//for the Dim value to 100%
			LastDimValue=100;
			saveState(EPROM_DIMMER_LEVEL, LastDimValue);
		}

		//When receiving a V_LIGHT command we switch the light between OFF and the last received dimmer value
		//This means if you previously set the lights dimmer value to 50%, and turn the light ON
		//it will do so at 50%
	} else if (message.type == V_DIMMER) {
		Serial.println( "V_DIMMER command received..." );
		int dimvalue= atoi( message.data );
		if ((dimvalue<0)||(dimvalue>100)) {
			Serial.println( "V_DIMMER data invalid (should be 0..100)" );
			return;
		}
		if (dimvalue==0) {
			LastLightState=LIGHT_OFF;
		} else {
			LastLightState=LIGHT_ON;
			LastDimValue=dimvalue;
			saveState(EPROM_DIMMER_LEVEL, LastDimValue);
		}
	} else {
		Serial.println( "Invalid command received..." );
		return;
	}

	//Here you set the actual light state/level
	SetCurrentState2Hardware();
}

void SetCurrentState2Hardware()
{
	if (LastLightState==LIGHT_OFF) {
		Serial.println( "Light state: OFF" );
	} else {
		Serial.print( "Light state: ON, Level: " );
		Serial.println( LastDimValue );
	}

	//Send current state to the controller
	SendCurrentState2Controller();
}

void SendCurrentState2Controller()
{
	if ((LastLightState==LIGHT_OFF)||(LastDimValue==0)) {
		send(dimmerMsg.set((int16_t)0));
    send(lightMsg.set((int16_t)0));
	} else {
		send(dimmerMsg.set(LastDimValue));
    send(lightMsg.set((int16_t)0));
	}
}
```
[main component]: /components/mysensors/
[serial api]: https://www.mysensors.org/download/serial_api_15
