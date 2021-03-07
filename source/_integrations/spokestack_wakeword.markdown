---
title: "Spokestack Wakeword"
description: "Spokestack Wakeword documentation"
ha_release: "0.38"
ha_category: Voice
ha_iot_class: "Local Polling"
ha_config_flow: true
ha_codeowners:
  - '@spokestack'
  - '@will-rice'
ha_domain: spokestack_wakeword
---

[Spokestack](https://www.spokestack.io/) offers open-source libraries for adding a voice interface to _anything_. `spokestack_wakeword` is an integration that enables users to add a spoken keyword
to trigger an event.

If you already have an account, [log in](https://www.spokestack.io/login), otherwise you will need to [create](https://www.spokestack.io/create) one. The model download URL can be found in your [account settings](https://www.spokestack.io/account/settings).


## Dependencies
There are also some dependencies that should be installed before using this integration. Audio input is controlled by `pyaudio`, which has [PortAudio](http://www.portaudio.com/) as a dependency. You can install PortAudio from command line:

#### Debian/Ubuntu

```shell
sudo apt-get install portaudio19-dev
```


#### Alpine

```shell
apk install portaudio
```

#### PyAudio

```shell
pip3 install pyaudio
```

#### TFLite Runtime
In addition, you will need a way to run TFLite models. The full [TensorFlow](https://www.tensorflow.org/) package will work, but the recommended approach is the TFlite Runtime. This is hardware specific, so you will want to follow the [installation instructions](https://www.tensorflow.org/lite/guide/python#install_just_the_tensorflow_lite_interpreter).


{% include integrations/config_flow.md %}

## Services

Once loaded, the `spokestack_wakeword` integration will expose services that can be called to start, run, or stop the wake word pipeline.

Available services:

`start`, `run`, `stop`

#### Service `start`
This service initializes the system default audio input device.

Service | Optional | Description
-|-|-
`spokestack_wakeword.start` | no | Starts the system default audio input device.

#### Service `run`

This service runs wake word detection.

Service | Optional | Description
-|-|-
`spokestack_wakeword.run` | no | Runs wake word detection service.

#### Service `stop`

This service stops the wake word detection and deactivates the audio input device.

Service | Optional | Description
-|-|-
`spokestack_wakeword.stop` | no | Stops the running wake word detection.
    