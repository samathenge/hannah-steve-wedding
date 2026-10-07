import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { photos } from '@/lib/photos';

// Set this to the published address (for example 'https://hannah-steve.lovable.app') so that
// WhatsApp and other apps can show the photo when the link is shared. Leave it empty until then.
const SITE_URL = 'https://hannah-steve-wedding.vercel.app';

const venue = 'A.I.C Mwariki Church, Pipeline, Nakuru, Kenya';
const invitation = 'With the blessings of God and our parents, we joyfully invite you to join us as we exchange our vows.';
const eventTime = new Date('2026-11-28T10:00:00+03:00').getTime();
// The start time is confirmed; the end time is not, so the calendar entry has no duration.
const calendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({ action: 'TEMPLATE', text: 'Hannah & Steve’s Wedding', dates: '20261128T070000Z/20261128T070000Z', ctz: 'Africa/Nairobi', location: venue, details: invitation })}`;
const mapsUrl = 'https://maps.app.goo.gl/Br4vHjQi1HSdCpxQ6';

const absoluteUrl = (path: string) =>
  path.startsWith('https://') ? path : SITE_URL.startsWith('https://') ? SITE_URL.replace(/\/$/, '') + path : null;
const shareImage = absoluteUrl(photos.traditional);

const whatsappUrl = (phone: string, name: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(`Hello ${name}, I would like to RSVP for your wedding on 28 November 2026.`)}`;

const contacts = [
  { name: 'Hannah', display: '0794 558 236', phone: '254794558236' },
  { name: 'Steve', display: '0757 775 395', phone: '254757775395' },
];

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Hannah & Steve — November 28, 2026 | You’re Invited' },
    { name: 'description', content: 'With joy, Hannah and Steve invite you to their wedding on Saturday, November 28, 2026 at 10:00 AM, A.I.C Mwariki Church, Nakuru, Kenya.' },
    { property: 'og:title', content: 'Hannah & Steve — You’re Invited' },
    { property: 'og:description', content: 'Celebrate with us on November 28, 2026 at 10:00 AM at A.I.C Mwariki Church, Pipeline, Nakuru, Kenya.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    ...(shareImage ? [{ property: 'og:image', content: shareImage }, { name: 'twitter:image', content: shareImage }] : []),
  ] }),
  component: WeddingInvitation,
});

function Countdown() {
  // Starts empty so the server and browser render the same thing, then ticks once mounted.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now !== null && now >= eventTime) return <p className="countdown-done">The day has arrived.</p>;
  const left = now === null ? null : eventTime - now;
  const units = [
    { label: 'days', value: left === null ? null : Math.floor(left / 86400000) },
    { label: 'hours', value: left === null ? null : Math.floor((left % 86400000) / 3600000) },
    { label: 'minutes', value: left === null ? null : Math.floor((left % 3600000) / 60000) },
    { label: 'seconds', value: left === null ? null : Math.floor((left % 60000) / 1000) },
  ];
  return <div className="countdown" role="timer" aria-label="Time until the ceremony">
    {units.map((u) => <div key={u.label} className="countdown-unit">
      <span className="countdown-value">{u.value === null ? '--' : String(u.value).padStart(2, '0')}</span>
      <span className="countdown-label">{u.label}</span>
    </div>)}
  </div>;
}

function WeddingInvitation() {
  return <div id="top">
    <header className="invitation-header">
      <div className="invitation-header-inner">
        <a className="invitation-brand" href="#top" aria-label="Hannah and Steve, back to top">Hannah &amp; Steve</a>
        <nav className="invitation-nav" aria-label="Invitation navigation">
          <Button asChild variant="invitationNav"><a href="#ceremony">Ceremony</a></Button>
          <Button asChild variant="invitationNav" className="photos-nav"><a href="#photos">Photos</a></Button>
          <Button asChild variant="invitationAccent"><a href="#rsvp">RSVP</a></Button>
        </nav>
      </div>
    </header>
    <main>
      <section className="invitation-section hero-section" aria-label="Hannah and Steve’s wedding invitation">
        <div className="invitation-hero">
          <img className="hero-photo" src={photos.traditional} alt="Hannah and Steve smiling together in their red and black traditional outfits" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <p className="eyebrow hero-date">Saturday · November 28, 2026</p>
            <h1 className="hero-title">Hannah<br />&amp; Steve</h1>
            <p className="hero-invitation">With the blessings of God and our parents, we joyfully invite you as we exchange our vows.</p>
          </div>
        </div>
      </section>
      <section id="ceremony" className="invitation-section" aria-labelledby="ceremony-heading">
        <div className="ceremony-band">
          <div>
            <p className="eyebrow section-eyebrow">The ceremony</p>
            <h2 id="ceremony-heading" className="section-heading">A.I.C Mwariki Church</h2>
            <p className="venue-address">Pipeline, Nakuru, Kenya</p>
            <p className="ceremony-date"><time dateTime="2026-11-28T10:00:00+03:00">Saturday · November 28, 2026 · 10:00 AM</time></p>
            <Countdown />
          </div>
          <div className="ceremony-actions">
            <Button asChild variant="invitation"><a href={mapsUrl} target="_blank" rel="noopener noreferrer">Open directions</a></Button>
            <Button asChild variant="invitationOutline"><a href={calendarUrl} target="_blank" rel="noopener noreferrer">Add to calendar</a></Button>
          </div>
        </div>
      </section>
      <section id="photos" className="invitation-section photo-section" aria-labelledby="photos-heading">
        <div className="gallery-heading"><h2 id="photos-heading">A few moments</h2><p className="eyebrow section-eyebrow">The two of us</p></div>
        <div className="photo-grid">
          <img className="gallery-photo gallery-embrace" src={photos.embrace} alt="Hannah smiling over Steve’s shoulder as she holds him close" loading="lazy" />
          <img className="gallery-photo gallery-studio" src={photos.studio} alt="Hannah and Steve in matching blue shirts against a soft grey backdrop, smiling at each other" loading="lazy" />
          <img className="gallery-photo gallery-outdoors" src={photos.outdoors} alt="Hannah in a red patterned dress and Steve in a pink shirt, looking at each other outdoors in the evening light" loading="lazy" />
          <img className="gallery-photo gallery-outdoors2" src={photos.outdoors2} alt="Hannah and Steve laughing and hugging outdoors at sunset" loading="lazy" />
        </div>
      </section>
      <section id="rsvp" className="invitation-section rsvp-section" aria-labelledby="rsvp-heading">
        <div className="rsvp-band">
          <p className="eyebrow section-eyebrow">Kindly respond</p>
          <h2 id="rsvp-heading" className="section-heading">We would love to see you there.</h2>
          <div className="rsvp-grid">
            {contacts.map((c) => <div key={c.name} className="rsvp-card">
              <p className="rsvp-name">{c.name}</p>
              <p className="rsvp-number">{c.display}</p>
              <div className="rsvp-actions">
                <Button asChild variant="invitation"><a href={whatsappUrl(c.phone, c.name)} target="_blank" rel="noopener noreferrer" aria-label={`RSVP to ${c.name} on WhatsApp`}>WhatsApp</a></Button>
                <Button asChild variant="invitationOutline"><a href={`tel:+${c.phone}`} aria-label={`Call ${c.name}`}>Call</a></Button>
              </div>
            </div>)}
          </div>
        </div>
      </section>
    </main>
    <footer className="invitation-footer"><p className="footer-name">Hannah &amp; Steve</p><p className="eyebrow footer-date">November 28, 2026 · Nakuru, Kenya</p></footer>
  </div>;
}
