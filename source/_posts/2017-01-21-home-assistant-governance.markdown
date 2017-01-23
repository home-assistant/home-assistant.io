---
layout: post
title: "Home Assistant Governance"
description: "Protecting Home Assistant for all, now and into the future"
date: 2017-01-21 15:05:00 -0800
date_formatted: "January 21, 2017"
author: Paulus Schoutsen
author_twitter: balloob
comments: true
categories: Organisation
---

The Home Assistant project and community has seen enormous growth in the last three years. Many volunteers work tirelessly everyday to give you all the awesomeness that you see today. Much more work is involved than many people realize. Beyond simply coding Home Assistant, volunteers continually maintain related projects, update documentation, post examples, author blog posts, and moderate the forums and chat. This is something that we want to keep safe and functional, even as we grow.

Starting today we are announcing a few initiatives to help protect our users, contributors and community members.

## Code of Conduct

More people are getting to know and love Home Assistant every day and our community keeps growing. Our community consists of people from all over the world with different backgrounds and we want Home Assistant to be a place where everyone can feel at home. To help with this we're introducing a Code of Conduct. The Code of Conduct describes what type of behavior is unacceptable, how we will enforce it and where to report incidents.

Moving forward this Code of Conduct will be active for all projects within the Home Assistant organisation.

[Read the Code of Conduct][coc]

[coc]: /developers/code_of_conduct/

## Contributor License Agreement

Moving forward we will also require that all contributors to any project have electronically signed a contributor license agreement (CLA). We have adopted the CLA that GitHub uses for their projects. Currently we have no plans to retroactively require a CLA for previous contributions, only those going forward.

Until a signed CLA is on file your pull request will not be reviewed or accepted. When you open a new pull request, if you do not have a CLA on file, our helpful bot will walk you through the steps to complete the process.

**We intend to require an electronically signed contributor licensing agreement for all contributors beginning with our next release (0.37), currently scheduled for release on Saturday, January 28th, 2017 (one week from today).** The CLA is being added to all repositories today.

A CLA is difficult to describe but GitHub did an excellent job so this next section is taken from [https://cla.github.com][gh-cla]:

### What is a Contributor License Agreement?

A Contributor License Agreement, known as a CLA, asks contributors to confirm that:

1. Anyone can use your contributions anywhere, for free, forever.
2. Your contributions do not infringe on anyone else's rights.

The GitHub CLA helps ensure the smooth operation and usability of the open source projects that we maintain.

### Why is a CLA necessary?

It depends on the jurisdiction, but in the United States, contributions are owned by the author or their employer. When the contribution is accepted, the project becomes a bundle of derivative works. The agreement of all contributors are necessary to maintain distribution of the complete project and to any licensing agreement.

### Isn’t that the purpose of an open source license?

Most open source licenses deal with use of the original code, and don’t refer to contributions, or derivatives of the original.

### How does a CLA protect a project?

If the owner of a contribution decides that they don’t want the contribution to be part of the project or in any given distribution, the law is on their side. The project, contributors, and users may be subject to legal action. This may require payment of damages and could prevent further usage or contributions until the matter is resolved.

Even when there is no legal pursuit, too much ambiguity can jeopardize or doom a project by preventing those that can’t risk legal action from getting involved.

### Why does it seem like only “corporate” projects have a CLA?

There are many projects without corporate ownership that use a CLA or even a copyright assignment–jQuery and Eclipse, for example. However, it is true that projects with financial backing tend to be at a higher risk of becoming a target, so they may have a lower tolerance for legal ambiguity.

### What makes the GitHub CLA different from other CLAs?

The GitHub CLA does not include benign terms that serve no purpose, nor does it include pernicious terms that try to grab more rights than necessary to protect users of the project. Accepting the CLA is a low-overhead click-through when making a pull request, and it only needs to be accepted on the first contribution to a project or organization.

[gh-cla]: https://cla.github.com/

## Security requirements

With more collaborators involved with Home Assistant we are also exposing ourselves to more risk as more people have write access. As such we taking the following steps.

 1. As of November 3rd, 2016, all collaborators have been required to have 2 factor authentication (2FA) enabled on their GitHub account.
 2. Going forward, we will do an audit from time to time and strip collaborators from write access if they haven't contributed for a while. This is in no sense meant to boot people, and you are absolutely eligible to get it back in the future when you wish start contributing again.

## Licensing

We will now ensure that a `LICENSE.md` file exists in all projects under the Home Assistant organization and is an [OSI approved open source license](https://opensource.org/licenses) or a [Creative Commons](https://creativecommons.org) license.

### Code License

The chosen license for all code projects under the Home Assistant organization is The MIT License.

The core Home Assistant project has been licensed under the MIT license since almost the beginning of the project and is the most chosen license for open source projects.

Wikipedia has this to say about it:

> The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology (MIT). As a permissive license, it puts only very limited restriction on reuse and has therefore an excellent license compatibility. The MIT license permits reuse within proprietary software provided that all copies of the licensed software include a copy of the MIT License terms and the copyright notice. The MIT license is also compatible with many copyleft licenses, such as the GNU General Public License (GPL); MIT licensed software can be integrated into GPL software, but not the other way around.

### Documentation License

All content on home-assistant.io and all other documentation/asset projects under the Home Assistant organization will be licensed under the Creative Commons License, specifically the [Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

## Crediting contributors

We have now mostly automated updating the [Credits](/developers/credits/) page so that contributors get their attribution more quickly.

## In closing

We hope you understand that our desire with these changes is only to help protect the amazing community that has been built around Home Assistant. If you have any questions, please contact me via email, Twitter or Gitter.
