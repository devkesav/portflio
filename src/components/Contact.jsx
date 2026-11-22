import React, { useState } from 'react';
import SectionHeading from './SectionHeading';

const EMAIL = 'k.kesavaraj86@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nReply email: ${form.email}\n\n${form.message}`
    );

    setStatus('Opening your email app...');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    window.setTimeout(() => setStatus('Email draft ready'), 800);
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="shell">
        <SectionHeading
          index="07"
          kicker="contact"
          title="Let's build something."
          description="Internships, research collaborations, or a project that needs both a soldering iron and a Python script."
        />

        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:gap-14">
          <div>
            <p className="text-[11px] tracking-widest text-muted">email</p>
            <a
              href={`mailto:${EMAIL}`}
              className="link-underline mt-2 inline-block text-sm text-white"
            >
              {EMAIL}
            </a>

            <div className="mt-7 flex flex-col gap-2 text-[13px] text-neutral-400">
              <a
                href="https://github.com/devkesav"
                target="_blank"
                rel="noreferrer"
                className="link-underline w-fit hover:text-white"
              >
                github.com/devkesav
              </a>
              <a
                href="https://www.linkedin.com/in/devkesav"
                target="_blank"
                rel="noreferrer"
                className="link-underline w-fit hover:text-white"
              >
                linkedin.com/in/devkesav
              </a>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                download="Kesavaraj-K-Resume.pdf"
                className="link-underline w-fit hover:text-white"
              >
                resume.pdf
              </a>
              <a href="tel:+918870927935" className="link-underline w-fit hover:text-white">
                +91 88709 27935
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <p className="mb-5 text-[13px] text-muted">$ mail -s &quot;hello&quot; {EMAIL}</p>

            <div className="space-y-4">
              <label className="flex items-baseline gap-3 border-b border-line py-1.5">
                <span className="w-16 shrink-0 text-xs text-muted">name:</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  className="w-full bg-transparent py-1 text-[13px] text-white outline-none placeholder:text-neutral-700"
                  placeholder="your name"
                />
              </label>

              <label className="flex items-baseline gap-3 border-b border-line py-1.5">
                <span className="w-16 shrink-0 text-xs text-muted">email:</span>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  className="w-full bg-transparent py-1 text-[13px] text-white outline-none placeholder:text-neutral-700"
                  placeholder="you@example.com"
                />
              </label>

              <label className="flex items-baseline gap-3 border-b border-line py-1.5">
                <span className="w-16 shrink-0 text-xs text-muted">message:</span>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={update('message')}
                  className="w-full resize-y bg-transparent py-1 text-[13px] text-white outline-none placeholder:text-neutral-700"
                  placeholder="a sentence or two is plenty"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[11px] text-neutral-600" role="status" aria-live="polite">
                {status || 'send using your email app'}
              </p>
              <button
                type="submit"
                className="border border-white bg-white px-5 py-2 text-xs font-medium text-black transition-colors hover:bg-black hover:text-white"
              >
                [ send ]
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
