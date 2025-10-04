Project Plan: Interactive AI Developer Workbench
Author: Ayush Kumar Jha
Vision: To create a unique, interactive portfolio that showcases AI and backend development skills through a "live data stream" aesthetic, utilizing glassmorphism, fluid motion, and interactive modules. This is not just a resume; it's a demonstration.
Phase 1: Foundation & Frontend Setup (The Scaffolding)
1.1. Technology Stack
Framework: Next.js (for performance and structure)
UI Components: shadcn/ui (for clean, accessible components)
Styling: Tailwind CSS (for utility-first styling)
Animation: Framer Motion (for all motion and interactive effects)
3D Graphics: Three.js & react-three-fiber (for the Algorithm Sandbox visualization)
Icons: lucide-react (included with shadcn/ui)
1.2. Project Initialization
Create Next.js App:
npx create-next-app@latest interactive-portfolio --typescript --tailwind --eslint


Initialize shadcn/ui:
npx shadcn-ui@latest init

(Follow the CLI prompts to configure components.)
Install Dependencies:
npm install framer-motion three @react-three/fiber @react-three/drei


1.3. Global Styling & Core Layout
Dynamic Background:
In app/globals.css, create a dynamic, animated gradient for the body.
@keyframes gradient-animation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
body {
  background: linear-gradient(-45deg, #0a0a0a, #1a0a24, #0a1424, #230a24);
  background-size: 400% 400%;
  animation: gradient-animation 15s ease infinite;
}


Glassmorphism Style:
In tailwind.config.js, extend the theme to include a glassmorphism utility.
// tailwind.config.js
theme: {
  extend: {
    backdropFilter: {
      'blur-lg': 'blur(16px)',
    },
  },
},


The base class for glass panels will be: bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl.
Main Layout Component (/components/Layout.js):
Create a main layout wrapper that includes the Navbar and Footer. This component will wrap all page content.
Implement a smooth scroll provider if desired.
1.4. Component Structure
Create placeholder files for the main components:
components/Navbar.jsx
components/Footer.jsx
components/sections/Hero.jsx
components/sections/Projects.jsx
components/sections/Skills.jsx
components/sections/Experience.jsx
components/sections/Contact.jsx
components/interactive/AlgorithmSandbox.jsx
components/interactive/PerformanceDashboard.jsx
components/interactive/GenerativePlayground.jsx
components/interactive/AIChatbot.jsx
Phase 2: Building Static Components (with Motion)
2.1. Navbar & Footer
Navbar: A floating glassmorphic bar using the global style.
Interaction: On hover, navigation links have a subtle glow and 3D tilt effect using Framer Motion. whileHover={{ scale: 1.1, y: -2 }}.
Links: Home, Projects, Skills, Experience, Contact. Include links to your GitHub (github.com/b423016) and LinkedIn (linkedin.com/in/ayush-jha-196470287).
Footer: Simple glassmorphic bar with social links and a copyright notice. Icons use the same 3D tilt hover effect.
2.2. Hero Section
Visual: Full-screen section.
Animation: Use Framer Motion's motion.h1 and text animation variants to create a "code compilation" effect for your name and title ("Ayush Kumar Jha", "AI & Backend Engineer").
Call to Action: A static text element > Ask my AI assistant about my work. that will later be made functional.
2.3. Experience Timeline
Structure: A vertical line down the center of the section.
Content Cards: For each role (AI Engineer Intern, Al Backend Developer) and achievement (D3 Hackathon), create a glassmorphic card.
Scroll Animation: Use Framer Motion's useScroll and useTransform hooks to make the cards slide in from the side and fade in as the user scrolls them into view.
Micro-interactions:
Next to "85% positive user feedback," add a small, animated SVG pie chart that fills up.
Next to "Top 10% on Codeforces," add an animated rank counter.
Phase 3: Backend Setup & API Development (The Brain)
3.1. Technology Stack
Framework: Python with FastAPI.
AI/ML: LangChain or LlamaIndex for RAG, a library like pillow for image manipulation if needed.
Algorithm: A custom Python implementation of the A* algorithm.
3.2. Project Structure
/backend
|-- /app
|   |-- /routers
|   |   |-- chatbot.py
|   |   |-- algorithm.py
|   |   |-- generator.py
|   |-- /services
|   |   |-- ai_service.py
|   |   |-- pathfinding_service.py
|   |-- main.py
|-- requirements.txt
|-- Dockerfile


3.3. API Endpoints Plan
POST /api/chatbot
Request: { "query": "What projects did Ayush work on?" }
Response: { "answer": "Ayush worked on a Flight Route Optimization System and an Audio Recognition System...", "sources": [...] }
POST /api/optimize-route
Request: { "grid": [[0,0,1,...]], "start": [x,y], "end": [x,y] }
Response: { "path": [[x1,y1], [x2,y2], ...], "nodes_explored": 150 }
POST /api/generate-thumbnail
Request: { "prompt": "A futuristic city at night" }
Response: { "imageUrl": "https://.../image.png" }
Phase 4: Integrating Interactive Modules (The Magic)
4.1. Module 1: The Algorithm Sandbox
Frontend (AlgorithmSandbox.jsx):
Create a grid of divs or use a <canvas>. Manage the grid state (start, end, walls) with useState.
On "Visualize" button click, send the grid state to the /api/optimize-route endpoint.
On receiving the response, use Framer Motion's animate function to sequentially highlight the divs in the returned path, creating a real-time visualization.
Backend (pathfinding_service.py):
Implement a clean, efficient A* algorithm.
The API endpoint in algorithm.py will call this service.
4.2. Module 2: The Live Performance Dashboard
Frontend (PerformanceDashboard.jsx):
Use Recharts to create line charts and gauges within glassmorphic panels.
Create a React Context (e.g., PerformanceContext) to track user interactions.
Interactivity (Simulation):
When a user calls an API (e.g., clicks "Visualize"), the calling function will also update the context (setApiCallCount(prev => prev + 1)).
The dashboard components will listen to this context. A useEffect hook will trigger a brief, sharp animation on the charts whenever the context value changes, simulating a server load spike.
4.3. Module 3: The Generative AI Playground
Frontend (GenerativePlayground.jsx):
Use shadcn/ui Input and Button for the form.
On submission, set a loading state to true and display a cool loading animation (e.g., a pulsating glassmorphic circle).
Call the /api/generate-thumbnail endpoint.
When the image URL is received, display it in a motion.img component with a fade-in animation.
Backend (generator.py & ai_service.py):
Integrate with a real image generation API (e.g., Stability AI, DALL-E).
For development, the endpoint can return a placeholder image from a service like placehold.co.
Example URL: https://placehold.co/600x400/0a0a0a/FFFFFF?text=Prompt:+A+futuristic+city
4.4. Module 4: The AI Chatbot
Frontend (AIChatbot.jsx):
Use a shadcn/ui Dialog or a pop-up drawer for the interface.
Manage the conversation history in a useState array.
On message send, append the user message, show a "typing" indicator, call the /api/chatbot endpoint, and then append the AI's response.
Backend (chatbot.py & ai_service.py):
Use LangChain to set up a RAG pipeline.
The knowledge base will be a simple text file (resume_data.txt) derived from your resume.
The service will load this file, process the user query, and generate an answer based on the retrieved context.
Phase 5: Refinement, Optimization, & Deployment
5.1. Responsiveness
Use Tailwind's responsive prefixes (sm:, md:, lg:) to adjust grid layouts, font sizes, and padding.
For the Algorithm Sandbox, make the grid size smaller on mobile.
Performance: Consider disabling the backdrop-filter on mobile devices if performance is impacted, using a simple semi-transparent background instead.
@media (max-width: 768px) {
  .glass-panel {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background-color: rgba(255, 255, 255, 0.1);
  }
}


5.2. Accessibility (A11y)
Ensure all interactive elements are keyboard-navigable.
Add ARIA labels to buttons and icons.
Check color contrast, especially for text on glass panels.
5.3. Deployment
Backend (FastAPI):
Create a Dockerfile for the FastAPI application.
Push the code to a GitHub repository.
Deploy to a service like Railway or Render, which can build and deploy directly from a Dockerfile.
Frontend (Next.js):
Push the code to a separate GitHub repository.
Connect the repository to Vercel.
In Vercel's environment variables, add the URL of your deployed backend API (e.g., NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com).
Vercel will auto-deploy on every push to the main branch.
Appendix: Asset & Link Checklist
[ ] Dynamic Background: CSS animation implemented.
[ ] Icons: lucide-react installed and used for all icons.
[ ] Links:
[ ] GitHub: https://github.com/b423016
[ ] LinkedIn: https://linkedin.com/in/ayush-jha-196470287
[ ] Email: ayushjha4277@gmail.com
[ ] Resume PDF: Link to a downloadable version of Ayush_resume (1).pdf.
[ ] Animations Checklist:
[ ] Hero text "compilation" effect.
[ ] Navbar/Footer hover tilt effect.
[ ] Section fade/slide-in on scroll.
[ ] Experience timeline card animation.
[ ] Algorithm Sandbox path visualization.
[ ] Performance Dashboard chart "spike" animation.
[ ] Generative Playground loading animation and image fade-in.
[ ] Placeholder Image Service: placehold.co for initial development of the Generative Playground.
