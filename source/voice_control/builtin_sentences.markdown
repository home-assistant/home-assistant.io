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

### Vacuum

- *return rover to base*
- *start rover*

### Lists

- *Add bread to my shopping list*
- *Add decorating christmas tree to my december chores list*
  - needs a todo list name "december chores"
- *add clean out garage to weekend list*
  - needs a todo list named "Weekend"

## Date and time

- *what time is it?*
- *what's the date?*

## Timers

Timers created with Assist are voice timers. They are separate from [Timer helper entities](/integrations/timer/) and do not create `timer.*` entities that you can use in dashboards, scripts, or automations.

A voice timer belongs to the Assist device where you start it. The device must support handling timer events. If it does not, Assist responds that the device does not support timers.

### Starting

- *set a timer for 5 minutes*
- *5 minute timer*
- *set a 20 minute timer for pizza*
- *set a timer for 1 hour and 3 minutes*
  - Break it up into hours, minutes, and seconds instead of using a technical term like *set a timer for 63 minutes*. 

### Cancelling

- *cancel timer*
  - can't cancel multiple timers yet
- *cancel 5 minute timer*
- *cancel pizza timer*
- *cancel kitchen timer*
  - Must have been set by a voice satellite in the kitchen

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

Unlike regular voice timers, delayed commands cannot be canceled or modified.

- *Turn off the lights in the living room in 5 minutes*
- *Pause TV in 10 minutes*
- *Open the blinds in 5 minutes*

## Aborting

- *Nevermind*: If you triggered the wake word by mistake and want to stop Home Assistant from listening

## Troubleshooting

{% details "Assist answers “Sorry, I couldn't understand that”" %}

<h3 class="no_toc">Symptom</h3>

Assist answers "Sorry, I couldn't understand that".

#### Description

The **Home Assistant** {% term "conversation agent" %} only understands sentences that match one of its built-in sentences for your language, or one of your own sentences. A small change in the wording can stop a sentence from matching. The community adds new sentences all the time, and there are too many to list them all on this page.

#### Resolution

To find a sentence that works in your language, follow these steps.

1. Test the sentence:
   - Go to {% my tools_assist title="**Settings** > **Tools** > **Assist**" %}.
   - Select your language, enter the sentence, and select **Parse sentences**.
   - If the result shows **No intent matched**, Assist doesn't understand this sentence. For more on the sentence parser, refer to [Test a sentence per language without voice](/voice_control/troubleshooting/#test-a-sentence-per-language-without-voice-without-executing-commands).
2. Look at the tested sentences for your language.
   - On GitHub, open the [tests](https://github.com/OHF-Voice/intents/tree/main/tests) folder, and then the folder of your language. For example, `en` for English.
   - Each folder in it is named after an {% term intent %}. For example, `HassTurnOn` turns things on, and `HassLightSet` changes the brightness or color of lights.
   - Open a file in the folder of the intent. Each file tests one kind of sentence. For example, `area_domain.yaml` tests sentences with an area and a kind of entity, like *turn on the lights in the kitchen*.
   - The area and entity names in the test files are only examples. Use the names from your home instead.
3. To see all the sentences that Assist understands for an intent, open the same intent folder in the [sentences](https://github.com/OHF-Voice/intents/tree/main/sentences) folder of your language.
   - For example, `HassTurnOn/area_domain.yaml` contains these sentences, among others:

     ```yaml
     - "<turn> on [<all>] [<the>] {area} <light>"
     - "(light up|illuminate) [<the>] {area}"
     ```

   - () mean alternative elements.
   - [] mean optional elements.
   - {} mean a list, like the names of your areas.
   - &lt;&gt; mean an expansion rule. For these English examples, refer to the [English expansion rules](https://github.com/OHF-Voice/intents/tree/main/rules/en).
   - The syntax is explained in detail in the [template sentence syntax documentation](https://contributors.home-assistant.io/translate/voice/template-syntax/).
4. Rephrase your sentence to match one of these sentences, and test it again, as in step 1.
   - Result: The sentence parser shows the intent and the entities that your sentence targets.
5. If none of the built-in sentences fits, add your own sentence. For the steps, refer to [Create your own sentences](/voice_control/custom_sentences/).

{% enddetails %}

{% details "Assist answers “Sorry, I am not aware of any device called …”" %}

<h3 class="no_toc">Symptom</h3>

Assist answers "Sorry, I am not aware of any device called …", with the name that you used. For an area, it answers "Sorry, I am not aware of any area called …".

#### Description

Assist understood the sentence, but no {% term entity %} or {% term area %} in Home Assistant has the name that you used.

#### Resolution

1. Use the name of the entity or area exactly as it's defined in Home Assistant.
2. If you call it by another name, add that name as an alias. For the steps, refer to [Create aliases](/voice_control/aliases/).
3. Say the sentence again.
   - Result: Assist does what you asked.

{% enddetails %}

{% details "Assist answers “Sorry, … is not exposed”" %}

<h3 class="no_toc">Symptom</h3>

Assist answers "Sorry, … is not exposed", with the name of the entity.

#### Description

Assist found the {% term entity %}, but the entity isn't exposed to Assist. Assist can only control entities that you expose to it.

#### Resolution

1. Expose the entity to Assist. For the steps, refer to [Exposing entities to Assist](/voice_control/voice_remote_expose_devices/).
2. Say the sentence again.
   - Result: Assist does what you asked.

{% enddetails %}

## More sentences

You can extend the [built-in sentences](https://github.com/home-assistant/intents/tree/main/sentences) or [add your own](/voice_control/custom_sentences) to trigger any action in Home Assistant.
