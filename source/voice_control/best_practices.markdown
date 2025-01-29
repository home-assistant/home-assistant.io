---
title: Best practices with Assist
related:
  - docs: /voice_control/android
    title: Assist on Android devices
  - docs: /voice_control/apple
    title: Assist on Apple devices
  - docs: /voice_control/thirteen-usd-voice-remote/
    title: Build a 13$ voice remote using an ESPHome device
  - docs: /voice_control/builtin_sentences
    title: Sentences starter kit
  - url: https://www.nabucasa.com/config/
    title: Home Assistant Cloud
  - url: https://voice-pe.home-assistant.io/
    title: Voice Preview Edition
---
There are a few things you should do to get the most out of the voice assistant experience.

Using Assist consists of saying supported commands while targeting exposed devices and entities. So essentially:

- You control what data Assist has access to, and what it can control.
- Every entity in Home Assistant can be exposed or not to Assist.

Some best practices we recommend to have an efficient setup are:

### Expose (the minimum) entities

Learn how in [Exposing your entities to Assist](/voice_control/voice_remote_expose_devices/).

It might be tempting to expose all entities to Assist, but doing so will come with a performance penalty. The more entity names and aliases the parser will have to go through, the more time it will spend matching. And if you’re using a LLM-based conversation agent, it will incur a higher cost per request, due to the larger context size. Only expose the bare minimum you know you are going to use with voice assistants.


### Check names and create aliases 

Assist relies heavily on entity names, domains, and areas. Below you will find tips for tweaking these things to ensure the best experience. On top of exposing the needed data, it is worth noting that you will most likely target entities through areas and floors, like:

- *Turn off the office lights*

So make sure your devices and entities are correctly assigned to areas, and your areas are correctly assigned to floors.
Learn how [here](/voice_control/assign_areas_floors/).

Not having good ways to address entities in common speech will greatly hinder your voice experience with Assist. You can expect to have a hard time asking Assist to “turn on Tuya Light Controller 0E54B1 Light 1”. You should therefore name your devices and entities logically, using a schema such as `<area> [<identifier_or_descriptor>] [<domain>].`

For example, `light.living_room_lamp` might be the entity ID of `Living room lamp`. `Kitchen light` would be enough for the `light.kitchen` if you only have one light fixture in that room.

Note that this convention is only a recommendation, actual naming of your devices and entities might depend on your language or personal preference.

If you ever find yourself mentioning a certain device or entity in a certain way, make sure to [add that as an alias](/voice_control/aliases/), as it would probably be the most natural way to refer to the entity.

Names and aliases also apply to `area`, you need to address area names and aliases in the exact same manner as you would for entities.


### Be aware of language specificity 

If you have set up Home Assistant entity names in English but plan to use Assist in another language, don’t worry. You can add aliases to each entity, allowing them to be named in any language.

English has pretty simple grammar rules, but there are languages where definite articles are pre- or suffixes to words and where nouns have genders or numbers. Language leaders are making efforts to support most such declinations in each language, but they can’t control the stuff that you name. So try to think whether a certain entity having an unarticled name would be called out in a sentence requiring a definite article or vice versa. If so, add that version of the name as an alias as well.

### Check domains and device classes 

Assist leverages domains to define the proper verbs for the action being taken (for example, turning on/off a `light`, or a `fan`, opening/closing a `cover` with a `door` `device_class`, opening/closing a `valve` or locking/unlocking a `lock`.).

It might not bother anyone to have a `switch.main_valve` in the UI instead of a valve, but you can’t ask Assist to open the main valve if the main valve is a switch. If it was a `valve.main_valve`, then the former sentence would have worked without a hitch.

To prevent this, you can use either the [Change device type of a switch integration](/integrations/switch_as_x/) or create virtual entities using [template](/integrations/template/) entities or Generic X (e.g. [generic thermostat](/integrations/generic_thermostat/)).

The same thing applies to some device classes. For example, if you have a `binary_sensor.bedroom_window` with no `device_class` set, you can only ask whether the bedroom window is on, which doesn’t even make sense. To be able to ask if it’s open, you need to set a proper `device_class` to that `binary_sensor`, i.e. window.


## Ready?

Once your devices and entities are correctly 
- Exposed to assist
- Assigned to areas.

It is now time to speak to your device.

To talk to Assist, you can either use your phone or a custom device (and use their microphone and speaker). Check here how to do it on [Android](/voice_control/android/) or [Apple](/voice_control/apple/) devices.

### Some examples to get you started

There are a few example commands to help you get started in [our Sentences starter pack](/voice_control/builtin_sentences/).

If you don't get the right response, we recommend you check the Aliases. Sometimes, different household members may call an entity differently. You may say "TV", whereas someone else may say "Television" 

You can create aliases for exposed entities so that you can target them using different names with Assist. Aliases are available at entity, area, and floor level. Learn how in the [Alias tutorial](/voice_control/aliases/).
