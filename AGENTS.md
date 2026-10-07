<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application rules
- Keep the wedding invitation as a single public content route, with same-page anchors for ceremony, photos and RSVP, because these are sections of one invitation.
- Store the wedding photographs in public/photos and reference them through src/lib/photos.ts, so the site works locally and on any host.
- Keep invitation styling in global semantic tokens and Button variants, because the selected visual direction must stay consistent across controls and sections.
- Use direct WhatsApp and telephone RSVP contacts and a Google Calendar link with the confirmed Kenya start time; do not invent stored attendance or an event duration.
