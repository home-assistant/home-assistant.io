---
title: "Why we use web components and Polymer"
description: "In this blog post I talk about the reasoning to use web components and Polymer."
date: 2016-05-18 00:09:00 +0000
date_formatted: "May 18, 2016"
author: Paulus Schoutsen
author_twitter: balloob
categories: Technology
---

I've been planning to write this post for a while now as we get questions like this a lot: _"Why does Home Assistant use Polymer? Why not React, Redux and what not?"_

It's understandable, Polymer is quite the underdog in the world of web frameworks. A corporate backer does not guarantee popularity or an active community and this shows in the number of projects using Polymer.

Still, [we use Polymer and it's awesome][demo]. To explain why, I'll be referencing the React workflow quite a bit, as they do a lot of things right, and show how it is done in Polymer.

Polymer gives us components for the web, just like React, but based on web standards: [web components], [CSS variables]. These standards don't have wide browser support yet but it's being implemented by every major browser: It's the future. For now they are being polyfilled and that works just fine but in the future the Home Assistant web app will be able to run native in the browsers == fast.

<!--more-->

Polymer does not have the nice developer experience that one can have with React and the [React Dev Tools] but that's a matter of time. The developer tools in every browser have seen a lot of improvements recently and each improvement helps support for web components.

Another major benefit of Polymer for Home Assistant is that we get [material design for free]. The material design components that come with Polymer have a very high quality. Google is using these components themselves and make sure that performance and accessibility using screen readers/keyboards are great. As an open source project, the more we can outsource, the better - so our contributors can focus on the core product: home automation.

What about Flux, data management and interaction between components? It's actually pretty similar to React or any other component based framework. Flux-like architectures work with Polymer just like with React: whenever data changes it will update the attributes of a component which will propagate to the children. For Home Assistant we use [NuclearJS] with our [own Polymer bindings]. For data moving from child to parent the Polymer pattern is using DOM events instead of callbacks but the end result is the same. It is so similar in fact, that it took me only two hours to make a [React Native frontend for on top of our core][ha-rn].

So what about Babel and ES2015? Also this is covered. Each web component exists of a HTML template and a JavaScript class to back it. Think of the HTML template as the render method in React. In Home Assistant we have the HTML templates import one another and have a separate chain for the JavaScript classes backing each component. This allows us to use Babel and NPM modules for the JavaScript part ([more info here][tools-js]). This does however come with the downside of other JS based frameworks: the browser blocks any painting while the JavaScript is being parsed instead of upgrading the website incrementally. This, however, is something we take for granted right now and hope that module bundlers will be able to solve this for us eventually. Tree shaking is a very promising improvement in this space.

Most of this blog post has been comparing Polymer to React. In many ways Polymer is similar to React but it is not as far evolved yet. I like React but I do not see it as a technology that will be around forever. Given the trend of previous popular JS frameworks, React will probably get replaced by another framework that works even better. Web components however will be here forever as they are part of the HTML standard. And this gives us peace of mind at the virtual Home Assistant headquarters: we do not have to be afraid of having to rewrite our frontend just to stay relevant or because people don't want to include another dependency just to run this legacy piece.

So there it is, the reason why we use Polymer.

[web components]: https://www.w3.org/standards/techs/components#w3c_all
[CSS variables]: https://www.w3.org/TR/css-variables/
[React Dev Tools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
[NuclearJS]: https://optimizely.github.io/nuclear-js/
[own Polymer bindings]: http://paulusschoutsen.nl/blog/2015/07/using-polymer-with-flux-and-a-global-app-state/
[ha-rn]: https://github.com/balloob/home-assistant-react-native-ios
[tools-js]: https://github.com/home-assistant/home-assistant-polymer#building-the-app
[material design for free]: https://elements.polymer-project.org/browse?package=paper-elements
[demo]: /demo

