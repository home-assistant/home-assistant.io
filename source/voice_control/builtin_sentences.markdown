---
title: Talking to Assist - Sentences starter pack
related:
  - docs: /voice_control/aliases/
    title: Create aliases
  - docs: /voice_control/custom_sentences/
    title: Create your own sentences
  - docs: /voice_control/troubleshooting/
    title: Sentence troubleshooting
  - url: https://github.com/home-assistant/intents/tree/main/sentences
    title: Built-in sentence definitions
  - url: https://github.com/home-assistant/intents/tree/main/responses
    title: Built-in response definitions
  - url: https://contributors.home-assistant.io/translate/voice/template-syntax/
    title: Template sentence syntax documentation
  - url: https://github.com/home-assistant/intents/tree/main/sentences
    title: Sentence test cases
  - docs: /voice_control/best_practices/
    title: Best practices with Assist
---

Home Assistant comes with [built-in sentences](https://github.com/home-assistant/intents/tree/main/sentences) contributed by the community for [dozens of languages](https://contributors.home-assistant.io/translate/voice/languages/).

## Prerequisites

- The entities you want to control with Assist must be [exposed to Assist](/voice_control/voice_remote_expose_devices/).
- When using the names of entities or areas, make sure to use them exactly as they are defined in Home Assistant, or, [create an alias](/voice_control/aliases/).

## Device control

### Turning entities on and off

- *turn on the living room light*
- *turn off ceiling fan*
- *turn on the TV*
- *lock all the doors*
- *open the main door*

### Lights

- *Change kitchen lights brightness to 50%*
- *Set bed light to green*
- *set bed light brightness to 50%*
- *set living room brightness to 50%*
- *set brightness to 50%*
  - Uses area of voice satellite
- *set kitchen lights to red*
- *set lights to red*
  - Uses area of voice satellite
- *turn on the lights in the living room*

### Fans

- *set kitchen fan speed to 50%*
- *kitchen fans 50%*

### Climate

- *what is the temperature in the living room?*
- *set bedroom temp to 21 degrees*
- *set the fan mode to auto*
- *set the bedroom fan mode to low*

### Covers

- *Close the garage door*
- *Open kitchen window*
- *Which curtains are closed*
- *Set bedroom curtain to 50%*

### Scenes and scripts

- *Run stealth mode script*
- *Activate dinner scene*
- *Turn kitchen dinner scene on*

### Media player

- *next item on TV*
- *next track*
- *next track in office*
- *previous track*
- *previous track in office*
- *skip song on the TV*
- *skip track on the TV*
- *skip to the next song on the TV*
- *pause|resume*
  - pauses or resumes music on voice satellite or in current area
- *pause|resume "area" music*
  - pauses or resumes music in area
- *pause|resume "entity"*
  - pauses or resumes music on media player
- *unpause TV*
- *TV unpause*
- *set TV volume to 90 percent*
- *change the TV volume to 90*
- *turn TV volume down to 90 percent*
- *Mute my TV*
- *Unmute the television*
- *volume up*
- *turn up the volume in the living room*

To play media by name, use a media player that can search for the type of media you want to play. [Music Assistant](/integrations/music_assistant/), [Sonos](/integrations/sonos/), and [Jellyfin](/integrations/jellyfin/) support media search for different types of media.

- *play the track Bohemian Rhapsody*
- *play the song Bohemian Rhapsody in the kitchen*

### Vacuum

- *return rover to base*
- *start rover*

To send a vacuum to clean an area, the vacuum must support cleaning areas, and its areas must be mapped to Home Assistant areas. For the steps, refer to [Mapping your vacuum areas to Home Assistant areas](/integrations/vacuum/#mapping-your-vacuum-areas-to-home-assistant-areas).

- *clean the living room*
- *vacuum in here*
  - Uses area of voice satellite
- *clean living room with rover*

### Lawn mower

- *start mowing*
- *start clippy*
  - Starts the lawn mower named "Clippy"
- *dock the mower*
- *stop mowing*
  - Sends the lawn mower back to its dock

### Lists

- *Add bread to my shopping list*
- *check off bread from my shopping list*
- *Add decorating christmas tree to my december chores list*
  - needs a todo list name "december chores"
- *add clean out garage to weekend list*
  - needs a todo list named "Weekend"
- *complete clean out garage on my weekend list*
- *delete clean out garage in my weekend list*

## Weather

- *what's the weather?*
- *what's the weather like in London?*
  - Needs a weather entity named "London"

## Date and time

- *what time is it?*
- *what's the date?*

## Broadcasting

- *broadcast that dinner is ready*
  - Plays the message on all other voice satellites that can play announcements. For example, [Home Assistant Voice Preview Edition](/voice-pe/) can. Analog phones that you connect through [Voice over IP](/integrations/voip/) don't get the message.

## Timers

Timers created with Assist are voice timers. They are separate from [Timer helper entities](/integrations/timer/) and do not create `timer.*` entities that you can use in dashboards, scripts, or automations.

A voice timer belongs to the {% term "voice satellite" %} where you start it. The voice satellite must support timers. For example, [Home Assistant Voice Preview Edition](/voice-pe/) supports them. The Assist dialog in Home Assistant doesn't. If you start a timer where timers aren't supported, Assist responds that the device doesn't support timers.

### Starting

- *set a timer for 5 minutes*
- *5 minute timer*
- *set a 20 minute timer for pizza*
- *set a timer for 1 hour and 3 minutes*
  - Break it up into hours, minutes, and seconds instead of using a technical term like *set a timer for 63 minutes*.

### Cancelling

- *cancel timer*
  - If several timers are running, Assist first looks for a timer of the voice satellite that you talk to. Then it looks in the area of the voice satellite, and then on its floor. If it still finds more than one timer, name the timer, or cancel all timers.
- *cancel 5 minute timer*
- *cancel pizza timer*
- *cancel kitchen timer*
  - Must have been set by a voice satellite in the kitchen
- *cancel all timers*
  - Cancels the voice timers of all voice satellites
- *cancel all kitchen timers*

### Pausing and resuming

- *pause timer*
- *resume timer*

### Adding/Removing Time

- *add 5 minutes to pizza timer*
- *add 5 minutes to kitchen timer*
- *remove 1 minute from timer*
- *remove 1 minute from 5 minute timer*

### Status

- *timer status*
- *how much time is left on pizza timer?*
- *how much time is left on kitchen timer?*
- *how much time is left on 5 minute timer?*

<p class='img'><lite-youtube videoid="v3mNdTsX4J0" videotitle="Voice timers with countdown text and loading bar"></lite-youtube>Timers running on an S3-Box-3B, with countdown text and a loading bar!</p>

To learn how to set this up, refer to the [ESP32-S3-Box-3B tutorial](/voice_control/s3_box_voice_assistant/).

### Combining timers and device control to add a delay

Unlike regular voice timers, delayed commands can't be canceled, paused, or changed. They also work where voice timers aren't supported. For example, they work in the Assist dialog in Home Assistant.

- *Turn off the lights in the living room in 5 minutes*
- *Pause TV in 10 minutes*
- *Open the blinds in 5 minutes*

## Aborting

- *Nevermind*: If you triggered the wake word by mistake and want to stop Home Assistant from listening

## Troubleshooting

The list of supported sentences is constantly being updated for each language. There are so many possible sentences that they cannot be all listed here. To find out what works in your language, follow these steps.

1. If the voice assistant doesn't understand you, you may need to rephrase your sentence a bit. Or check if the {% term entity %} or {% term area %} name is correct for your environment.
2. Take a look at the test sentences:
    - On GitHub, in the [tests](https://github.com/home-assistant/intents/tree/main/tests) folder, open the subfolder for your language.
    - Look through the test files to see the example sentences that have been tested.
    - The second part of the file name shows the {% term intent %}, the first part shows the {% term domain %}. For some {% term domains %}, such as covers, fans, and light, there are specific sentences.
        The other {% term domains %} are covered by the generic *homeassistant_*.

        ![Example of a folder of assistant sentence test files](/images/assist/intents-test-files.png)
        
    - The screenshot below shows sentences used to test the command to turn on the lights. Note that *Living room* here is just a place holder.
        It could be any {% term area %} that you have in your home.

        ![Example of a set of test sentences](/images/assist/assist-test-file-light-turn-on.png)

3. View the sentence definition for the tests:
    - On GitHub, in the [sentences](https://github.com/home-assistant/intents/tree/main/sentences) folder, open the subfolder for your language.
    - Open the file of interest.

        ![Sentences definition for turning on the light](/images/assist/assist-sentence-definition-01.png)

        - () mean alternative elements.
        - [] mean optional elements.
        - &lt;&gt; mean an expansion rule. To view these rules, search for `expansion_rules` in the [_common.yaml](https://github.com/home-assistant/intents/blob/main/sentences/en/_common.yaml) file.
        - The syntax is explained in detail in the [template sentence syntax documentation](https://contributors.home-assistant.io/translate/voice/template-syntax/).
4. View the [sentence definition](https://github.com/home-assistant/intents/tree/main/sentences) for your language.
5. View the [response definition](https://github.com/home-assistant/intents/tree/main/responses)
6. If there are issues when asking for the weather forecast, check the [troubleshooting section](/voice_control/troubleshooting/) to see common errors.

## More sentences

You can extend the [built-in sentences](https://github.com/home-assistant/intents/tree/main/sentences) or [add your own](/voice_control/custom_sentences) to trigger any action in Home Assistant.
