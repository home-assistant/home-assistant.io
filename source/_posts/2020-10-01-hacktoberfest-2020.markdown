---
title: "Hacktoberfest 2020"
description: "It is October and Hacktoberfest started! Home Assistant participates again this year, and you?"
date: 2020-10-01 00:00:00
date_formatted: "October 1, 2020"
author: Franck Nijhof
author_twitter: frenck
categories: Community
og_image: /images/blog/2020-10-01-hacktoberfest-2020/social.png
---

<img src='/images/blog/2020-10-01-hacktoberfest-2020/social.png' class='no-shadow'>

October has started, which means: [Hacktoberfest][hacktoberfest]!

Hacktoberfest is a worldwide, month-long celebration of open source. An event
open to everyone. Whether you’re a developer, student learning to code,
documenter, designer, you can help drive the growth of open source projects,
like Home Assistant.

By participating in Hacktoberfest, and by contributing four GitHub pull
requests, you will earn either a free t-shirt or, new this year, have a
tree planted. All backgrounds and skill levels are encouraged to complete the
Hacktoberfest challenge.

Just like all other years, Home Assistant participates in Hacktoberfest.

## What to work on?

So, you’ve decided to earn yourself that free Hacktoberfest t-shirt? Great!
We've collected a bunch of tasks/suggestions/bugs that we'd love to get
some help on. You can find those by filtering/searching for issues with
the [`hacktoberfest` label][all].

- **[Core Hacktoberfest issues][core]**
  
  For example, help us migrate
  [unittest tests to pytest style test][testcase] functions or lend a hand with
  using as many references as possible
  in the [configuration flow translations][translations].

- **[Frontend Hacktoberfest issues][frontend]**
  
  We could use some help with [moving all `paper-dialogs` to `ha-dialogs`][paper].

- **[Documentation Hacktoberfest issues][docs]**

  [Find and fix broken links][links] on our website or help to complete the
  addition of the [right IoT Class to every integration][class].

Or view all our Hacktoberfest issues across [all Home Assistant projects][all].

Additionally, we recently held the [month of "What the heck?!"][wth-blog]. During
this month a lot of suggestions and annoyances got reported by our community.
While, those topic may not be approved as a change yet, it might be a great
source of inspiration to contribute something the community wants. Check out
the [WTH community forum posts][wth].

## But, I'm not a developer?!

If you are not a developer, new to git, GitHub or open source in general,
documentation can be a great way to get started. A relatively easy way to
contribute, is by reviewing the documentation of integrations you use or are
familiar with, checking if everything is still up to date and is free of
spelling/grammar mistakes.

Every single documentation page on our website has a "Edit this page on GitHub",
on the top right corner. Using that link, you can change the text on that page
and provide a suggestion for improvement.

On our Community forum, there is a good, step-by-step, guide on how this works:
[Editing the Documentation and Creating a Pull Request on GitHub][docs-how-to].

So, what are you waiting for? Sign-up on the [Hacktoberfest][hacktoberfest]
website and start hacking! If you have any questions, please, drop by on our
[Discord chat server](/join-chat). We have dedicated developer channels and
are happy to assist you.

Happy Hacktoberfest 🎉

[all]: https://github.com/search?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Ahacktoberfest+org%3Ahome-assistant
[brands]: https://github.com/home-assistant/brands/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Ahacktoberfest
[class]: https://github.com/home-assistant/home-assistant.io/issues/14661
[core]: https://github.com/home-assistant/core/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Ahacktoberfest
[docs-how-to]: https://community.home-assistant.io/t/editing-the-documentation-and-creating-a-pull-request-on-github/9573
[docs]: https://github.com/home-assistant/home-assistant.io/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Ahacktoberfest
[frontend]: https://github.com/home-assistant/frontend/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Ahacktoberfest
[hacktoberfest]: https://hacktoberfest.digitalocean.com/
[links]: https://github.com/home-assistant/home-assistant.io/issues/14663
[paper]: https://github.com/home-assistant/frontend/issues/6138
[testcase]: https://github.com/home-assistant/core/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Aunittest.TestCase
[translations]: https://github.com/home-assistant/core/issues/40578
[wth-blog]: https://www.home-assistant.io/blog/2020/08/18/the-month-of-what-the-heck/
[wth]: https://community.home-assistant.io/c/what-the-heck/52/l/latest?order=votes
