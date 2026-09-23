# The Dispatch

A Times-style front page for a single writer. Static site (Eleventy) + an
in-browser editor (Decap CMS) so publishing a new piece is: write, hit
Publish, wait about a minute, done. No code touched after setup.

## What's here

- `src/index.njk` — the front page. One lead story + three secondary
  slots, pulled automatically from whatever you've written.
- `src/archive.njk` — Back Issues: every article ever published, plain list.
- `src/articles/*.md` — the articles themselves. Five dummy/placeholder
  ones are included so the layout isn't empty on first load.
- `src/admin/` — the Decap CMS editor, served at `/admin/` once deployed.
- `src/css/style.css` — all the styling; nothing else needs touching for
  a visual tweak (colors/fonts are set as CSS variables at the top).

## One-time setup

### 1. Push this to GitHub
Create a new (private is fine) GitHub repo and push this folder's
contents to it.

### 2. Connect it to Netlify
In Netlify: **Add new site → Import an existing project → GitHub**, pick
the repo. Build command and publish directory are already set in
`netlify.toml` (`npm run build`, `_site`) — Netlify will pick them up
automatically. Deploy.

### 3. Turn on the editor (Identity + Git Gateway)
The `/admin/` editor needs Netlify's Identity service to know who's
allowed to log in and write to the repo on your behalf:
- Site settings → **Identity** → Enable Identity.
- Under Identity → **Registration**, set it to **Invite only** (so
  random people can't sign up as editors).
- Identity → **Services** → enable **Git Gateway**.
- Identity → **Invite users** → invite your own email. You'll get an
  email to set a password.

### 4. Log in and edit
Go to `yoursite.netlify.app/admin/`, log in with the account you just
invited. You'll see the "Articles" collection listed — open any of the
five placeholder entries to rewrite it, or click **New Article** to add
one. Publishing there commits straight to the repo; Netlify rebuilds and
your change is live in roughly a minute.

## Editing an article

Each article has:
- **Title** — the headline.
- **Date** — controls ordering (newest first) everywhere.
- **Standfirst / deck** — the one- or two-sentence line under the
  headline.
- **Author** — defaults to "The Dispatch"; change or leave.
- **Lead story on front page?** — check this on exactly one article at a
  time to make it the big lead story. If nothing is checked, the most
  recent article becomes the lead automatically.
- **Image** — optional; upload straight from the editor. Leaving it
  blank is fine, the layout adjusts.
- **Body** — the article text, normal formatting (bold, italic, links,
  paragraphs).

The front page always shows: the lead story, plus the three next most
recent articles. Everything else is still fully published at its own
address and listed on **Back Issues** — nothing is deleted, it just
falls off the front page as you write more.

## Local development (optional)

Only needed if you want to preview changes on your own machine before
they're live:

```
npm install
npm run dev
```

This serves the site at `http://localhost:8080`. The `/admin/` editor
won't work locally without extra setup (it needs Identity/Git Gateway,
which are Netlify-hosted) — use the deployed `/admin/` for actual
editing.

## Placeholder content

All five seed articles are dummy content, including the images (from
picsum.photos, a free placeholder-image service — replace them with
your own via the Image field). Nothing needs deleting; overwrite each
one as you go, or delete the ones you don't want and add new ones from
scratch.
