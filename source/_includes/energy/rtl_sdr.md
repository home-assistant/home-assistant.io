In the United States and Canada, many electricity, gas, and water meters use [AMR (Automatic Meter Reading)](https://en.wikipedia.org/wiki/Automatic_meter_reading) or [ERT (Encoder Receiver Transmitter)](https://en.wikipedia.org/wiki/Encoder_receiver_transmitter) protocols to wirelessly broadcast their readings. You can receive these broadcasts using an inexpensive [RTL-SDR](https://en.wikipedia.org/wiki/RTL-SDR) USB dongle and decode them with [rtlamr](https://github.com/bemasher/rtlamr), an open source receiver for these protocols.

The community project [rtlamr2mqtt](https://github.com/allangood/rtlamr2mqtt) packages this into a Home Assistant add-on that automatically publishes your meter readings via MQTT discovery, making them available in Home Assistant without any physical connection to the meter.

This approach works with a wide range of Itron, Badger, and other AMR-compatible meters commonly deployed by US and Canadian utilities.
