---
layout: page
title: "MySensors"
description: "Instructions on how to integrate MySensors sensors into Home Assistant."
date: 2016-10-01 15:00 +0200
sidebar: true
comments: false
sharing: true
footer: true
logo: mysensors.png
ha_category:
  - DIY
  - Binary Sensor
  - Climate
  - Cover
  - Presence Detection
  - Light
  - Notifications
  - Sensor
  - Switch
featured: true
ha_iot_class: "Local Push"
redirect_from:
  - /components/binary_sensor.mysensors/
  - /components/cover.mysensors/
  - /components/climate.mysensors/
  - /components/light.mysensors/
  - /components/notify.mysensors/
---

The [MySensors](https://www.mysensors.org) project combines devices like Arduino, ESP8266, Raspberry Pi, NRF24L01+ and RFM69 to build affordable sensor networks. This component will automatically add all available devices to Home Assistant, after [presentation](#presentation) is done. That is, you do not need to add anything to your configuration for the devices for them to be added. Go to the **states** section of the developer tools to find the devices that have been identified.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Climate](#climate)
- [Cover](#cover)
- [Presence Detection](#presence-detection)
- [Light](#light)
- [Notifications](#notifications)
- [Sensor](#sensor)
- [Switch](#switch)

### {% linkable_title Configuration %}

Integrate your Serial, Ethernet (LAN) or MQTT MySensors Gateway by adding the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mysensors:
  gateways:
    - device: '/dev/ttyUSB0'
```

{% configuration %}
  gateways:
    description: A list of gateways to set up.
    required: true
    type: map
    keys:
      device:
        description: The path to the serial gateway where it is connected to your Home Assistant host, or the address of the TCP Ethernet gateway, or `mqtt` to setup the MQTT gateway. Resolving DNS addresses is theoretically supported but not tested.
        required: true
        type: string
      baud_rate:
        description: Specifies the baud rate of the connected serial gateway.
        required: false
        type: integer
        default: 115200
      persistence_file:
        description: The path to a file to save sensor information. The file extension determines the file type. Currently supported file types are 'pickle' and 'json'.
        required: false
        type: string
        default: path/to/config/directory/mysensors.pickle
      tcp_port:
        description: Specifies the port of the connected TCP Ethernet gateway.
        required: false
        type: integer
        default: 5003
      topic_in_prefix:
        description: Set the prefix of the MQTT topic for messages coming from the MySensors gateway in to Home Assistant.
        required: false
        type: string
        default: ''
      topic_out_prefix:
        description: Set the prefix of the MQTT topic for messages going from Home Assistant out to the MySensors gateway.
        required: false
        type: string
        default: ''
      nodes:
        description: A mapping of node ids to node settings, e.g. custom name.
        required: false
        type: map
        keys:
          name:
            description: The name the node will be renamed to. This node name becomes part of the entity_id. Default entity_id is [sketch_name]\_[node_id]\_[child_id] and when this name is set, the entity_id becomes [name]\_[child_id].
            required: true
            type: string
  persistence:
    description: Enable or disable local persistence of sensor information. If this is disabled, then each sensor will need to send presentation messages after Home Assistant starts.
    required: false
    type: integer
    default: true
  version:
    description: Specifies the MySensors protocol version to use. Supports 1.4, 1.5 and 2.0.
    required: false
    type: string
    default: '1.4'
  optimistic:
    description: Enable or disable optimistic mode for actuators (switch/light). Set this to true if no state feedback from actuators is possible. Home Assistant will assume that the command succeeded and change state.
    required: false
    type: integer
    default: false
  retain:
    description: Enable or disable retain flag for published messages from Home Assistant when using the MQTT gateway.
    required: false
    type: integer
    default: true
{% endconfiguration %}

<p class='note'>
Not all features of MySensors 2.0 are supported by Home Assistant yet. As more features are added, they will be described here in the documentation. Go to the MySensors platform pages under "related components" to see what message types are currently supported.
</p>

If you are using an original Arduino as a serial gateway, the port will be named `ttyACM*`. The exact number can be determined with the command shown below.

```bash
$ ls /dev/ttyACM*
```

If you are using the MQTT gateway, you also need to have the [MQTT component](/components/mqtt/) configured in Home Assistant. See below for a minimum MQTT configuration:

```yaml
mqtt:
  client_id: home-assistant-1
```

<p class='note'>
The MQTT gateway requires MySensors version 2.0 and only the MQTT client gateway is supported.
</p>

### {% linkable_title Extended configuration example %}

```yaml
# Example configuration.yaml entry
mysensors:
  gateways:
    - device: '/dev/ttyUSB0'
      persistence_file: 'path/mysensors.json'
      baud_rate: 38400
      nodes:
        1:
          name: 'kitchen'
        3:
          name: 'living_room'
    - device: '/dev/ttyACM0'
      persistence_file: 'path/mysensors2.json'
      baud_rate: 115200
    - device: '192.168.1.18'
      persistence_file: 'path/mysensors3.json'
      tcp_port: 5003
    - device: mqtt
      persistence_file: 'path/mysensors4.json'
      topic_in_prefix: 'mygateway1-out'
      topic_out_prefix: 'mygateway1-in'
  optimistic: false
  persistence: true
  retain: true
  version: '2.0'
```

### {% linkable_title Presentation %}

Present a MySensors sensor or actuator, by following these steps:

1. Connect the serial gateway to your computer or the Ethernet or MQTT gateway to your network.
2. Configure the MySensors component in `configuration.yaml`.
3. Start Home Assistant.
4. Write and upload your MySensors sketch to the sensor. Make sure you:
    - Send sketch name.
    - Present the sensor's `S_TYPE`.
    - Send at least one initial value per `V_TYPE`. In version 2.0 of MySensors, this has to be done in the loop function. See below for an example in 2.0 of how to make sure the initial value has been received by the controller.
5. Start the sensor.

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/relay
 */

#define MY_DEBUG
#define MY_RADIO_NRF24
#define MY_REPEATER_FEATURE
#define MY_NODE_ID 1
#include <SPI.h>
#include <MySensors.h>
#include <Bounce2.h>

#define RELAY_PIN  5
#define BUTTON_PIN  3
#define CHILD_ID 1
#define RELAY_ON 1
#define RELAY_OFF 0

Bounce debouncer = Bounce();
bool state = false;
bool initialValueSent = false;

MyMessage msg(CHILD_ID, V_STATUS);

void setup()
{
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(10);

  // Make sure relays are off when starting up
  digitalWrite(RELAY_PIN, RELAY_OFF);
  pinMode(RELAY_PIN, OUTPUT);
}

void presentation()  {
  sendSketchInfo("Relay+button", "1.0");
  present(CHILD_ID, S_BINARY);
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msg.set(state?RELAY_ON:RELAY_OFF));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_STATUS);
    wait(2000, C_SET, V_STATUS);
  }
  if (debouncer.update()) {
    if (debouncer.read()==LOW) {
      state = !state;
      // Send new state and request ack back
      send(msg.set(state?RELAY_ON:RELAY_OFF), true);
    }
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
  }

  if (message.type == V_STATUS) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
    // Change relay state
    state = (bool)message.getInt();
    digitalWrite(RELAY_PIN, state?RELAY_ON:RELAY_OFF);
    send(msg.set(state?RELAY_ON:RELAY_OFF));
  }
}
```

### {% linkable_title SmartSleep %}

Sending a heartbeat, `I_HEARTBEAT_RESPONSE`, from the MySensors device to Home Assistant, using MySensors version 2.0 - 2.1, activates the SmartSleep functionality in Home Assistant. This means that messages are buffered and only sent to the device upon receiving a heartbeat from the device. State changes are stored so that only the last requested state change is sent to the device. Other types of messages are queued in a FIFO queue. SmartSleep is useful for battery powered actuators that are waiting for commands. See the MySensors library API for information on how to send heartbeats and sleep the device.

In MySensors version 2.2 the serial API changed from using `I_HEARTBEAT_RESPONSE` to signal SmartSleep, to using `I_PRE_SLEEP_NOTIFICATION` and `I_POST_SLEEP_NOTIFICATION`. Home Assistant has been upgraded to support the new message types and will activate SmartSleep when receiving a message of type `I_PRE_SLEEP_NOTIFICATION`, if using MySensors version 2.2.x or higher. If Home Assistant is configured to use MySensors version 2.0 - 2.1 the old SmartSleep behavior is retained.

### {% linkable_title Message validation %}

Messages sent to or from Home Assistant from or to a MySensors device will be validated according to the MySensors [serial API](https://www.mysensors.org/download/serial_api_20). If a message doesn't pass validation, it will be dropped and not be passed forward either to or from Home Assistant. Make sure you follow the serial API for your version of MySensors when writing your Arduino sketch.

If you experience dropped messages or that a device is not added to Home Assistant, please turn on debug logging for the `mysensors` component and the `mysensors` package.

```yaml
logger:
  default: info
  logs:
    homeassistant.components.mysensors: debug
    mysensors: debug
```

The log should inform you of messages that failed validation or if a child value is missing that is required for a certain child type. Note that the log will log all possible combinations of platforms for a child type that failed validation. It is normal to see some platforms fail validation if the child type supports multiple platforms and your sketch doesn't send all corresponding value types. e.g., the `S_BARO` child type supports both `V_PRESSURE` and `V_FORECAST` value types. If you only send a `V_PRESSURE` value, an `S_BARO` entity with `V_PRESSURE` value will be set up for the sensor platform. However, the log will inform of a sensor platform that failed validation due to missing `V_FORECAST` value type for the `S_BARO` child. Home Assistant will log failed validations of child values at warning level if one required value type for a platform has been received, but other required value types are missing. Most failed validations are logged at debug level.

Message validation was introduced in version 0.52 of Home Assistant.

Visit the [library API][MySensors library api] of MySensors for more information.

[MySensors library API]: http://www.mysensors.org/download

## {% linkable_title Binary Sensor %}

Integrates MySensors binary sensors into Home Assistant. See the [main component](#configuration) for configuration instructions.

The following sensor types are supported:

#### MySensors version 1.4 and higher

S_TYPE             | V_TYPE
-------------------|---------------------------------------
S_DOOR             | V_TRIPPED
S_MOTION           | V_TRIPPED
S_SMOKE            | V_TRIPPED

#### MySensors version 1.5 and higher

S_TYPE         | V_TYPE
---------------|----------------------------------
S_SPRINKLER    | V_TRIPPED
S_WATER_LEAK   | V_TRIPPED
S_SOUND        | V_TRIPPED
S_VIBRATION    | V_TRIPPED
S_MOISTURE     | V_TRIPPED

For more information, visit the [serial api] of MySensors.

### {% linkable_title Example sketch %}

```cpp
/**
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/binary
 */


#include <MySensor.h>
#include <SPI.h>
#include <Bounce2.h>

#define SN "BinarySensor"
#define SV "1.0"
#define CHILD_ID 1
#define BUTTON_PIN 3  // Arduino Digital I/O pin for button/reed switch.

MySensor gw;
Bounce debouncer = Bounce();
MyMessage msg(CHILD_ID, V_TRIPPED);

void setup()
{
  gw.begin();
  gw.sendSketchInfo(SN, SV);
  // Setup the button.
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  // After setting up the button, setup debouncer.
  debouncer.attach(BUTTON_PIN);
  debouncer.interval(5);
  gw.present(CHILD_ID, S_DOOR);
  gw.send(msg.set(0));
}

void loop()
{
  if (debouncer.update()) {
    // Get the update value.
    int value = debouncer.read();
    // Send in the new value.
    gw.send(msg.set(value == LOW ? 1 : 0));
  }
}
```

[serial api]: http://www.mysensors.org/download

## {% linkable_title Cover %}

Integrates MySensors covers into Home Assistant. See the [main component](#configuration) for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.4

S_TYPE  | V_TYPE
--------|--------------------------------------------
S_COVER | V_UP, V_DOWN, V_STOP, [V_DIMMER or V_LIGHT]

##### MySensors version 1.5 and higher

S_TYPE  | V_TYPE
--------|-------------------------------------------------
S_COVER | V_UP, V_DOWN, V_STOP, [V_PERCENTAGE or V_STATUS]

All V_TYPES above are required. Use V_PERCENTAGE (or V_DIMMER) if you know the exact position of the cover in percent, use V_STATUS (or V_LIGHT) if you don't.

For more information, visit the [serial api] of MySensors.

### {% linkable_title Example sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
#define MY_RADIO_NRF24

#include <MySensors.h>
#define SN "Cover"
#define SV "1.1"

// Actuators for moving the cover up and down respectively.
#define COVER_UP_ACTUATOR_PIN 2
#define COVER_DOWN_ACTUATOR_PIN 3
// Sensors for finding out when the cover has reached its up/down position.
// These could be simple buttons or linear hall sensors.
#define COVER_UP_SENSOR_PIN 4
#define COVER_DOWN_SENSOR_PIN 5

#define CHILD_ID 0

// Internal representation of the cover state.
enum State {
  IDLE,
  UP, // Window covering. Up.
  DOWN, // Window covering. Down.
};

static int state = IDLE;
static int status = 0; // 0=cover is down, 1=cover is up
static bool initial_state_sent = false;
MyMessage upMessage(CHILD_ID, V_UP);
MyMessage downMessage(CHILD_ID, V_DOWN);
MyMessage stopMessage(CHILD_ID, V_STOP);
MyMessage statusMessage(CHILD_ID, V_STATUS);

void sendState() {
  // Send current state and status to gateway.
  send(upMessage.set(state == UP));
  send(downMessage.set(state == DOWN));
  send(stopMessage.set(state == IDLE));
  send(statusMessage.set(status));
}

void setup() {
  pinMode(COVER_UP_SENSOR_PIN, INPUT);
  pinMode(COVER_DOWN_SENSOR_PIN, INPUT);
}

void presentation() {
  sendSketchInfo(SN, SV);

  present(CHILD_ID, S_COVER);
}

void loop() {
  if (!initial_state_sent) {
    sendState();
    initial_state_sent = true;
  }

  if (state == IDLE) {
    digitalWrite(COVER_UP_ACTUATOR_PIN, LOW);
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, LOW);
  }

  if (state == UP && digitalRead(COVER_UP_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is up.");
    // Update status and state; send it to the gateway.
    status = 1;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }

  if (state == DOWN && digitalRead(COVER_DOWN_SENSOR_PIN) == HIGH) {
    Serial.println("Cover is down.");
    // Update status and state; send it to the gateway.
    status = 0;
    state = IDLE;
    sendState();
    // Actuators will be disabled in next loop() iteration.
  }
}

void receive(const MyMessage &message) {
  if (message.type == V_UP) {
    // Set state to covering up and send it back to the gateway.
    state = UP;
    sendState();
    Serial.println("Moving cover up.");

    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_UP_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_DOWN) {
    // Set state to covering up and send it back to the gateway.
    state = DOWN;
    sendState();
    Serial.println("Moving cover down.");
    // Activate actuator until the sensor returns HIGH in loop().
    digitalWrite(COVER_DOWN_ACTUATOR_PIN, HIGH);
  }

  if (message.type == V_STOP) {
    // Set state to idle and send it back to the gateway.
    state = IDLE;
    sendState();
    Serial.println("Stopping cover.");

    // Actuators will be switched off in loop().
  }
}
```

[serial api]: https://www.mysensors.org/download/serial_api_20

## {% linkable_title Climate %}

Integrates MySensors HVAC into Home Assistant. See the [main component](#configuration) for configuration instructions.

The following actuator types are supported:

##### MySensors version 1.5 and higher

S_TYPE | V_TYPE
-------|-----------------------------------------------------------------------------
S_HVAC | V_HVAC_FLOW_STATE*, V_HVAC_SETPOINT_HEAT, V_HVAC_SETPOINT_COOL, V_HVAC_SPEED, V_TEMP

V_HVAC_FLOW_STATE is mapped to the state of the Climate component in Home Assistant as follows:

Home Assistant State | MySensors State
---------------------|----------------
STATE_COOL           | CoolOn
STATE_HEAT           | HeatOn
STATE_AUTO           | AutoChangeOver
STATE_OFF            | Off

Currently humidity, away_mode, aux_heat, swing_mode is not supported. This will be included in later versions as feasible.

Set the target temperature using V_HVAC_SETPOINT_HEAT in Heat mode, and V_HVAC_SETPOINT_COOL in Cool Mode. In case of any Auto Change Over mode you can use V_HVAC_SETPOINT_HEAT as well as V_HVAC_SETPOINT_COOL to set the both the low bound and the high bound temperature of the device.

You can use V_HVAC_SPEED to control the Speed setting of the Fan in the HVAC.

You can use V_TEMP to send the current temperature from the node to Home Assistant.

For more information, visit the [serial api] of MySensors.

### {% linkable_title Example sketch for MySensors 2.x %}


```cpp
/*
* Documentation: http://www.mysensors.org
* Support Forum: http://forum.mysensors.org
*/

#define MY_RADIO_NRF24
#define CHILD_ID_HVAC 0

#include <MySensors.h>

// Uncomment your heatpump model
//#include <FujitsuHeatpumpIR.h>
//#include <PanasonicCKPHeatpumpIR.h>
//#include <PanasonicHeatpumpIR.h>
//#include <CarrierHeatpumpIR.h>
//#include <MideaHeatpumpIR.h>
//#include <MitsubishiHeatpumpIR.h>
//#include <SamsungHeatpumpIR.h>
//#include <SharpHeatpumpIR.h>
//#include <DaikinHeatpumpIR.h>

//Some global variables to hold the states
int POWER_STATE;
int TEMP_STATE;
int FAN_STATE;
int MODE_STATE;
int VDIR_STATE;
int HDIR_STATE;

IRSenderPWM irSender(3);       // IR led on Arduino digital pin 3, using Arduino PWM

//Change to your Heatpump
HeatpumpIR *heatpumpIR = new PanasonicNKEHeatpumpIR();

/*
new PanasonicDKEHeatpumpIR()
new PanasonicJKEHeatpumpIR()
new PanasonicNKEHeatpumpIR()
new CarrierHeatpumpIR()
new MideaHeatpumpIR()
new FujitsuHeatpumpIR()
new MitsubishiFDHeatpumpIR()
new MitsubishiFEHeatpumpIR()
new SamsungHeatpumpIR()
new SharpHeatpumpIR()
new DaikinHeatpumpIR()
*/

MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);

bool initialValueSent = false;

void presentation() {
  sendSketchInfo("Heatpump", "2.1");
  present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
}

void setup() {
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!initialValueSent) {
    send(msgHVACSetPointC.set(20));
    send(msgHVACSpeed.set("Auto"));
    send(msgHVACFlowState.set("Off"));

    initialValueSent = true;
  }
}

void receive(const MyMessage &message) {
  if (message.isAck()) {
     Serial.println("This is an ack from gateway");
     return;
  }

  Serial.print("Incoming message for: ");
  Serial.print(message.sensor);

  String recvData = message.data;
  recvData.trim();

  Serial.print(", New status: ");
  Serial.println(recvData);
  switch (message.type) {
    case V_HVAC_SPEED:
      Serial.println("V_HVAC_SPEED");

      if(recvData.equalsIgnoreCase("auto")) FAN_STATE = 0;
      else if(recvData.equalsIgnoreCase("min")) FAN_STATE = 1;
      else if(recvData.equalsIgnoreCase("normal")) FAN_STATE = 2;
      else if(recvData.equalsIgnoreCase("max")) FAN_STATE = 3;
    break;

    case V_HVAC_SETPOINT_COOL:
      Serial.println("V_HVAC_SETPOINT_COOL");
      TEMP_STATE = message.getFloat();
      Serial.println(TEMP_STATE);
    break;

    case V_HVAC_FLOW_STATE:
      Serial.println("V_HVAC_FLOW_STATE");
      if (recvData.equalsIgnoreCase("coolon")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_COOL;
      }
      else if (recvData.equalsIgnoreCase("heaton")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_HEAT;
      }
      else if (recvData.equalsIgnoreCase("autochangeover")) {
        POWER_STATE = 1;
        MODE_STATE = MODE_AUTO;
      }
      else if (recvData.equalsIgnoreCase("off")){
        POWER_STATE = 0;
      }
      break;
  }
  sendHeatpumpCommand();
  sendNewStateToGateway();
}

void sendNewStateToGateway() {
  send(msgHVACSetPointC.set(TEMP_STATE));
  send(msgHVACSpeed.set(FAN_STATE));
  send(msgHVACFlowState.set(MODE_STATE));
}

void sendHeatpumpCommand() {
  Serial.println("Power = " + (String)POWER_STATE);
  Serial.println("Mode = " + (String)MODE_STATE);
  Serial.println("Fan = " + (String)FAN_STATE);
  Serial.println("Temp = " + (String)TEMP_STATE);

  heatpumpIR->send(irSender, POWER_STATE, MODE_STATE, FAN_STATE, TEMP_STATE, VDIR_AUTO, HDIR_AUTO);
}
```

### {% linkable_title Example sketch for MySensors 1.x %}

```cpp
/*
* Documentation: http://www.mysensors.org
* Support Forum: http://forum.mysensors.org
*/

#include <MySensor.h>
/*
* Include all the other Necessary code here.
* The example code is limited to message exchange for mysensors
* with the controller (ha).
*/

#define CHILD_ID_HVAC  0  // childId
MyMessage msgHVACSetPointC(CHILD_ID_HVAC, V_HVAC_SETPOINT_COOL);
MyMessage msgHVACSpeed(CHILD_ID_HVAC, V_HVAC_SPEED);
MyMessage msgHVACFlowState(CHILD_ID_HVAC, V_HVAC_FLOW_STATE);

/*
* Include all the other Necessary code here.
* The example code is limited to message exchange for mysensors
* with the controller (ha).
*/

void setup()
{
  // Startup and initialize MySensors library.
  // Set callback for incoming messages.
  gw.begin(incomingMessage);

  // Send the sketch version information to the gateway and Controller
  gw.sendSketchInfo("HVAC", "0.1");

  gw.present(CHILD_ID_HVAC, S_HVAC, "Thermostat");
  gw.send(msgHVACFlowState.set("Off"));
  gw.send(msgHVACSetPointC.set(target_temp));
  gw.send(msgHVACSpeed.set("Max"));
}

void loop() {
  // Process incoming messages (like config from server)
  gw.process();
}

void incomingMessage(const MyMessage &message) {
  String recvData = message.data;
  recvData.trim();
  switch (message.type) {
    case V_HVAC_SPEED:
    if(recvData.equalsIgnoreCase("auto")) fan_speed = 0;
    else if(recvData.equalsIgnoreCase("min")) fan_speed = 1;
    else if(recvData.equalsIgnoreCase("normal")) fan_speed = 2;
    else if(recvData.equalsIgnoreCase("max")) fan_speed = 3;
    processHVAC();
    break;
    case V_HVAC_SETPOINT_COOL:
    target_temp = message.getFloat();
    processHVAC();
    break;
    case V_HVAC_FLOW_STATE:
    if(recvData.equalsIgnoreCase("coolon") && (!Present_Power_On )){
      togglePower();
    }
    else if(recvData.equalsIgnoreCase("off") && Present_Power_On ){
      togglePower();
    }
    break;
  }
}
```

[serial api]: http://www.mysensors.org/download

## {% linkable_title Presence Detection %}

Integrates MySensors device trackers into Home Assistant. See the [main component](#configuration) for configuration instructions.

The following sensor types are supported:

##### MySensors version 2.0 and higher

S_TYPE             | V_TYPE
-------------------|---------------------------------------
S_GPS             | V_POSITION

For more information, visit the [serial api] of MySensors.

### {% linkable_title MySensors 2.x example sketch %}

```cpp
/**
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/gps
 */

// Enable debug prints to serial monitor
#define MY_DEBUG
// Enable and select radio type attached
#define MY_RADIO_NRF24
//#define MY_RADIO_RFM69

#include <MySensors.h>

#define SN "GPS Sensor"
#define SV "1.0"

// GPS position send interval (in milliseconds)
#define GPS_SEND_INTERVAL 30000
// The child id used for the gps sensor
#define CHILD_ID_GPS 1

MyMessage msg(CHILD_ID_GPS, V_POSITION);

// Last time GPS position was sent to controller
unsigned long lastGPSSent = -31000;

// Some buffers
char latBuf[11];
char lngBuf[11];
char altBuf[6];
char payload[30];

// Dummy values. Implementation of real GPS device is not done.
float gpsLocationLat = 40.741895;
float gpsLocationLng = -73.989308;
float gpsAltitudeMeters = 12.0;

void setup() {

}

void presentation() {
  sendSketchInfo(SN, SV);
  present(CHILD_ID_GPS, S_GPS);
}

void loop()
{
  unsigned long currentTime = millis();

  // Evaluate if it is time to send a new position
  bool timeToSend = currentTime - lastGPSSent > GPS_SEND_INTERVAL;

  if (timeToSend) {
    // Send current gps location
    // Build position and altitude string to send
    dtostrf(gpsLocationLat, 1, 6, latBuf);
    dtostrf(gpsLocationLng, 1, 6, lngBuf);
    dtostrf(gpsAltitudeMeters, 1, 0, altBuf);
    sprintf(payload, "%s,%s,%s", latBuf, lngBuf, altBuf);

    Serial.print(F("Position: "));
    Serial.println(payload);

    send(msg.set(payload));
    lastGPSSent = currentTime;
  }
}
```

[serial api]: http://www.mysensors.org/download

## {% linkable_title Light %}

Integrates MySensors lights into Home Assistant. See the [main component](#configuration) for configuration instructions.

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
S_RGBW_LIGHT | V_RGBW*, [V_LIGHT\* or V_STATUS\*], [V_DIMMER or V_PERCENTAGE]

V_TYPES with a star (\*) denote V_TYPES that should be sent at sketch startup. For an S_DIMMER, send both a V_DIMMER/V_PERCENTAGE and a V_LIGHT/V_STATUS message.  For an S_RGB_LIGHT, send both a V_RGB and a V_LIGHT/V_STATUS message with a V_DIMMER/V_PERCENTAGE message being optional. Same principal applies for S_RGBW_LIGHT and V_RGBW.

Sketch should acknowledge a command sent from controller with the same type.  If command invokes a change to off state (including a V_PERCENTAGE, V_RGB, or V_RGBW message of zero), only a V_STATUS of zero message should be sent.  See sketches below for examples.  

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
/*
 * Example Dimmable Light
 * Code adapted from http://github.com/mysensors/MySensors/tree/master/examples/DimmableLight
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

#define LIGHT_OFF 0
#define LIGHT_ON 1

#define SN "Dimmable Light"
#define SV "1.0"

int16_t last_state = LIGHT_ON;
int16_t last_dim = 100;

MyMessage light_msg( CHILD_ID_LIGHT, V_STATUS );
MyMessage dimmer_msg( CHILD_ID_LIGHT, V_PERCENTAGE );

void setup()
{
  update_light();
  Serial.println( "Node ready to receive messages..." );
}

void loop()
{
  //In MySensors2.x, first message must come from within loop()
  static bool first_message_sent = false;
  if ( first_message_sent == false ) {
    Serial.println( "Sending initial state..." );
    send_dimmer_message();
    send_status_message();
    first_message_sent = true;
  }
}

void presentation()
{
  // Send the sketch version information to the gateway
  sendSketchInfo( SN, SV );
  present( CHILD_ID_LIGHT, S_DIMMER );
}

void receive(const MyMessage &message)
{
  //When receiving a V_STATUS command, switch the light between OFF
  //and the last received dimmer value  
  if ( message.type == V_STATUS ) {
    Serial.println( "V_STATUS command received..." );

    int lstate = message.getInt();
    if (( lstate < 0 ) || ( lstate > 1 )) {
      Serial.println( "V_STATUS data invalid (should be 0/1)" );
      return;
    }
    last_state = lstate;

    //If last dimmer state is zero, set dimmer to 100
    if (( last_state == LIGHT_ON ) && ( last_dim == 0 )) {
      last_dim=100;
    }

    //Update constroller status
    send_status_message();

  } else if ( message.type == V_PERCENTAGE ) {
    Serial.println( "V_PERCENTAGE command received..." );
    int dim_value = constrain( message.getInt(), 0, 100 );
    if ( dim_value == 0 ) {
      last_state = LIGHT_OFF;

      //Update constroller with dimmer value & status
      send_dimmer_message();
      send_status_message();      
    } else {
      last_state = LIGHT_ON;
      last_dim = dim_value;

      //Update constroller with dimmer value
      send_dimmer_message();
    }

  } else {
    Serial.println( "Invalid command received..." );
    return;
  }

  //Here you set the actual light state/level
  update_light();
}

void update_light()
{
  //For this example, just print the light status to console.
  if ( last_state == LIGHT_OFF ) {
    Serial.println( "Light state: OFF" );
  } else {
    Serial.print( "Light state: ON, Level: " );
    Serial.println( last_dim );
  }
}

void send_dimmer_message()
{
  send( dimmer_msg.set( last_dim ) );
}

void send_status_message()
{
  if ( last_state == LIGHT_OFF ) {
    send( light_msg.set( (int16_t)0) );
  } else {
    send( light_msg.set( (int16_t)1) );
  }
}
```

[serial api]: http://www.mysensors.org/download

## {% linkable_title Notification %}

Integrates MySensors notifications into Home Assistant. See the [main component](#configuration) for configuration instructions.

Setting the `target` key in the service call will target the name of the MySensors device in Home Assistant. MySensors device names follow the notation: "[Sketch name] [Node id] [Child id]".

### {% linkable_title Automation example %}

```yaml
...
action:
  service: notify.mysensors
  data:
    message: Welcome home!
    target: 'TextSensor 254 1'
```

The following sensor types are supported:

##### MySensors version 2.0 and higher

S_TYPE          | V_TYPE
----------------|--------------------------
S_INFO          | V_TEXT

For more information, visit the [api] page of MySensors.

### {% linkable_title Example sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 */

 #define MY_DEBUG
 #define MY_RADIO_NRF24
 #define MY_REPEATER_FEATURE

 #include <SPI.h>
 #include <MySensors.h>

 #define SN "TextSensor"
 #define SV "1.0"
 #define CHILD_ID 1

 MyMessage textMsg(CHILD_ID, V_TEXT);
 bool initialValueSent = false;

 void setup(void) {
 }

 void presentation() {
   sendSketchInfo(SN, SV);
   present(CHILD_ID, S_INFO, "TextSensor1");
 }

 void loop() {
   if (!initialValueSent) {
     Serial.println("Sending initial value");
     // Send initial values.
     send(textMsg.set("-"));
     Serial.println("Requesting initial value from controller");
     request(CHILD_ID, V_TEXT);
     wait(2000, C_SET, V_TEXT);
   }
 }

 void receive(const MyMessage &message) {
   if (message.type == V_TEXT) {
     if (!initialValueSent) {
       Serial.println("Receiving initial value from controller");
       initialValueSent = true;
     }
     // Dummy print
     Serial.print("Message: ");
     Serial.print(message.sensor);
     Serial.print(", Message: ");
     Serial.println(message.getString());
     // Send message to controller
     send(textMsg.set(message.getString()));
   }
 }
```

[api]: http://www.mysensors.org/download/

## {% linkable_title Sensor %}

Integrates MySensors sensors into Home Assistant. See the [main component](#configuration) for configuration instructions.

The following sensor types are supported:

##### MySensors version 1.4 and higher

S_TYPE             | V_TYPE
-------------------|---------------------------------------
S_TEMP             | V_TEMP
S_HUM              | V_HUM
S_BARO             | V_PRESSURE, V_FORECAST
S_WIND             | V_WIND, V_GUST, V_DIRECTION
S_RAIN             | V_RAIN, V_RAINRATE
S_UV               | V_UV
S_WEIGHT           | V_WEIGHT, V_IMPEDANCE
S_POWER            | V_WATT, V_KWH
S_DISTANCE         | V_DISTANCE
S_LIGHT_LEVEL      | V_LIGHT_LEVEL
S_IR               | V_IR_RECEIVE
S_WATER            | V_FLOW, V_VOLUME
S_AIR_QUALITY      | V_DUST_LEVEL
S_CUSTOM           | V_VAR1, V_VAR2, V_VAR3, V_VAR4, V_VAR5
S_DUST             | V_DUST_LEVEL
S_SCENE_CONTROLLER | V_SCENE_ON, V_SCENE_OFF

##### MySensors version 1.5 and higher

S_TYPE         | V_TYPE
---------------|----------------------------------
S_COLOR_SENSOR | V_RGB
S_MULTIMETER   | V_VOLTAGE, V_CURRENT, V_IMPEDANCE
S_SOUND        | V_LEVEL
S_VIBRATION    | V_LEVEL
S_MOISTURE     | V_LEVEL
S_LIGHT_LEVEL  | V_LEVEL
S_AIR_QUALITY  | V_LEVEL (replaces V_DUST_LEVEL)
S_DUST         | V_LEVEL (replaces V_DUST_LEVEL)

##### MySensors version 2.0 and higher

S_TYPE          | V_TYPE
----------------|--------------------------
S_INFO          | V_TEXT
S_GAS           | V_FLOW, V_VOLUME
S_GPS           | V_POSITION
S_WATER_QUALITY | V_TEMP, V_PH, V_ORP, V_EC

### {% linkable_title Custom unit of measurement %}

Some sensor value types are not specific for a certain sensor type. These do not have a default unit of measurement in Home Assistant. For example, the V_LEVEL type can be used for different sensor types, dust, sound, vibration etc.

By using V_UNIT_PREFIX, it's possible to set a custom unit for any sensor. The string value that is sent for V_UNIT_PREFIX will be used in preference to any other unit of measurement, for the defined sensors. V_UNIT_PREFIX can't be used as a stand-alone sensor value type. Sending a supported value type and value from the tables above is also required. V_UNIT_PREFIX is available with MySensors version 1.5 and later.

For more information, visit the [serial api] of MySensors.

### {% linkable_title MySensors 1.5 example sketch %}

```cpp
/**
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/light
 */

#include <SPI.h>
#include <MySensor.h>  
#include <BH1750.h>
#include <Wire.h>

#define SN "LightLuxSensor"
#define SV "1.0"
#define CHILD_ID 1
unsigned long SLEEP_TIME = 30000; // Sleep time between reads (in milliseconds)

BH1750 lightSensor;
MySensor gw;
MyMessage msg(CHILD_ID, V_LEVEL);
MyMessage msgPrefix(CHILD_ID, V_UNIT_PREFIX);  // Custom unit message.
uint16_t lastlux = 0;

void setup()  
{
  gw.begin();
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_LIGHT_LEVEL);
  lightSensor.begin();
  gw.send(msg.set(lastlux));
  gw.send(msgPrefix.set("lux"));  // Set custom unit.
}

void loop()
{
  uint16_t lux = lightSensor.readLightLevel();  // Get Lux value
  if (lux != lastlux) {
      gw.send(msg.set(lux));
      lastlux = lux;
  }

  gw.sleep(SLEEP_TIME);
}
```

### {% linkable_title MySensors 2.x example sketch %}

```cpp
/**
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/light
 */

#define MY_DEBUG
#define MY_RADIO_NRF24

#include <BH1750.h>
#include <Wire.h>
#include <MySensors.h>

#define SN "LightLuxSensor"
#define SV "1.0"
#define CHILD_ID 1
unsigned long SLEEP_TIME = 30000; // Sleep time between reads (in milliseconds)

BH1750 lightSensor;
MyMessage msg(CHILD_ID, V_LEVEL);
MyMessage msgPrefix(CHILD_ID, V_UNIT_PREFIX);  // Custom unit message.
uint16_t lastlux = 0;
bool initialValueSent = false;

void setup()
{
  sendSketchInfo(SN, SV);
  present(CHILD_ID, S_LIGHT_LEVEL);
  lightSensor.begin();
}

void loop()
{
  if (!initialValueSent) {
    Serial.println("Sending initial value");
    send(msgPrefix.set("custom_lux"));  // Set custom unit.
    send(msg.set(lastlux));
    Serial.println("Requesting initial value from controller");
    request(CHILD_ID, V_LEVEL);
    wait(2000, C_SET, V_LEVEL);
  }
  uint16_t lux = lightSensor.readLightLevel();  // Get Lux value
  if (lux != lastlux) {
      send(msg.set(lux));
      lastlux = lux;
  }

  sleep(SLEEP_TIME);
}

void receive(const MyMessage &message) {
  if (message.type == V_LEVEL) {
    if (!initialValueSent) {
      Serial.println("Receiving initial value from controller");
      initialValueSent = true;
    }
  }
}
```

[serial api]: http://www.mysensors.org/download

## {% linkable_title Switch %}

Integrates MySensors switches into Home Assistant. See the [main component](#configuration) for configuration instructions.

## {% linkable_title Supported actuator types %}

The following actuator types are supported:

### {% linkable_title MySensors version 1.4 and higher %}

S_TYPE   | V_TYPE
---------|-------------------
S_DOOR   | V_ARMED
S_MOTION | V_ARMED
S_SMOKE  | V_ARMED
S_LIGHT  | V_LIGHT
S_LOCK   | V_LOCK_STATUS
S_IR     | V_IR_SEND, V_LIGHT

### {% linkable_title MySensors version 1.5 and higher %}

S_TYPE       | V_TYPE
-------------|----------------------
S_LIGHT      | V_STATUS
S_BINARY     | [V_STATUS or V_LIGHT]
S_SPRINKLER  | V_STATUS
S_WATER_LEAK | V_ARMED
S_SOUND      | V_ARMED
S_VIBRATION  | V_ARMED
S_MOISTURE   | V_ARMED

### {% linkable_title MySensors version 2.0 and higher %}

S_TYPE          | V_TYPE
----------------|---------
S_WATER_QUALITY | V_STATUS

All V_TYPES for each S_TYPE above are required to activate the actuator for the platform. Use either V_LIGHT or V_STATUS depending on library version for cases where that V_TYPE is required.

For more information, visit the [serial api] of MySensors.

## {% linkable_title Services %}

The MySensors switch platform exposes a service to change an IR code attribute for an IR switch device and turn the switch on. The IR switch will automatically be turned off after being turned on, if `optimistic` is set to `true` in the [config](/components/mysensors/#configuration) for the MySensors component. This will simulate a push button on a remote. If `optimistic` is `false`, the MySensors device will have to report its updated state to reset the switch. See the [example sketch](#ir-switch-sketch) for the IR switch below.

| Service | Description |
| ------- | ----------- |
| mysensors_send_ir_code | Set an IR code as a state attribute for a MySensors IR device switch and turn the switch on.|

The service can be used as part of an automation script. For example:

```yaml
# Example configuration.yaml automation entry
automation:
  - alias: Turn HVAC on
    trigger:
      platform: time
      at: '5:30:00'
    action:
      service: switch.mysensors_send_ir_code
      entity_id: switch.hvac_1_1
      data:
        V_IR_SEND: '0xC284'  # the IR code to send

  - alias: Turn HVAC off
    trigger:
      platform: time
      at: '0:30:00'
    action:
      service: switch.mysensors_send_ir_code
      entity_id: switch.hvac_1_1
      data:
        V_IR_SEND: '0xC288'  # the IR code to send
```

## {% linkable_title Example sketches %}

### {% linkable_title Switch sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/relay
 */

#include <MySensor.h>
#include <SPI.h>

#define SN "Relay"
#define SV "1.0"
#define CHILD_ID 1
#define RELAY_PIN 3

MySensor gw;
MyMessage msgRelay(CHILD_ID, V_STATUS);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  // Initialize the digital pin as an output.
  pinMode(RELAY_PIN, OUTPUT);
  gw.present(CHILD_ID, S_BINARY);
  gw.send(msgRelay.set(0));
}

void loop()
{
  gw.process();
}

void incomingMessage(const MyMessage &message)
{
  if (message.type == V_STATUS) {
     // Change relay state.
     digitalWrite(RELAY_PIN, message.getBool() ? 1 : 0);
     gw.send(msgRelay.set(message.getBool() ? 1 : 0));
  }
}
```

### {% linkable_title IR switch sketch %}

```cpp
/*
 * Documentation: http://www.mysensors.org
 * Support Forum: http://forum.mysensors.org
 *
 * http://www.mysensors.org/build/ir
 */

#include <MySensor.h>
#include <SPI.h>
#include <IRLib.h>

#define SN "IR Sensor"
#define SV "1.0"
#define CHILD_ID 1

MySensor gw;

char code[10] = "abcd01234";
char oldCode[10] = "abcd01234";
MyMessage msgCodeRec(CHILD_ID, V_IR_RECEIVE);
MyMessage msgCode(CHILD_ID, V_IR_SEND);
MyMessage msgSendCode(CHILD_ID, V_LIGHT);

void setup()
{
  gw.begin(incomingMessage);
  gw.sendSketchInfo(SN, SV);
  gw.present(CHILD_ID, S_IR);
  // Send initial values.
  gw.send(msgCodeRec.set(code));
  gw.send(msgCode.set(code));
  gw.send(msgSendCode.set(0));
}

void loop()
{
  gw.process();
  // IR receiver not implemented, just a dummy report of code when it changes
  if (String(code) != String(oldCode)) {
    Serial.print("Code received ");
    Serial.println(code);
    gw.send(msgCodeRec.set(code));
    strcpy(oldCode, code);
  }
}

void incomingMessage(const MyMessage &message) {
  if (message.type==V_LIGHT) {
    // IR sender not implemented, just a dummy print.
    if (message.getBool()) {
      Serial.print("Sending code ");
      Serial.println(code);
    }
    gw.send(msgSendCode.set(message.getBool() ? 1 : 0));
    // Always turn off device
    gw.wait(100);
    gw.send(msgSendCode.set(0));
  }
  if (message.type == V_IR_SEND) {
    // Retrieve the IR code value from the incoming message.
    String codestring = message.getString();
    codestring.toCharArray(code, sizeof(code));
    Serial.print("Changing code to ");
    Serial.println(code);
    gw.send(msgCode.set(code));
  }
}
```

[serial api]: http://www.mysensors.org/download