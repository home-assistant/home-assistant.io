![inuit.css](http://inuitcss.com/img/content/logo.png)

# inuit.css – v5.0

inuit.css is a powerful little framework designed for _serious_ developers.

It is a Sass based, Object Oriented framework that is full of objects and
abstractions. inuit.css provides little-to-no design which means no undoing
things, no deleting CSS and no adhering to other peoples’ design decisions.

inuit.css is built on a [BEM](http://bem.info/)-style naming convention and
honed based on [work done by Nicolas Gallagher](https://gist.github.com/1309546).

inuit.css is ideally suited to designers who want to focus on the creative and
not code, and developers who understand the need for abstraction and an OO
approach.

inuit.css gives you design patterns, not design decisions. It features nestable,
fluid grids; a double-stranded heading hierarchy; sprites; buttons and a lot,
_lot_ more.


**Use inuit.css if:**

* You need a powerful library of objects and abstractions.
* You understand/appreciate the value of OO code and the need for scalability
  and reuse.
* You are a confident/competent developer comfortable with OOCSS and Sass, as
  well as familiarity with OO principles in general.

**Do not use inuit.css if:**

* You need a framework that supplies design (I’d recommend
  [Bootstrap](http://twitter.github.com/bootstrap/) for that).

## Browser support

inuit.css is a modern framework for modern browsers. It takes advantage of
[normalize.css](http://necolas.github.com/normalize.css/) and global
`box-sizing:border-box;` (optional). As such, inuit.css is intended for **IE8**
and above only.  The last release to support IE7 was
[v4.1.5](https://github.com/csswizardry/inuit.css/archive/v4.1.5.zip).

## The developer

There are a million-and-one different CSS frameworks out there so this rather
cringeworthy section is an attempt to validate inuit.css and give it some
credibility…

I am [Harry Roberts](http://hry.rbrts.me), I am a 22 year old developer and
front-end architect from the UK. I work as a Senior UI Developer for
[BSkyB](http://en.wikipedia.org/wiki/BSkyB) where it is my job to build scalable
front-ends, write internally used CSS frameworks and libraries, and to architect
CSS and front-end builds.

I [write](http://csswizardry.com), [tweet](http://twitter.com/csswizardry) and
[speak](http://speakerdeck.com/u/csswizardry/) about OOCSS, scalable CSS,
maintainability, working in large teams, CSS performance, CSS architecture and a
whole lot more.

inuit.css is the result of years of my specialism in CSS (as CSS is all I do).
It is a collection of design patterns, objects, and abstractions that have been
refined and bulletproofed over hours of development across an array of projects
of varying sizes. inuit.css is the result of hundreds of hours of work all
condensed into one powerful little framework.

## Installation

**Requires Sass 3.2**

inuit.css v5.0+ is designed to be even more advanced than previous versions of
your favourite CSS framework! inuit.css’ core library is now intended to be used
as a submodule which means you can always get inuit.css’ latest updates without
ever having to touch a line of library code.

This works by having this, the inuit.css core library, and the
[inuit.css-web-template](https://github.com/csswizardry/inuit.css-web-template).
The web template is very un-opinionated and simply houses your site, however
you wish to build it. It has a `css/` directory which contains your
project-specific variables and any stylesheets that extend inuit.css, as well as
housing inuit.css as an updatable submodule. Any of inuit.css’ default settings
can be simply overridden from the web template which means you no longer have to
edit a single line of the framework (which in turn means that incorporating
inuit.css updates is as simple as a `$ git pull`).

### Install via command line (recommended)

The command line install of inuit.css is _incredibly_ simple:

    $ git clone --recursive git@github.com:csswizardry/inuit.css-web-template.git your-project-folder
    $ cd your-project-folder
    $ ./go

What we are doing here is cloning an instance of the inuit.css-web-template and
its submodules (that’s what the `--recursive` does) into a directory which you
specify. Next we `cd` into that directory and run [our `go` script](https://github.com/csswizardry/inuit.css-web-template/blob/master/go).
This script (courtesy of [Nick Payne](http://twitter.com/makeusabrew)) simply
removes the web template’s Git instance and replaces it with a fresh one for
your project, whilst also maintaining your inuit.css submodule.

### Install via zip

Though not tested, using inuit.css from its GitHub zip _should_ be fairly
simple. Using inuit.css from zipped source does mean that you can’t update
inuit.css as a submodule, but you may well be able to drop fresh zip files into
the `css/inuit.css/` directory provided you don’t edit any library code.

Firstly you need to download [the web template](https://github.com/csswizardry/inuit.css-web-template)
zip and unpack it to a location of your choosing. Next you need to download the
inuit.css core zip and unpack that into `css/inuit.css/` in your new project.

## Getting started

Once you have your project set up, you should be looking at a directory
structure a little like this:

    your-project-folder/
        css/
            inuit.css/
            _vars.scss
            style.scss
            watch
        index.html

Your CSS directory holds everything you need to get building:

* Everything in `css/inuit.css/` is library code which **should not** be edited.
  If you `cd` into here you should see that this submodule will initially be on
  `(no branch)`, this is because the submodule points at a specific commit and
  not a branch. You can treat this directory like any other Git project which
  means you can `$ git checkout master` to get your submodule on the most
  up-to-date stable version of inuit.css. To grab any new changes simply run
  `$ git pull` on the `master` branch.
* `_vars.scss` contains any project variables you need, as well as any overrides
  you wish to make to the inuit.css library. It also houses feature switches to
  turn inuit.css’ objects and abstractions on and off as you need them.
* `style.scss` is your master Sass stylesheet which will concatenate any other
  stylesheets from inuit.css and your extensions when it is compiled.
* `watch` is a handy little script which makes it easier for you to watch your
  Sass from the command line; instead of the `$ sass --watch ...` command, you
  now need only type `$ ./watch` and the script will do the rest. Running this
  will compile your project into `style[.min].css`.

## How inuit.css works

inuit.css works in ‘layers’, not dissimilar to [SMACSS](http://smacss.com/). The
principle of inuit.css’ architecture is levels of extension; each layer of code
extends the layer below.

We start in `inuit.css/generic/`, with our most generic, low-level styling,
things like a clearfix, [normalize.css](http://necolas.github.com/normalize.css/),
our reset and any shared styling like margins (for vertical rythmn).

On top of that we lay our base styles, found in `inuit.css/base/`; these are
things like unclassed headings, what our basic forms look like, how simple
tables appear. These are all design-free HTML elements that you can extend with
your own styles later on.

Next up, in `inuit.css/objects/`, we have our objects and abstractions; these
are all scaffolding type constructs that hold no styling, but do heavy lifting.
In here we have things like
[the media object](http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/),
[the nav abstraction](http://csswizardry.com/2011/09/the-nav-abstraction/) and
other unstyled objects that you can use to construct design patterns _without_
design (that bit is left up to you).

Finally we have our helper classes (though these live back in the `inuit.css/generic/`
directory); these are things like margin helper classes, width classes and other
‘style trumps’ which need to take precedence over any things that have gone
before them. These classes are used to modify your objects and abstractions on a
case-by-case basis.

## Overriding inuit.css’ defaults

inuit.css has a file called `_defaults.scss` which contains all the Sass
variables required for the library to compile without failing. These variables
are preset because Sass will error without them, however they are **not** set in
stone, and you are encouranged to override and experiment with them.

It is tempting to modify their vaules in the inuit.css submodule but this is
**not** the correct method for modifying inuit.css, and in doing so you will
prevent yourself from being able to update inuit.css’ core library. The correct
proceedure is to redefine that variable in `_vars.scss` found in the inuit.css
web template. Let’s take an example…

In inuit.css’ `_defaults.scss` we find the following:

    $h1-size:           36px!default; // .alpha
    $h2-size:           30px!default; // .beta
    $h3-size:           24px!default; // .gamma
    $h4-size:           20px!default; // .delta
    $h5-size:           16px!default; // .epsilon
    $h6-size:           14px!default; // .zeta

Let’s say we want our `h1`s to be `48px` and not `36px`; instead of modifying
the value of `$h1-size` here, pop open your `_vars.scss` file and add this in
the overrides section:

    /*------------------------------------*\
        $OVERRIDES
    \*------------------------------------*/
    /**
     * Place any variables that should override inuit.css’ defaults here.
     */
    $h1-size:48px;

Now when you compile your CSS, inuit.css will know to ignore its preset value
(that is what `!default` is for) in favour of your own. By doing things this way
you can change the values that inuit.css uses without having to modify inuit.css
itself, thus leaving it free to be updated. 

In this file you will also see your feature switches needed to turn objects and
abstractions on and off. Feature switches are only preset for objects and
abstractions; you will **not** initially find switches for things like
`$debug-mode` in here, but they can be turned on and off by adding an override
as outlined above, e.g.:

    /*------------------------------------*\
        $OVERRIDES
    \*------------------------------------*/
    /**
     * Place any variables that should override inuit.css’ defaults here.
     */
    $h1-size:48px;
    $push:true;
    $palm-push:true;

This file can also house any custom variables that you wish to use in extending
inuit.css, as covered in the next section.

## Extending inuit.css

inuit.css is, by design, a very design-free framework. This means that the
style and design of your site is left entirely up to you (as it should be).
Because inuit.css gives you lots of customisable foundations, you need to add
the final layer: UI.

How you go about this step is largely left up to you, but it is common practice
to create another directory in `css/` called `ui/`, leaving you with:

    your-project-folder/
        css/
            inuit.css/
            ui/
            _vars.scss
            style.scss 
            watch
        index.html

In here you can place your own Sass files which hold your UI’s CSS, for example:

    ui/
        _contact-form.scss
        _footer.scss
        _pricing-table.scss

You then include these from `style.scss`, like so:

    /**
     * She’s all yours, cap’n... Begin importing your stuff here.
     */
    //@import "ui/example";
    @import "ui/footer";
    @import "ui/contact-form";
    @import "ui/pricing-table";

Now, when you run `$ ./watch`, `style.scss` will be calling:

1. Your variables
2. The inuit.css core library (as outlined above)
3. Your custom/UI CSS

…and building a concatenated stylesheet out of it all. Neat, huh?!

## Footprint

Out of the box, inuit.css is very small, however it is **imperative** that you
only ever deploy a minified version of your compiled stylesheet to your live
environment. inuit.css compiles stright to minified output by default, but you
can change this in `watch` if you have a build process in place.

It is also **highly** recommended that you enable gzip compression on any text
assets being served from your site; doing so will further reduce the footprint
of inuit.css and greatly help your site’s performance.

## Documentation

There are no official docs for inuit.css because the code _is_ the
documentation. Everything is heavily commented with example HTML. If you
struggle with anything please tweet at [@inuitcss](http://twitter.com/inuitcss)
and/or [open an issue](https://github.com/csswizardry/inuit.css/issues) and I’ll
try help out and use your feedback to improve the documentation.

It is strongly encouraged that you thoroughly read the source of inuit.css’
files, particularly `_inuit.scss`.

### Demos

Although there are no docs as such, there is [a dedicated inuit.css jsFiddle
account](http://jsfiddle.net/user/inuitcss/fiddles/) which houses plenty of
demos of various aspects of the framework.

### Development

You can keep up-to-date with upcoming features, suggestions and fixes by looking
at the [inuit.css Trello board](https://trello.com/board/inuit-css/50a16487543dea585502f3d2).

## Looking for a little LESS?

[Peter Wilson](http://twitter.com/pwcc) and
[Nicolas Carlo](https://twitter.com/nicoespeon) are maintaining a LESS port of
inuit.css: check [the GitHub repo](https://github.com/peterwilsoncc/inuit.css).

## Using Compass?

[Stephen Way](http://github.com/stephenway) is maintaining a Compass port of
inuit.css: check [the GitHub repo](https://github.com/stephenway/compass-inuit).

## Test-drive

If you would like to try inuit.css out before you download anything there is a
compiled version [on jsFiddle](http://jsfiddle.net/inuitcss/a6yS3/) that you
are encouraged to fork and play with. Refer back to
[the source here on GitHub](https://github.com/csswizardry/inuit.css/blob/master/inuit.css/_inuit.scss)
for documentation.

## As used by

* [BSkyB](http://en.wikipedia.org/wiki/BSkyB)
* [pr.ofile.me](http://pr.ofile.me)
* [Lukas Bestle](http://lu-x.me)
* [Matthew Tyas](http://matthewtyas.com/)

### Using inuit.css?

If you use inuit.css on a live project then [tweet at me](http://twitter.com/inuitcss)
and I’ll send you some inuit.css stickers!

## Support inuit.css

If you use and/or like inuit.css, perhaps you might consider [supporting it
through Gumroad](http://gum.co/nOoht).

## Credits

inuit.css, although produced and maintained by one developer, could not have
been possible without inspiration and work from an array of other people.

* **[Nicole Sullivan](https://twitter.com/stubbornella)** for her work on OOCSS
* **[Jonathan Snook](https://twitter.com/snookca)** for his work on SMACSS
* **[Nicolas Gallagher](https://twitter.com/necolas)** for his work on numerous
  CSS things
* **[Bryan James](https://twitter.com/WengersToyBus)** for the inuit.css logo
* **[Nick Payne](https://twitter.com/makeusabrew)** for helping with v5.0’s
  submodule architecture.

And probably more…

## License

Copyright 2013 Harry Roberts

Licensed under the Apache License, Version 2.0.

---

**inuit.css is the most powerful little framework out there, and it’s ready to
go!**
