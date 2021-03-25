<div align="center">
<h1>vue-mdx-bundler
<svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" fill="none" viewBox="0 0 32 30" style="margin-left: 15px;vertical-align:top">
  <path fill="currentColor" fill-rule="evenodd" d="M1.254 0L2.56 3.646H0v3.417h3.784l1.514 4.228H0v3.418h6.523l1.514 4.228H0v3.417h9.261l1.515 4.228H0V30h12l-1.224-3.418h9.5L19 30h12.442v-3.418H20.276l1.578-4.228h9.59v-3.417h-8.315l1.578-4.228h6.736V11.29h-5.461l1.577-4.228h3.884V3.646h-2.608L30.194 0H1.254zm27.58 3.646l-1.276 3.417H3.784L2.56 3.646h26.274zM25.98 11.29l-1.275 3.418H6.523L5.298 11.29h20.683zm-2.853 7.646l-1.275 3.417H9.26l-1.224-3.417h15.091z" clip-rule="evenodd"/>
</svg>
</h1>

<p>Compile and bundle your MDX files and their dependencies. FAST.</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

> *WIP* we'll update this readme
> 
> this is a fork of react version of [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) by [kentcdodds.com](https://kentcdodds.com) thanks Kent 🙏
## The problem

You have a string of MDX and various TS/JS files that it uses and you want to
get a bundled version of these files to eval in the browser.

## This solution

This is an async function that will compile and bundle your MDX files and their
dependencies. It uses [esbuild](https://esbuild.github.io/), so it's VERY fast
and supports TypeScript files (for the dependencies of your MDX files). It also
uses [xdm](https://github.com/wooorm/xdm) which is a more modern and powerful
MDX compiler with fewer bugs and more features (and no extra runtime
requirements).

Your source files could be local, in a remote github repo, in a CMS, or wherever
else and it doesn't matter. All `mdx-bundler` cares about is that you pass it
all the files and source code necessary and it will take care of bundling
everything for you.

### FAQ:

<details>
  <summary>
    <strong>
      "What's so cool about MDX?"
    </strong>
  </summary>

[MDX](https://mdxjs.com/) enables you to combine terse markdown syntax for your
content with the power of React components. For content-heavy sites, writing the
content with straight-up HTML can be annoyingly verbose. Often people solve this
using a WSYWIG editor, but too often those fall short in mapping the writer's
intent to HTML. Many people prefer using markdown to express their content
source and have that parsed into HTML to be rendered.

The problem with using Markdown for your content is if you want to have some
interactivity embedded into your content, you're pretty limited. You either need
to insert an element that JavaScript targets (which is annoyingly indirect), or
you can use an `iframe` or something.

As previously stated, [MDX](https://mdxjs.com/) enables you to combine terse
markdown syntax for your content with the power of React components. So you can
import a React component and render it within the markdown itself. It's the best
of both worlds.

</details>

<details>
  <summary>
    <strong>
      "How is this different from <a href="https://github.com/hashicorp/next-mdx-remote"><code>next-mdx-remote</code></a>?"
    </strong>
  </summary>

`mdx-bundler` actually bundles dependencies of your MDX files. For example, this
won't work with `next-mdx-remote`, but it will with `mdx-bundler`:

```md
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo

import Demo from './demo'

Here's a **neat** demo:

<Demo />
```

`next-mdx-remote` chokes on that import because it's not a bundler, it's just a
compiler. `mdx-bundler` is an MDX compiler and bundler. That's the difference.

</details>

<details>
  <summary>
    <strong>
      "How is this different from the mdx plugins for webpack or rollup?"
    </strong>
  </summary>

Those tools are intended to be run "at build time" and then you deploy the built
version of your files. This means if you have some content in MDX and want to
make a typo change, you have to rebuild and redeploy the whole site. This also
means that every MDX page you add to your site will increase your build-times,
so it doesn't scale all that well.

`mdx-bundler` can definitely be used at build-time, but it's more powerfully
used as a runtime bundler. A common use case is to have a route for your MDX
content and when that request comes in, you load the MDX content and hand that
off to `mdx-bundler` for bundling. This means that `mdx-bundler` is infinitely
scalable. Your build won't be any longer regardless of how much MDX content you
have. Also, `mdx-bundler` is quite fast, but to make this on-demand bundling
even faster, you can use appropriate cache headers to avoid unnecessary
re-bundling.

Webpack/rollup/etc also require that all your MDX files are on the local
filesystem to work. If you want to store your MDX content in a separate repo or
CMS, you're kinda out of luck or have to do some build-time gymnastics to get
the files in place for the build.

With `mdx-bundler`, it doesn't matter where your MDX content comes from, you can
bundle files from anywhere, you're just responsible for getting the content into
memory and then you hand that off to `mdx-bundler` for bundling.

</details>

<details>
  <summary>
    <strong>
      "Does this work with Nuxt/Vite/Gridsome/VueCli/etc?"
    </strong>
  </summary>

Totally. It works with any of those tools. Depending on whether your
meta-framework supports server-side rendering, you'll implement it differently.
You might decide to go with a built-time approach (for Gatsby/CRA), but as
mentioned, the true power of `mdx-bundler` comes in the form of on-demand
bundling. So it's best suited for SSR frameworks like Remix/Next.

</details>

<details>
  <summary>
    <strong>
      "Why the dodo bird emoji? 🦤"
    </strong>
  </summary>

Why not?

</details>

<details>
  <summary>
    <strong>
      "Why does this use XDM instead of @mdx-js?"
    </strong>
  </summary>

It has more features, fewer bugs, and no runtime!

</details>

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [The problem](#the-problem)
- [This solution](#this-solution)
  - [FAQ:](#faq)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
    - [files](#files)
    - [xdmOptions](#xdmoptions)
    - [esbuildOptions](#esbuildoptions)
    - [globals](#globals)
  - [Component Substitution](#component-substitution)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```
yarn add vue-mdx-bundler
```

```
npm install --save vue-mdx-bundler
```

## Usage

```typescript
import {bundleMDX} from 'mdx-bundler'

const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo

import Demo from './demo'

Here's a **neat** demo:

<Demo />
`.trim()

const result = await bundleMDX(mdxSource, {
  files: {
    './demo.tsx': `
import * as React from 'react'

function Demo() {
  return <div>Neat demo!</div>
}

export default Demo
    `,
  },
})

const {code, frontmatter} = result
```

From there, you send the `code` to your client, and then:

```jsx
todo
```

Ultimately, this gets rendered (basically):

```html
<header>
  <h1>This is the title</h1>
  <p>This is some description</p>
</header>
<main>
  <div>
    <h1>Wahoo</h1>

    <p>Here's a <strong>neat</strong> demo:</p>

    <div>Neat demo!</div>
  </div>
</main>
```

### Options

#### files

The `files` config is an object of all the files you're bundling. The key is the
path to the file (relative to the MDX source) and the value is the string of the
file source code. You could get these from the filesystem or from a remote
database. If your MDX doesn't reference other files (or only imports things from
`node_modules`), then you can omit this entirely.

#### xdmOptions

This allows you to modify the built-in xdm configuration (passed to
xdm.compile). This can be helpful for specifying your own
remarkPlugins/rehypePlugins.

```ts
bundleMDX(mdxString, {
  xdmOptions(input, options) {
    // this is the recommended way to add custom remark/rehype plugins:
    // The syntax might look weird, but it protects you in case we add/remove
    // plugins in the future.
    options.remarkPlugins = [...(options.remarkPlugins ?? []), myRemarkPlugin]
    options.rehypePlugins = [...(options.rehypePlugins ?? []), myRehypePlugin]

    return options
  },
})
```

#### esbuildOptions

You can customize any of esbuild options with the option `esbuildOptions`. This
takes a function which is passed the default esbuild options and expects an
options object to be returned.

```typescript
bundleMDX(mdxSource, {
  esbuildOptions(options) {
    options.minify = false
    options.target = [
      'es2020',
      'chrome58',
      'firefox57',
      'safari11',
      'edge16',
      'node12',
    ]

    return options
  },
})
```

More information on the available options can be found in the
[esbuild documentation](https://esbuild.github.io/api/#build-api).

It's recommended to use this feature to configure the `target` to your desired
output, otherwise, esbuild defaults to `esnext` which is to say that it doesn't
compile any standardized features so it's possible users of older browsers will
experience errors.

#### globals

This tells esbuild that a given module is externally available. For example, if
your MDX file uses the d3 library and you're already using the d3 library in
your app then you'll end up shipping `d3` to the user twice (once for your app
and once for this MDX component). This is wasteful and you'd be better off just
telling esbuild to _not_ bundle `d3` and you can pass it to the component
yourself when you call `getMDXComponent`.

Here's an example:

```tsx
// server-side or build-time code that runs in Node:
import {bundleMDX} from 'mdx-bundler'

const mdxSource = `
# This is the title

import leftPad from 'left-pad'

<div>{leftPad("Neat demo!", 12, '!')}</div>
`.trim()

const result = await bundleMDX(mdxSource, {
  // NOTE: this is *only* necessary if you want to share deps between your MDX
  // file bundle and the host app. Otherwise, all deps will just be bundled.
  // So it'll work either way, this is just an optimization to avoid sending
  // multiple copies of the same library to your users.
  globals: {'left-pad': 'myLeftPad'},
})
```

```tsx
// server-rendered and/or client-side code that can run in the browser or Node:
todo
```

### Component Substitution

MDX Bundler passes on
[XDM's ability to substitute components](https://github.com/wooorm/xdm#mdx-content)
through the `components` prop on the component returned by `getMDXComponent`.

Here's an example that removes _p_ tags from around images.

```tsx
import * as React from 'react'
todo
<MdxContent components={{p: Paragraph}} />
  
```


## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]



## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/github/workflow/status/koca/vue-mdx-bundler/validate?logo=github&style=flat-square
[build]: https://github.com/koca/vue-mdx-bundler/actions?query=workflow%3Avalidate
[coverage-badge]: https://img.shields.io/codecov/c/github/koca/vue-mdx-bundler.svg?style=flat-square
[coverage]: https://codecov.io/github/koca/vue-mdx-bundler
[version-badge]: https://img.shields.io/npm/v/vue-mdx-bundler.svg?style=flat-square
[package]: https://www.npmjs.com/package/vue-mdx-bundler
[downloads-badge]: https://img.shields.io/npm/dm/vue-mdx-bundler.svg?style=flat-square
[npmtrends]: https://www.npmtrends.com/vue-mdx-bundler
[license-badge]: https://img.shields.io/npm/l/vue-mdx-bundler.svg?style=flat-square
[license]: https://github.com/koca/vue-mdx-bundler/blob/main/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: https://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/koca/vue-mdx-bundler/blob/main/CODE_OF_CONDUCT.md
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[all-contributors-badge]: https://img.shields.io/github/all-contributors/koca/vue-mdx-bundler?color=orange&style=flat-square
[bugs]: https://github.com/koca/vue-mdx-bundler/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/koca/vue-mdx-bundler/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/koca/vue-mdx-bundler/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
<!-- prettier-ignore-end -->



