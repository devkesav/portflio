import React from 'react';
import { routeHref, STORY_ROUTES } from '../routes';

const IdealsNoteContent = ({ onNavigate }) => {
  const navigate = (event, route) => {
    event.preventDefault();
    onNavigate(route);
  };

  return (
    <div className="ideals-note-content">
      <section className="ideals-note-section">
        <h3 className="ideals-note-heading">What I want this portfolio to be</h3>
        <p>
          This portfolio started as a place to keep my projects in one view. It has slowly
          become a working notebook: a record of what I am learning, what I get wrong, and
          what I want to build next. I am an EEE undergraduate working across power
          electronics, control, embedded systems, and applied machine learning. From the
          outside those can look like separate interests. To me they are different ways of
          asking the same question: how do you make a physical system behave well, and how
          do you explain why it does?
        </p>
        <p>
          I do not want this site to feel like a resume with a dark theme. I want someone to
          leave with a sense of how I think, not just a list of tools I have touched. It is a
          place where the work, the notes, and the half-finished experiments can sit
          together, and where the next thing I am learning is allowed to be visible before
          it is polished.
        </p>
      </section>

      <section className="ideals-note-section">
        <h3 className="ideals-note-heading">The standards I try to keep</h3>
        <p>
          The ideal is to be honest, useful, and easy to read. The pages stay plain, the code
          sits close to the work, and the design gets out of the way. The terminal look is a
          small nod to where I spend my time, and the monochrome palette keeps attention on
          the work instead of the decoration.
        </p>
        <p>
          In practice that means building close to the problem, understanding the
          fundamentals before reaching for a tool, and leaving the next person a clear path
          in. I am learning to write more clearly, ship smaller projects more often, and
          document the middle of the process, not just the polished result.
        </p>
      </section>

      <section className="ideals-note-section">
        <h3 className="ideals-note-heading">People and ideas that shape them</h3>
        <p>
          The people on my{' '}
          <a
            href={routeHref(STORY_ROUTES.inspirations)}
            onClick={(event) => navigate(event, STORY_ROUTES.inspirations)}
            className="underline decoration-neutral-600 underline-offset-4 hover:text-white"
          >
            inspirations page
          </a>{' '}
          shape that standard. A.P.J. Abdul Kalam reminds me that engineering can be a form
          of public service, and that a big dream only counts when it turns into patient
          work. Jensen Huang’s point about the CPU and GPU is a useful reminder that good
          systems are built from parts that respect each other; the same is true of hardware,
          software, and the people around them. Subhas Chandra Bose and the creators I have
          met through the Tamil gaming community remind me that conviction and warmth are
          not opposites.
        </p>
        <p>
          Right now I am exploring regenerative elevator drives, embedded vision, and
          reinforcement-learning control. The lesson I keep returning to is simple: stay
          curious, do the unglamorous work, and bring people with you. This page will change
          as I do. For now, these are the ideals I am trying to practice.
        </p>
      </section>
    </div>
  );
};

export default IdealsNoteContent;
