# Kiribati National Football Team website (Te Eitei)

Next.js 14 site for the Kiribati Islands Football Federation, built to replace the Wix site at kiri.football. News, fixtures, players and partners come from Airtable, and the shop pulls live from the WOVN Shopify store; until Airtable is connected the site uses the built-in content in `lib/content.js`, so it works from the first deploy.

No terminal needed for any of the steps below.

## 1. Put it on GitHub

1. On github.com, create a new repository (e.g. `kiribati-football`). Leave it empty.
2. Click **uploading an existing file**.
3. Open the `kiribati-football` folder on your computer, select everything **inside** it, and drag it into the upload box. (Drag the contents, not the folder itself.)
4. Commit.

## 2. Deploy on Vercel

1. vercel.com > **Add New** > **Project** > import the repository.
2. Vercel detects Next.js. Click **Deploy**. Nothing else to configure.

## 3. Connect Airtable

1. In Airtable, create a base called **Kiribati Football**.
2. Import each CSV from the `airtable` folder as its own table (**Add or import > CSV file**). The table names must be exactly: `News`, `Fixtures`, `Players`, `Partners`, `Board`.
3. Change these field types after importing:
   - News: `Date` to Date (ISO), `Body` to Long text, `Featured` and `Hidden` to Checkbox. Optionally add an `Image` attachment field.
   - Fixtures: `Date` to Date (ISO), `Home Score` and `Away Score` to Number.
   - Players: `Number`, `Caps`, `Goals` to Number, `Hidden` to Checkbox. Optionally add a `Photo` attachment field.
   - Board: `Bio` to Long text, `Order` to Number, `Hidden` to Checkbox. Optionally add a `Photo` attachment field.
   - Partners: `Order` to Number, `Hidden` to Checkbox. Optionally add a `Logo` attachment field.
4. Create a token at airtable.com/create/tokens with the scope `data.records:read`, giving it access to the Kiribati Football base.
5. Copy the base ID from the base URL (it starts with `app`).
6. In Vercel > Project > **Settings > Environment Variables**, add `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID`, then **Deployments > Redeploy**.

Edits in Airtable show on the site within about 10 minutes.

### How the content fields work

- **Hidden**: tick to take a row off the site without deleting it.
- **Featured** (News): the featured story leads the homepage. If none is ticked, the newest story leads.
- **Body** (News): blank line = new paragraph. `## ` at the start of a line = subheading. `- ` = bullet. `**bold**` and `[link text](https://...)` also work.
- **Slug** (News): the end of the web address. Leave blank and it's made from the title. Don't change it once a story is live.
- **Images**: an `Image URL` (or `Photo URL` / `Logo URL`) always wins over an attachment. For photos that should stay up permanently, upload the file to `public/images` on GitHub and put `/images/filename.jpg` in the URL field. Attachments work too, but Airtable's attachment links expire after a couple of hours, so a page that hasn't been visited for a while can briefly show a missing image until it refreshes.
- **Fixtures**: leave the scores empty for upcoming matches; they move to Results as soon as scores are added. `Report Link` can be a news link such as `/news/te-eitei-crowned-idc-premier-division-champions`.
- **Board** (About page): one row per Executive Board member. `Order` sets the running order (President first). The section only appears once there's at least one person in it.
- **Players**: rows with a `Role` (e.g. Head coach) are listed as staff. Use `Goalkeeper`, `Defender`, `Midfielder` or `Forward` for `Position` so players are grouped.

### Shop (Shopify)

The shop shows every product in the **Kiribati Islands Football Federation** collection on shop.wovn.club, using Shopify's public collection feed (no API key needed). Add, remove or reorder products in that collection, or change prices and images in Shopify, and the site updates within about 10 minutes. Products are shown in the collection's sort order, and a product shows "Sold out" when no sizes are available. If the store can't be reached, the site falls back to the copy of the four 2027 jerseys in `lib/content.js`.

Edited in code rather than Airtable: site settings (email, social links, shop link) in `lib/site.js`; milestones and honours in `lib/content.js`.

## 4. Point kiri.football at Vercel

1. Vercel > Project > **Settings > Domains** > add `kiri.football` and `www.kiri.football`.
2. Vercel shows the DNS records to add. Add them wherever the domain's DNS is managed (currently Wix).
3. **Keep the Zoho email records** (MX, SPF/TXT, DKIM) exactly as they are, or marketing@kiri.football will stop receiving mail. Only change the A / CNAME records for the website.

Old Wix links (`/blog`, `/national-teams`, `/partnerships`, `/leagues-competitions-clubs`) redirect to the matching new pages.
