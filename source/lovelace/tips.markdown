---
layout: page
title: "Lovelace Tips and Tricks"
description: "Helpful tips and tricks for using the Lovelace UI in Home Assistant."
date: 2018-07-23 21:57 +00:00
sidebar: true
comments: false
sharing: true
footer: true
---

The Lovelace UI is a very powerful UI. Here are a few tips and tricks that
might help you when working with Lovelace.

*Have a tip or trick of your own? Click the "Edit this page on GitHub" at the
top of this page to share it with everyone!*

## {% linkable_title Tips & Tricks %}

### {% linkable_title Add your your own image to Lovelace %}

Home Assistant allows you to make files in `<config dir>/www/example_image.jpg` available to Lovelace as  `/local/example_image.jpg`. When you create the `www` directory, you will need to once restart Home Assistant to pick it up. After that, any new file placed in the directory will automatically be available.

Check out [Share the love][sharethelove] for a few great examples of what you can do with lovelace (no affiliation).

### {% linkable_title Disable Click on Elements %}

If you do not want an element to be clickable you can add `pointer-events: none`
to the element's `style:` configuration. This is quite useful when building a
[Picture Elements][picture-elements] card that will be viewed mostly in a
mobile browser. (@Toast)

### {% linkable_title Header Using Panel and Stacks %}

You can create a header by using `panel: true` with nested
[Vertical Stack][vertical-stack] and [Horizontal Stack][horizontal-stack]
cards. See the code [here][header-stacks]. ([@dale3h])

## {% linkable_title Tools %}

We have some amazing users that have created various tools to help you get
started with Lovelace.

### {% linkable_title Lovelace Migration Script %}

The [Lovelace Migration Script][migration-script] by [@dale3h] converts your
current "old UI" configuration to the new Lovelace format. The idea behind
this tool is to help give you something to start playing with right away.

### {% linkable_title Lovelace Config Generator %}

The [Lovelace Config Generator][config-generator] by [@thomasloven] provides
you with the ability to split your Lovelace configuration into multiple files.

### {% linkable_title Lovelace Config Generator (Jinja2 Script) %}

The [Lovelace Jinja2 Script][lovelace-jinja] by [@skalavala] is a simple Jinja2 script that you run in the template editor to generate lovelace configuration based on the entities that are already setup.

[@dale3h]: https://github.com/dale3h
[@thomasloven]: https://github.com/thomasloven
[@skalavala]: https://github.com/skalavala
[config-generator]: https://github.com/thomasloven/homeassistant-lovelace-gen
[header-stacks]: https://gist.github.com/dale3h/37b34aebb0c336ffd5fb877c2651097a
[horizontal-stack]: /lovelace/horizontal-stack/
[migration-script]: https://github.com/dale3h/python-lovelace
[picture-elements]: /lovelace/picture-elements/
[vertical-stack]: /lovelace/vertical-stack/
[lovelace-jinja]: https://sharethelove.io/tools/jinja-magic-scripts
[sharethelove]: https://sharethelove.io/
