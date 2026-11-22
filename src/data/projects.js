const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const projects = [
  {
    id: 'rl-elevator',
    name: 'Safe RL Energy Management for PMSM Drive',
    shortDescription:
      'Modelled a regenerative elevator drive in Simulink, using Reinforcement Learning to recover braking energy and benchmark against traditional control methods.',
    techStack: ['MATLAB', 'Simulink', 'Reinforcement Learning', 'Active Front End'],
    imageUrl: asset('images/projects/rl-elevator.svg'),
    repositoryUrl: 'https://github.com/devkesav/KONE-Project',
    repositoryName: 'devkesav/KONE-Project',
    coverUrl: 'https://opengraph.githubassets.com/c25967e8ae46fb205dde426aa637b0160556e0cc086c95725e07fe0ad0b45f34/devkesav/KONE-Project',
    detailDescription:
      'A regenerative elevator workbench combining MATLAB/Simulink PMSM and braking models, a FastAPI and WebSocket telemetry system, a React/Vite dashboard, and supercapacitor control. It compares conventional, rule-based, MPC, and SAC/TD3-style policies while a separate safety supervisor validates voltage, current, temperature, duty-cycle, and physical operating limits before commands reach the model.',
  },
  {
    id: 'crest',
    name: 'CREST – Community Resource Matching Platform',
    shortDescription:
      'Full-stack platform connecting administrators, volunteers, and resource persons using Flutter for the frontend and Firebase for backend management.',
    techStack: ['Flutter', 'HTML/CSS/JS', 'Firebase'],
    imageUrl: asset('images/projects/crest.svg'),
    detailDescription:
      'Built role-specific interfaces (Admin Dashboard vs. Volunteer View). The system uses Firebase Firestore to manage resource listings, allowing for real-time updates and efficient querying based on user roles. This showcases my ability to build scalable, multi-user web applications.',
  },
  {
    id: 'drowsy-sentry',
    name: 'Drowsy Sentry System',
    shortDescription:
      'Real-time drowsiness/yawn detector using MediaPipe face mesh, integrated with voice alerts and a Telegram bot for instant notification.',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'Tkinter', 'Telegram Bot'],
    imageUrl: asset('images/projects/drowsy-sentry.svg'),
    repositoryUrl: 'https://github.com/devkesav/Drowsy-Sentry-System',
    repositoryName: 'devkesav/Drowsy-Sentry-System',
    coverUrl: 'https://opengraph.githubassets.com/61d9f3c04d2e8c65f93946d9bdced34e6e14888a6979d368c792a3c717805d11/devkesav/Drowsy-Sentry-System',
    detailDescription:
      'A complete local monitoring system that calculates Eye Aspect Ratio and Mouth Aspect Ratio from MediaPipe face landmarks. It provides Tkinter live video, text-to-speech alerts, 5-second pre/post alert recording, Telegram video notifications, configurable thresholds, and optional CUDA acceleration for OpenCV processing.',
  },
];
