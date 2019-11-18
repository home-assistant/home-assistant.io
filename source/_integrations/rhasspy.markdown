---
title: "rhasspy"
description: "Instructions on how to integrate Rhasspy within Home Assistant."
logo: rhasspy.png
ha_category:
  - Voice
ha_release: 0.103
---

[Rhasspy](https://rhasspy.readthedocs.io) is a highly customizable, private voice assistant that [runs completely offline](#the-zen-of-rhasspy) and [supports many languages](#supported-languages). It generates a personalized speech/intent recognizer from voice commands that [you can create](#new-voice-commands) entirely on your device.

To get started, you must:

1. [Install a Rhasspy server](https://rhasspy.readthedocs.io/en/latest/installation/)
2. Visit the web interface at http://YOUR-RHASSPY-SERVER:12101 to download a language-specific profile

Make sure the Rhasspy server is running *before* you start Home Assistant (or you will need to [re-train from Home Assistant](#re-training) after Rhasspy starts).

```yaml
# Example configuration.yaml entry
rhasspy:
  api_url: http://YOUR_RHASSPY_SERVER:12101/api/
  language: en-US
  register_conversation: true
  make_intent_commands: true
    
# Rhasspy will register as a conversation agent
conversation:

stt:
  - platform: rhasspy
    api_url: http://YOUR_RHASSPY_SERVER:12101/api/
```

Voice commands are [automatically generated](#built-in-voice-commands) based on your Home Assistant configuration when the `rhasspy` integration starts.

Out of the box, you can [turn devices on and off](#turn-onoff-and-toggle), [ask about their states](#get-device-state), [set a timer](#set-a-timer), and [run automations](#run-automations) via voice. This process is [highly customizable](#controlling-voice-command-generation).

## Rhasspy Configuration

There are a large number of configuration options for `rhasspy`. See the [complete configuration](#complete-configuraton) section for all available options and their default values.

{% configuration %}
api_url:
  description: URL of your Rhasspy server's web API.
  required: false
  type: string
  default: http://localhost:12101/api/
custom_words:
  description: Map of words and how you will pronounce them (see [custom words](https://rhasspy.readthedocs.io/en/latest/training/#custom-words)).
  required: false
  type: map
handle_intents:
  description: List of intents that the `rhasspy` integration should handle (choose from [built-in intents](#built-in-intents)).
  required: false
  type: list
intent_commands:
  description: Map of intent names and [voice command templates](https://rhasspy.readthedocs.io/en/latest/training/#sentencesini). This is where you specify [custom voice commands](#custom-voice-commands).
  required: false
  type: map
intent_filters:
  description: Map of [intent names and filters](#intent-filters) for including/excluding specific domains/entities in auto-generated commands.
  required: false
  type: map
intent_states:
  description: Map of [intent and state names](#intent-state-names) for deciding when devices are "on", "open", etc.
  required: false
  type: map
language:
  description: Language/locale of your Rhasspy profile. See [supported languages](#supported-languages).
  required: false
  type: string
  default: en-US
make_intent_commands:
  description: Controls how voice comands are auto-generated. True or false enables or disables voice command generation. You can [customize this more](#controlling-voice-command-generation) by include or excluding specific intents.
  required: false
  type: boolean
  default: true
register_conversation:
  description: When true, Rhasspy will register a [conversation](https://www.home-assistant.io/integrations/conversation/) agent and handle intent recognition.
  required: false
  type: boolean
  default: true
name_replace:
  description: Controls how [entity names are cleaned](#entity-names) before being sent to Rhasspy.
  required: false
  type: map
response_templates:
  description: Map of intent names and [jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/). This controls how the `rhasspy` integration generates speech in response to the [built-in intents](#built-in-intents).
  required: false
  type: map
shopping_list_items:
  description: List of possible items that can be [added to your shopping list](#manipulate-shopping-list). If this list is empty (the default), you will not be able to add anything to your shopping list via voice.
  required: false
  type: list
slots:
  description: Map of slot names and their values (see [slot lists](https://rhasspy.readthedocs.io/en/latest/training/#slots-lists)). Referenced as `$name` in your sentence templates.
  required: false
  type: map
train_timeout:
  description: Number of seconds after the last `EVENT_COMPONENT_LOADED` has been received to [re-train Rhasspy](#re-training).
  required: false
  type: float
  default: 1.0
{% endconfiguration %}

## Speech to Text Platform

The `rhasspy` integration works with Home Assistant's native [speech to text component](https://www.home-assistant.io/components/stt). It simply forwards the recorded WAV data to Rhasspy's `/api/speech-to-text` endpoint and returns the transcription.

```yaml
# Example configuration.yaml entry
# This will use the api_url from the rhasspy provider.
stt:
  - platform: rhasspy
```

{% configuration %}
api_url:
  description: URL of your Rhasspy server's web API.
  required: false
  type: string
  default: http://localhost:12101/api/
{% endconfiguration %}

## New Voice Commands

You can add new voice commands and intents to `rhasspy` entirely on your device! (Hint: you can even [add your own words](#custom-words))

Like the [conversation](/integrations/conversation/) integration, `rhasspy` works together with [`intent_script`](/integrations/intent_script) to trigger actions in your Home Assistant. For example, the following configuration snippet creates a voice command that will make Home Assistant tell you the temperature:

{% raw %}
```yaml
rhasspy:
  intent_commands:
    LivingRoomTemperature:
      - command: what is the temperature in the living room

intent_script:
  LivingRoomTemperature:
    speech:
      text: It is currently {{ states.sensor.temperature }} degrees in the living room.
```
{% endraw %}

After [training Rhasspy](#re-training), you can now say "what is the temperature in the living room" and have Home Assistant response with speech while handing the `LivingRoomTemperature` intent. You can also send this same sentence to your Home Assistant's `conversation/process` service.

Each intent in the `intent_commands` configuration must contain exactly one of the following parameters:

{% configuration %}
command:
  description: Single [voice command](#voice-command-language)
  required: false
  type: string
commands:
  description: List of [voice commands](#voice-command-language)
  required: false
  type: list
command_template:
  description: Single [jinja2 template](https://www.home-assistant.io/docs/configuration/templating/) that generates one or more [voice commands](#voice-command-language)
  required: false
  type: string
command_templates:
  description: List of [jinja2 template](https://www.home-assistant.io/docs/configuration/templating/) that generates one or more [voice commands](#voice-command-language)
  required: false
  type: list
{% endconfiguration %}

Additionally, you may supply additional data that will be given to the intent when it's recognized:

{% configuration %}
data:
  description: Map of slot names and values for the recognized intent.
  required: false
  type: map
data_template:
  description: Map of slot names and [jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/). Slot values in the recognized intent will have the rendered values.
  required: false
  type: map
{% endconfiguration %}

`command` and `commands` are literal voice commands in Rhasspy's [voice command language](#voice-command-language). `command_template` and `command_templates`, however, are [jinja2 templates](https://www.home-assistant.io/docs/configuration/templating/) that are rendered for each entity in a specific domain or from a list of entity ids. For example:

{% raw %}
```yaml
rhasspy:
  intent_commands:
    LockDoor:
      - command_template: "lock [the] ({{ speech_name }}){name}"
        data_template:
          entity_id: "{{ entity.entity_id }}"
        include:
          domains:
            - lock
lock:
  - platform: ...
    name: door_1
  - platform: ...
    name: door_2
```
{% endraw %}

This `command_template` will be rendered for each entity in the `lock` domain in your `configuration.yaml`. The template will receive three parameters:

* `speech_name` - the [cleaned name](#entity-names) of the entity
* `friendly_name` - the friendly name of the entity
* `entity` - the entity's [state object](https://www.home-assistant.io/docs/configuration/state_object/) when it was loaded

For the lock example above, the `command_template` will be rendered twice to produce the equivalent `commands`:

```yaml
- "lock [the] (door one){name} (:){entity_id:lock.door_1}"
- "lock [the] (door two){name} (:){entity_id:lock.door_2}"
```

(Note: the `(:)` syntax is Rhasspy's way of attaching "unspoken" metadata to a voice command)

If you say "lock door one", Rhasspy will generate a `LockDoor` intent with `name` and `entity_id` slots set to "door one" and "lock.door_1" respectively. You can use Home Assistant's [`intent_script`](/integrations/intent_script) component to do something with this intent:

{% raw %}
```yaml
intent_script:
  LockDoor:
    speech:
      text: "Locking {{ name }}."
    action:
      service: lock.lock
      data_template:
        entity_id: {{ entity_id }}
    
```
{% endraw %}

### Voice Command Language

Rhasspy's [voice command language](https://rhasspy.readthedocs.io/en/latest/training/#sentencesini) allows you to capture many different ways of expressing a voice command in a compact but readable form. Besides describing word choices, you can also annotate your voice command with [tags](https://rhasspy.readthedocs.io/en/latest/training/#tags) that determine what ends up in the recognized intent's slots.

The following syntax is available:

* `[optional words]` - words may or may not be spoken
* `(alternative | choice | set)` - exactly one of the words will be spoken
* `$slot_name` - name of a [slot](#slots) whose values should included here as an alternative
* `(...){tag_name}` - tags the value in parentheses. This will show up in the recognized intent with `tag_name` as the slot name

Note that you can combine syntax, so `[the | an | a]` will optionally be either "the", "an", or "a". Use parentheses to group words to avoid ambiguity, e.g. `(the dog) | (that cat)`.

You can use `:` in words and tags to *substitute* what was literally spoken (left side of `:`) with something you want in the recognized intent (right side of `:`). This is usually done for numbers, ids, etc. For example, if you want to say "set kitchen fan speed to medium", you might write a voice command like this:

```yaml
rhasspy:
  intent_commands:
    SetFanSpeed:
      -command: "set (kitchen fan){entity_id:fan.kitchen} speed to (medium){speed:50}"
```

{% raw %}
When the `SetFanSpeed` intent is fired, it will have `entity_id` and `speed` slots set to "fan.kitchen" and "50" (both strings), respectively. You can convert `speed` to an integer in a Home Assistant template with something like `{{ speed|int }}`
{% endraw %}

### Slots

You can list slot names and values in your `rhasspy` configuration and then reference them in voice commands as `$slot_name`. This is equivalent to putting the slot values into an `(alternative | choice | set)`, but is faster and more convenient for large sets of items. For example:

```yaml
rhasspy:
  slots:
    colors:
      - red
      - green
      - blue
```

You can now use `$colors` in a voice command like "set the light to ($colors){color}".

### Custom Words

Need to say a word that Rhasspy doesn't know or that you want to pronounce differently? No problem! Just edit the `custom_words` parameter:

```yaml
rhasspy:
  custom_words:
    moogles: "M UW G AH L Z"
```

The pronunciation of moogles (M UW G AH L Z) was created by visiting the "Words" tab in the Rhasspy web interface at http://YOUR-RHASSPY-SERVER:12101. You can use this interface to look up existing word pronunciations and guess new ones. See  the [custom words documentation](https://rhasspy.readthedocs.io/en/latest/training/#custom-words) for more details.

## Built-in Voice Commands

The `rhasspy` integration generates voice commands for all of Home Assistant's [built-in intents](#built-in-intents). This is done by catching the `EVENT_COMPONENT_LOADED` event for specific domains and entities. `rhasspy` uses *your friendly entity names* in these commands, so they're personalized to your Home Assistant!

Voice commands are automatically generated for:

* the `light` domain and `group.all_lights`
* the `cover` domain and `group.all_covers`
* the `switch`, `binary_sensor`, `sensor`, `camera`, `fan`, `media_player` and `automation` domains

You can [change these domains/entities](#controlling-voice-command-generation) or create entirely [new voice commands/intents](#new-voice-commands). Examples of the built-in voice commands are listed below by intent.

### Turn On/Off and Toggle

| Intent           | Example                   |
|------------------|---------------------------|
| `HassTurnOn`     | turn on the FRIENDLY_NAME |
| `HassTurnOff`    | FRIENDLY_NAME off         |
| `HassTurnToggle` | toggle all lights         |
| `HassOpenCover`  | open FRIENDLY_NAME        |
| `HassCloseCover` | close all covers          |


### Get Device State

| Intent           | Example                     |
|------------------|-----------------------------|
| `IsDeviceOn`     | is FRIENDLY_NAME on         |
| `IsDeviceOff`    | are all lights off          |
| `IsDeviceOpen`   | is FRIENDLY_NAME open       |
| `IsDeviceClosed` | is the FRIENDLY_NAME closed |
| `IsDeviceState`  | is the sun set              |

Example responses:

* "Yes. FRIENDLY_NAME is on."
* "No. FRIENDLY_NAME is closed."
* "Yes. The sun is below horizon."

### Set a Timer

| Intent     | Example                            |
|------------|------------------------------------|
| `SetTimer` | set a timer for five minutes       |
| `SetTimer` | set a timer for an hour and a half |

When the timer elapses, a `TimerReady` intent in generated.

### Run Automations

| Intent                   | Example                                 |
|--------------------------|-----------------------------------------|
| `TriggerAutomation`      | run automation FRIENDLY_NAME            |
| `TriggerAutomation`      | execute FRIENDLY_NAME                   |
| `TriggerAutomationLater` | in five minutes run FRIENDLY_NAME       |
| `TriggerAutomationLater` | run automation FRIENDLY_NAME in an hour |

`rhasspy` uses the `alias` of your automations as their friendly names:

```yaml
automation:
  - alias "Order 66"
    trigger:
      ...
    action:
      ...
```

With the configuration above, you can say "execute order 66" to run the automation.

### Manipulate Shopping List

You must have at least one item in `shopping_list_items` to be able to add items:

```yaml
rhasspy:
  shopping_list_items:
    - apples
    - bananas
```

| Intent                      | Example                      |
|-----------------------------|------------------------------|
| `HassShoppingListAddItem`   | add ITEM to my shopping list |
| `HassShoppingListLastItems` | what is on my shopping list  |

### Controlling Voice Command Generation

Automatic voice command generation can be finely tuned by including/excluding [specific intents](#built-in-intents), or even disabled entirely, with the `make_intent_commands` parameter.

Include only turn on/off commands:

```yaml
rhasspy:
  make_intent_commands:
    include:
      - HassTurnOn
      - HassTurnOff
```

Just exclude timer commands:

```yaml
rhasspy:
  make_intent_commands:
    exclude:
      - SetTimer
      - TriggerAutomationLater
```

Don't automatically generate *any* voice commands (only those in `intent_commands`):

```yaml
rhasspy:
  make_intent_commands: false
```

### Intent Filters

The `intent_filters` parameter controls which domains and entities are included or excluded when auto-generating commands for a specific intent. For example:

```yaml
rhasspy:
  make_intent_commands: true
  intent_filters:
    HassTurnOn:
      include:
        entities:
          - my_special_entity
      exclude:
        domains:
          - switch
```

will exclude switches from having "turn on..." commands auto-generated, and will include the entity with id `my_special_entity`.

### Entity Names

`rhasspy` uses the friendly names of your entities in voice commands. These names may not be compatible with Rhasspy's speech recognition system, so the integration attempts to "clean" names before training your Rhasspy server. These cleaning steps are:

1. Dashes (`-`) and underscores (`_`) are replaced with a space
2. Numbers are replaced with words ("65" becomes "sixty five")

Before cleaning a name, the `rhasspy` integration checks `name_replace.entities` for a matching entity id and manually cleaned name. For example:

```yaml
rhasspy:
  name_replace:
    light.light_1: "living room lamp"
```

You can override the cleaning behavior using `name_replace.regex`. This is a list, where each item is a map with [regular expression](https://docs.python.org/3/library/re.html) keys and replacement values. The default behavior looks like this:

```yaml
rhasspy:
  name_replace:
    regex:
      - "[-_]": " "
```

Each item in the `name_replace.regex` is run in order on the name, so you can build on previous substitutions.

### Numbers in Entity Names

The `rhasspy` integration will automatically replace numbers in entity names with words using the [num2words library](https://pypi.org/project/num2words/). Unfortunately, Greek and Swedish are not supported. For Swedish, Danish number words are used instead. For Greek, English number words substituted.


## Built-in Intents

`rhasspy` handles all of [Home Assistant's built-in intents](https://developers.home-assistant.io/docs/en/intent_builtin.html), including `HassTurnOn`, `HassTurnOff`, `HassToggle`, `HassOpenCover`, `HassCloseCover`, `HassLightSet`, `HassShoppingListAddItem`, and `HassShoppingListLastItems`.

The `rhasspy` integration also defines several *new* intents to help you ask questions about your devices, trigger automations, and set timers. These intents are automatically handled (see `handle_intents` parameter), and those with speech output can be customized using [response templates](#response-templates).

### Rhasspy Intents

* `IsDeviceOn`
    * Reports whether a device is [currently on or not](#intent-states) via speech
    * intent slots
        * `name` - name of device
    * response slots
        * `entity` - [state object](https://www.home-assistant.io/docs/configuration/state_object/) of device
        * `states` - list of state names that are "on" (from [intent state names](#intent-state-names))
* `IsDeviceOff`
    * Reports whether a device is [currently off or not](#intent-states) via speech
    * response slots
        * `entity` - [state object](https://www.home-assistant.io/docs/configuration/state_object/) of device
        * `states` - list of state names that are "off" (from [intent state names](#intent-state-names))
* `IsCoverOpen`
    * Reports whether a cover is [currently open or not](#intent-states) via speech
    * response slots
        * `entity` - [state object](https://www.home-assistant.io/docs/configuration/state_object/) of cover
        * `states` - list of state names that are "open" (from [intent state names](#intent-state-names))
* `IsCoverClosed`
    * Reports whether a cover is [currently closed or not](#intent-states) via speech
    * response slots
        * `entity` - [state object](https://www.home-assistant.io/docs/configuration/state_object/) of cover
        * `states` - list of state names that are "closed" (from [intent state names](#intent-state-names))
* `IsDeviceState`
    * Reports a device's current state via speech
    * slots
        * `name` - name of device
    * response slots
        * `entity` - [state object](https://www.home-assistant.io/docs/configuration/state_object/) of device
        * `state` - state name from user's question
* `TriggerAutomation`
    * Triggers an automation by name and responds via speech
    * intent slots
        * `name` - name of automation to trigger
    * response slots
        * `automation` - [state object](https://www.home-assistant.io/docs/configuration/state_object/) of automation that was triggered
* `TriggerAutomationLater`
    * Sets a timer and generates an `TriggerAutomation` intent when it elapses
    * intent slots
        * `name` - name of automation to trigger
        * `seconds` - number of seconds to wait (in addition to `minutes`, `hours`)
        * `minutes` - number of minutes to wait (in addition to `seconds`, `hours`)
        * `hours` - number of hours to wait (in addition to `seconds`, `minutes`)
* `SetTimer`
    * Sets a timer and generates an `TimerReady` intent when it elapses
    * intent slots
        * `seconds` - number of seconds to wait (in addition to `minutes`, `hours`)
        * `minutes` - number of minutes to wait (in addition to `seconds`, `hours`)
        * `hours` - number of hours to wait (in addition to `seconds`, `minutes`)
* `TimeReady`
    * Generated from `SetTimer` intent after timer has elapsed
    
### Response Templates

`rhasspy`'s `IsDeviceOn`, `IsDeviceOff`, `IsCoverOpen`, `IsCoverClosed`, `IsDeviceState`, and `TriggerAutomation` intents all respond via speech. The `response_templates` parameter can be used to override the default responses. The templates receive different variables [depending on the intent](#rhasspy-intents).

{% raw %}
```yaml
rhasspy:
  response_template:
    IsDeviceOn: "{% if entity.state in states %}Affirmative{% else %}Negative{% endif %}."
```
{% endraw %}

### Intent State Names

`rhasspy`'s query intents need to determine whether a device is on/off or open/closed in order to answer yes or no. By default, a device's `state` is compared with the following values per intent:

| Intent          | State Name |
|-----------------|------------|
| `IsDeviceOn`    | "on"       |
| `IsDeviceOff`   | "off"      |
| `IsCoverOpen`   | "open"     |
| `IsCoverClosed` | "closed"   |

If you have a device that you want to be considered "on" in a particular state (for example, "active"), use the `intent_states` parameter:

```yaml
rhasspy:
  intent_states:
    IsDeviceOn:
      - "on"
      - "active"
```

## Supported Languages

Rhasspy supports the following languages/locales. Support comes from publicly available models and datasets. If you'd like a new language to be supported, consider [donating your voice](https://voice.mozilla.org)!

* U.S. English (`en-US`)
* Dutch (`nl-NL`)
* French (`fr-FR`)
* German (`de-DE`)
* Greek (`el-GR`)
* Italian (`it-IT`)
* Brazilian Portuguese (`pt-BR`)
* Russian (`ru-RU`)
* Spanish (`es-ES`)
* Swedish (`sv-SV`)
* Vietnamese (`vi-VI`)

## Re-Training

Rhasspy needs to be trained before it can recognize your voice commands. This usually only takes a few seconds, but may take a minute or more if you have a large number of possible commands (tens of millions) or a slow device.

When Home Assistant starts the `rhasspy` integration, it will automatically contact your Rhasspy server and train your profile. If you need to re-train Rhasspy without restarting Home Assistant, use the `rhasspy.train` service in Home Assistant or visit Rhasspy's web interface at http://YOUR-RHASSPY-SERVER:12101 where `YOUR-RHASSPY-SERVER` is the hostname of your Rhasspy server (e.g., `localhost`).

## The Zen of Rhasspy

* Built on free/open source software
* No online account required
* No data ever leaves your device
* Works for the majority, customizable by the minority

## Complete Configuration

Below is the complete default configuration for `rhasspy`.

{% raw %}
```yaml
rhasspy:
  api_url: "http://localhost:12101/api"
  custom_words:
  handle_intents:
    - IsDeviceOn
    - IsDeviceOff
    - IsCoverOpen
    - IsCoverClosed
    - DeviceState
    - TriggerAutomation
    - TriggerAutomationLater
    - SetTimer
    - TimerReady
  intent_commands:
    HassTurnOn:
      - command_templates:
          - "turn on [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}}"
          - "turn [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} on"
    HassTurnOff:
      - command_templates:
          - "turn off [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}}"
          - "turn [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} off"
    HassToggle:
      - command_templates:
          - "toggle [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}}"
          - "[the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} toggle"
    HassShoppingListAddItem:
      - command_templates:
          - "add [the|a|an] ({{ clean_item_name }}){name:{{ item_name }}} to [my] shopping list"
    HassShoppingListLastItems:
      - command_templates:
          - "what is on my shopping list"
          - "[list | tell me] [my] shopping list [items]"
    HassOpenCover:
      - command_templates:
          - "open [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}}"
          - "[the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} open"
    HassCloseCover:
      - command_templates:
          - "close [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}}"
          - "[the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} close"
    HassLightSet:
      - command_templates:
          - "set [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} [to] ($light_color){color}"
          - "set [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} [brightness [to] | to brightness] ($number_0_100){brightness}"
          - "set [the] brightness [of] [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} [to] ($number_0_100){brightness}"
          - "set [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} [to] (maximum){brightness:100} brightness"
    DeviceState:
      - command_templates:
          - "what (is | are) [the|a|an] (state | states) of [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}}"
          - "what [is | are] [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} (state | states)"
    IsDeviceOn:
      - command_templates:
          - "(is | are) [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} on"
    IsDeviceOff:
      - command_templates:
          - "(is | are) [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} on"
    IsCoverOpen:
      - command_templates:
          - "(is | are) [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} open"
    IsCoverClosed:
      - command_templates:
          - "(is | are) [the|a|an] ({{ speech_name }}){name:{{ friendly_name }}} open"
    IsDeviceState:
      - commands:
          - "is it sunset"
          - "has the sun set [yet]"
        data:
          name: sun
          state: below_horizon
    TriggerAutomation:
      - command_templates:
          - "(run | execute | trigger) [program | automation] ({{ speech_name }}){name:{{ friendly_name }}}"
    TriggerAutomationLater:
      - command_templates:
          - "(run | execute | trigger) [program | automation] ({{ speech_name }}){name:{{ friendly_name }}} (in | after) <SetTimer.time_expr>"
          - "(in | after) <SetTimer.time_expr> (run | trigger) [program | automation] ({{ speech_name }}){name:{{ friendly_name }}}"
    SetTimer:
      commands:
        - ...
        - "time_expr = ((<hour_expr> [[and] <minute_expr>] [[and] <second_expr>]) | (<minute_expr> [[and] <second_expr>]) | <second_expr>)"
        - "set [a] timer for <time_expr>"
  intent_filters:
    HassTurnOn:
      include:
        domains:
          - light
          - switch
          - camera
          - fan
          - media_player
        entities:
          - group.all_lights
    HassTurnOff:
      include:
        domains:
          - light
          - switch
          - camera
          - fan
          - media_player
        entities:
          - group.all_lights
    HassToggle:
      include:
        domains:
          - light
          - switch
          - camera
          - fan
          - media_player
        entities:
          - group.all_lights
    HassOpenCover:
      include:
        domains:
          - cover
        entities:
          - group.all_covers
    HassCloseCover:
      include:
        domains:
          - cover
        entities:
          - group.all_covers
    HassLightSet:
      include:
        domains:
          - light
        entities:
          - group.all_lights
    DeviceState:
      include:
        domains:
          - light
          - switch
          - binary_sensor
          - sensor
          - cover
        entities:
          - group.all_lights
          - group.all_covers
    IsDeviceOn:
      include:
        domains:
          - light
          - switch
          - camera
          - fan
          - media_player
        entities:
          - group.all_lights
    IsDeviceOff:
      include:
        domains:
          - light
          - switch
          - camera
          - fan
          - media_player
        entities:
          - group.all_lights
    IsCoverOpen:
      include:
        domains:
          - cover
        entities:
          - group.all_covers
    IsCoverClosed:
      include:
        domains:
          - cover
        entities:
          - group.all_covers
    TriggerAutomation:
      include:
        domains:
          - automation
    TriggerAutomationLater:
      include:
        domains:
          - automation
  intent_states:
    IsDeviceOn:
      - "on"
    IsDeviceOff:
      - "off"
    IsCoverOpen:
      - "open"
    IsCoverClosed:
      - "closed"
  language: "en-US"
  make_intent_commands: true
  name_replace:
    - "[_-_]": " "
  register_conversation: true
  response_templates:
    IsDeviceOn: "{{ 'Yes' if entity.state in states else 'No' }}. {{ entity.name }} {{ 'are' if entity.name.endswith('s') else 'is' }} on."
    IsDeviceOff: "{{ 'Yes' if entity.state in states else 'No' }}. {{ entity.name }} {{ 'are' if entity.name.endswith('s') else 'is' }} off."
    IsCoverOpen: "{{ 'Yes' if entity.state in states else 'No' }}. {{ entity.name }} {{ 'are' if entity.name.endswith('s') else 'is' }} open."
    IsCoverClosed: "{{ 'Yes' if entity.state in states else 'No' }}. {{ entity.name }} {{ 'are' if entity.name.endswith('s') else 'is' }} closed."
    IsDeviceState: "{{ 'Yes' if entity.state == state else 'No' }}. {{ entity.name }} {{ 'are' if entity.name.endswith('s') else 'is' }} {{ state.replace('_', ' ') }}."
    DeviceState: "{{ entity.name }} {% 'are' if entity.name.endswith('s') else 'is' %} {{ entity.state }}."
    TimerReady: "Timer is ready."
    TriggerAutomation: "Triggered {{ automation.name }}."
  slots:
    light_color:
      - black
      - blue
      - brown
      - gray
      - green
      - pink
      - purple
      - violet
      - red
      - yellow
      - orange
      - white
    number_0_100:
      - zero:0
      - ...
      - one hundred:100
  shopping_list_items:
  train_timeout: 1.0
```
{% endraw %}
