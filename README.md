# Kiribati Football website (kiri.football)

Next.js 14 site for the Kiribati Islands Football Federation. News, teams, fixtures, competitions, partners and the Executive Board come from Airtable. The shop pulls live from the WOVN Shopify store. Until Airtable is connected (or while a table is empty), the site uses the built-in content in `lib/content.js`, so it works from the first deploy.

No terminal needed for any of the steps below.

## 1. GitHub and Vercel

1. Create an empty GitHub repository, click **uploading an existing file**, and drag in everything inside the project folder.
2. In Vercel: **Add New > Project**, import the repository, click **Deploy**.

## 2. Airtable

1. Create a base called **Kiribati Football** and import each CSV in the `airtable` folder as its own table (**Add or import > CSV file**). Table names must match the file names exactly: `News`, `Fixtures`, `Players`, `Competitions`, `Standings`, `Partners`, `Board`.
2. After importing, set these field types:
   - Long text: `Body` (News), `Description` and `Gallery URLs` (Competitions), `Bio` (Board)
   - Date (ISO): `Date` (News, Fixtures)
   - Number: `Home Score`, `Away Score` (Fixtures); `Number` (Players); `Pos`, `P`, `W`, `D`, `L`, `GF`, `GA`, `Pts` (Standings); `Order` (Competitions, Partners, Board)
   - Checkbox: `Featured` (News) and every `Hidden` field
   - Optional attachment fields: `Image` (News, Competitions), `Logo` (Competitions, Partners), `Gallery` (Competitions), `Photo` (Players, Board)
3. Create a token at airtable.com/create/tokens with scope `data.records:read` and access to this base. Copy the base ID from the base URL (starts with `app`).
4. In Vercel > Project > **Settings > Environment Variables**, add `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID`, then **Redeploy**.

Edits in Airtable appear on the site within about 10 minutes. Tick **Hidden** to take any row off the site without deleting it.

### How the tables work

- **News**: `Body` uses a blank line for a new paragraph, `## ` for a subheading, `- ` for bullets, `> ` for a quote, `**bold**` and `[link](https://...)`. Leave `Slug` blank to generate it from the title, and don't change it once a story is live.
  - **Republished articles** (e.g. Oceania Football Center): fill in `Author`, `Source Name` and `Source URL`. The article then shows the author, a link to the original at the top, a "Read the original" box at the end, and tells search engines the original is the main copy. Paste the full article into `Body`.
- **Fixtures**: `Team` is `mens`, `womens`, `futsal` or `youth` for national teams, or a competition's slug (e.g. `kiff-pro-league`) for domestic matches. Leave scores empty for upcoming matches.
- **Players**: `Team` as above. `Position` should be `Goalkeeper`, `Defender`, `Midfielder` or `Forward` (players without one are listed as outfield players). `Note` shows under the name, e.g. "Captain" or "Golden Boot". Rows with a `Role` (e.g. Coach) are listed as staff.
- **Competitions**: one row per competition. `Slug` is the end of the page address (`/competitions/police-cup`). `Teams` is a comma-separated list; if empty, the teams in the league table are used. `Gallery URLs` takes one image link per line, or attach photos to `Gallery`.
- **Standings**: one row per team per competition. `Competition` must match the competition's slug. Goal difference is worked out for you.
- **Partners**: `Role` shows under the logo, e.g. "Official Kit Supplier".
- **Board**: `Order` sets the running order on the About page.

**Images:** a URL field (`Image URL`, `Logo URL`, `Photo URL`) always wins over an attachment. For photos that should stay up permanently, upload them to `public/images` on GitHub and use `/images/filename.jpg`. Airtable attachment links expire after a couple of hours, so they can briefly show as missing on pages that haven't been visited for a while.

Edited in code: national team names and intros in `lib/teams.js`; honours, milestones and regional associations in `lib/content.js`; email, social links and shop link in `lib/site.js`.

## 3. Contact form

The form on `/contact` sends to marketing@kiri.football through the KIFF Zoho mailbox.

1. In Zoho Mail, go to **My Account > Security > App Passwords** and create an app password for "kiri.football website".
2. In Vercel environment variables, add:
   - `ZOHO_SMTP_USER` = `marketing@kiri.football`
   - `ZOHO_SMTP_PASSWORD` = the app password
   - `ZOHO_SMTP_HOST` = only if the Zoho account isn't on the US data centre: `smtp.zoho.eu` (EU), `smtp.zoho.com.au` (Australia) or `smtp.zoho.in` (India)
3. Redeploy and send a test message.

Links such as `/contact?topic=Volunteering` open the form with that topic already chosen. Messages arrive with the sender as the reply-to address, so you can reply directly.

## 4. Shop

Products come from the **Kiribati Islands Football Federation** collection on shop.wovn.club. Prices show in the visitor's currency for the countries set up in Shopify Markets (UK, EU, US & Canada, Australia), and in GBP everywhere else. This works without any setup; if prices ever stop converting, create a Storefront API token in Shopify (**Settings > Apps > Develop apps** or the Headless channel) and add it to Vercel as `SHOPIFY_STOREFRONT_TOKEN`.

## 5. Move kiri.football from Wix to Vercel

Do this once the Vercel site looks right at its `.vercel.app` address. The switch usually takes effect within an hour, occasionally up to 48 hours.

**Before you start:** in Wix, go to **Domains > kiri.football > Manage DNS records** and take a screenshot of every record. The MX, TXT (SPF, DKIM, Zoho verification) and any CNAME records for email must stay exactly as they are, or marketing@kiri.football and the other Zoho mailboxes will stop receiving mail.

**Step 1: add the domain in Vercel**
1. Vercel > Project > **Settings > Domains**.
2. Add `kiri.football`. When asked, also add `www.kiri.football` and choose to redirect it to `kiri.football` (or the other way round, whichever you prefer).
3. Vercel shows the records it needs. They are normally:
   - **A** record, host `@`, value `76.76.21.21`
   - **CNAME** record, host `www`, value `cname.vercel-dns.com`

   If Vercel shows different values, use Vercel's.

**Step 2: point the domain at Vercel (in Wix)**
1. Wix > **Domains** > kiri.football > **Manage DNS records**.
2. Edit the existing **A** record for `@` (kiri.football) to Vercel's value. Delete any other A records for `@`.
3. Edit the **CNAME** for `www` to Vercel's value.
4. **Don't touch** the MX, TXT or email-related CNAME records.
5. Save. If Wix asks to disconnect the domain from the Wix site, say yes: the domain stays registered with Wix, it just stops showing the Wix site.

**Step 3: check**
1. Back in Vercel's Domains page, both domains should turn green ("Valid Configuration") and Vercel adds the SSL certificate automatically.
2. Visit https://kiri.football and https://www.kiri.football.
3. Send a test email to marketing@kiri.football to confirm mail still arrives.
4. Once everything works, cancel the Wix premium site plan (not the domain) if you no longer need it. The domain renewal stays with Wix unless you transfer it.

Old Wix links (`/blog`, `/national-teams`, `/partnerships`, `/leagues-competitions-clubs`) redirect to the matching new pages, and `/te-eitei` redirects to `/teams/mens`.

## 6. Google Analytics

GA4 (`G-CZJCTM6Y8C`) is already built in and starts recording as soon as the site is live on its domain. Page views between pages are tracked automatically by GA4's enhanced measurement (check **Admin > Data streams > Enhanced measurement > Page changes based on browser history events** is on). To change or remove the ID, edit `gaId` in `lib/site.js`.
