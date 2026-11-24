# Kesavaraj K — Portfolio

A terminal-inspired personal portfolio for Kesavaraj K, an Electrical and Embedded Systems Engineering student focused on power electronics, control systems, applied machine learning, and embedded development.

> $ echo "Built with creativity, inspired by the CLI."

## Highlights

- Responsive terminal-style interface with dark and light themes
- Animated ASCII portrait generated from a portrait source image
- Letter-by-letter and scroll-triggered word animations
- Circular dark/light theme transitions
- 3D glass portrait interaction
- Project case studies with GitHub repository context
- Live Medium blog feed with article covers
- LinkedIn, GitHub, resume, email, and project links
- Mail-app contact form
- Reduced-motion accessibility support

## Featured Work

### Safe RL Energy Management for PMSM Drive

Regenerative elevator and PMSM energy-management work combining MATLAB/Simulink models, reinforcement learning, rule-based control, MPC baselines, supercapacitor control, and safety constraints.

Repository: [devkesav/KONE-Project](https://github.com/devkesav/KONE-Project)

### CREST — Community Resource Matching Platform

A full-stack community resource platform built around administrator, volunteer, and resource-person workflows.

### Drowsy Sentry System

Real-time drowsiness and yawn detection using Python, OpenCV, MediaPipe, Tkinter, and Telegram alerts.

Repository: [devkesav/Drowsy-Sentry-System](https://github.com/devkesav/Drowsy-Sentry-System)

## Tech Stack

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- View Transitions API
- Medium RSS feed
- Python and OpenCV portrait-generation tooling

## Local Development

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## Portrait Asset

The source portrait is stored at `assets/source/portrait.png`.

Regenerate the theme-specific ASCII text files with:

```bash
python scripts/generate_ascii_portrait.py --cols 282 --ramp old
```

The generated files are written to:

- `src/data/portrait-dark.txt`
- `src/data/portrait-light.txt`

## Writing

Live Medium posts are loaded from:

- [medium.com/@devkesav](https://medium.com/@devkesav)

## Links

- Portfolio: [devkesav.github.io/portfolio](https://devkesav.github.io/portfolio/)
- GitHub: [github.com/devkesav](https://github.com/devkesav)
- LinkedIn: [linkedin.com/in/devkesav](https://www.linkedin.com/in/devkesav)
- Medium: [medium.com/@devkesav](https://medium.com/@devkesav)
- Email: [k.kesavaraj86@gmail.com](mailto:k.kesavaraj86@gmail.com)
