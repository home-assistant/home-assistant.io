---
title: "Introduction to templating"
description: "Understand what templates are, when you need them, and why they are useful in Home Assistant."
related:
  - docs: /docs/templating/where-to-use/
    title: Where to use templates
  - docs: /docs/templating/syntax/
    title: Template syntax
  - docs: /template-functions/
    title: Template functions reference
---

When you want a notification that reads "It is 22°C in the living room" instead of a fixed message, or an automation that fires only when more than three doors are open, you write a template.

A template is a short snippet of code that Home Assistant runs every time it needs a value. Instead of writing a fixed piece of text or a fixed number, you write instructions for how the value should be computed from your home's current data.

Home Assistant's templating is powered by [Jinja2](https://jinja.palletsprojects.com/), a widely used template engine in the Python world. That means you can search the web for Jinja2 examples and most of what you find will work in Home Assistant too. We add many of our own functions on top for reading states, finding entities, working with areas, and similar tasks specific to smart homes.

Because templates are code, this is one of the more technical corners of Home Assistant. It is fair to think of it as a light form of programming. You will write small calculations, learn how to handle text and numbers together, and sometimes run into puzzling error messages. Don't worry, the [Debugging templates](/docs/templating/debugging/) page has your back when that happens.

## You probably don't need templates

Home Assistant is designed to be used through its interface. You can set up {% term devices %}, build {% term automations %}, create dashboards, and manage your whole smart home without ever looking at a configuration file or writing a single line of code. The {% term automation %} editor is powerful enough to handle nearly every real-world scenario, and it is getting better with every release.

So before you invest any time on this page: templates are _not_ required to use Home Assistant. If the visual editors do what you need, you are done. Skip this section with a clear conscience.

Templates are for when you want to go further than the interface alone allows. You might reach for them when:

- You want a notification to say something dynamic, like "The living room is 22°C and the basement is 14°C", using live values from your sensors.
- You need an automation condition that depends on a calculation across several entities, such as "only run if more than three doors are open".
- You are creating a [template entity](/integrations/template/), a {% term sensor %} whose value is computed from other entities.
- You are processing raw data from a REST API, MQTT topic, or command-line output, and need to reshape it into something Home Assistant can use.

If any of those sound like problems you actually have, keep reading. If not, bookmark this page and come back when you need it.

## An example

Imagine you want your phone to tell you the temperature when you come home. A plain notification can only say one thing:

```text
It is warm outside.
```

With a template, you can include the actual temperature from your outdoor sensor:

{% example %}
template: |
  It is {{ states('sensor.outdoor_temperature') }}°C outside.
{% endexample %}

Home Assistant replaces the bit between `{{` and `}}` with the current value every time the notification is sent. You might get:

{% example %}
output: "It is 22.5°C outside."
{% endexample %}

Later that day, when it is cooler, the same template produces:

{% example %}
output: "It is 14.8°C outside."
{% endexample %}

## What you can do with templates

Once you are comfortable with the basics, templates can help you:

- **Read your home's data**. Get the state of any {% term entity %}, its attributes, or information about {% term devices %}, {% term areas %}, and {% term floors %}.
- **Make decisions**. Show one message when someone is home and a different one when nobody is. Trigger an automation only when several conditions line up.
- **Do calculations**. Average values from multiple sensors, convert units, count how many lights are on, or format a number the way you want to see it.
- **Shape text**. Turn raw values into friendly sentences, lists, or table-like summaries for notifications and dashboards.
- **Process incoming data**. Parse JSON from a web API, clean up messy sensor readings, or extract only the bits you need.

## How templates are written

Every template mixes normal text with small pieces of code inside special markers:

- `{{ ... }}` calculates something and inserts the result in the output.
- `{% ... %}` runs logic like [`if` and `for`](/docs/templating/loops-and-conditions/) without adding to the output.
- `{# ... #}` is a note for yourself that does not appear anywhere.

The [Template syntax](/docs/templating/syntax/) page explains these markers in detail.

## Try it yourself

Home Assistant has a built-in **Template editor** that shows the result of a template while you type. It is the fastest way to experiment.

Open it from {% my developer_template title="**Settings** > **Tools** > **Template**" %}. Try pasting this in:

{% example %}
template: |
  It is {{ now().strftime("%A") }}, and the time is {{
    now().strftime("%H:%M") }}.
output: "It is Saturday, and the time is 14:32."
{% endexample %}

You should see a sentence with the current day of the week and time. Change what is inside the quotes to experiment with different formats, and watch the result update as you type.

## Next steps

Pick up from whichever topic is most useful to you:

- Curious where templates show up? Read [Where to use templates](/docs/templating/where-to-use/).
- Want to understand the building blocks? Start with [Template syntax](/docs/templating/syntax/).
- Looking for ready-made examples? Head to [Common template patterns](/docs/templating/patterns/).
- Stuck on something? The [Debugging templates](/docs/templating/debugging/) page can help.
