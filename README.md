# My Portfolio

A modern, interactive portfolio website built with Next.js 15 and FastAPI.

## Features

- **Interactive Terminal Interface**: Bootloader-style terminal experience
- **Modern GUI Portfolio**: Clean, professional design with animations
- **Skills Constellation**: Interactive skill visualization
- **Two-Stage Experience**: Terminal bootloader → GUI transition
- **Responsive Design**: Works on all devices
- **Performance Dashboard**: Real-time metrics tracking
- **Algorithm Sandbox**: Interactive coding playground

## Tech Stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

### Backend
- FastAPI
- Python
- LangChain
- FAISS (optional)

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/b423016/My-Portfolio.git
cd My-Portfolio
```

2. Install frontend dependencies:
```bash
cd interactive-portfolio
npm install
```

3. Install backend dependencies (optional):
```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Project

#### Frontend Only (Recommended for deployment)
```bash
cd interactive-portfolio
npm run dev
```

#### With Backend (Full features)
```bash
# Terminal 1 - Backend
cd backend
uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd interactive-portfolio
npm run dev
```

## Deployment

This project is optimized for Vercel deployment:

1. Push to GitHub
2. Connect your GitHub repo to Vercel
3. Set build settings:
   - Framework Preset: Next.js
   - Root Directory: `interactive-portfolio`
   - Build Command: `npm run build`
   - Output Directory: `.next`

## Project Structure

```
My-Portfolio/
├── interactive-portfolio/    # Next.js frontend
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   │   ├── sections/        # Page sections
│   │   ├── interactive/     # Interactive modules
│   │   └── contexts/        # React contexts
│   └── public/              # Static assets
├── backend/                 # FastAPI backend (optional)
│   ├── app/                 # Application code
│   └── requirements.txt     # Python dependencies
└── README.md               # This file
```

## Features Overview

- **Terminal Experience**: Interactive command-line interface
- **GUI Portfolio**: Modern portfolio with smooth animations
- **Skills Visualization**: Dynamic skill constellation
- **Projects Showcase**: Featured projects with descriptions
- **Experience Timeline**: Professional experience
- **Achievements**: Awards and certifications
- **Contact Form**: Get in touch functionality

## Author

**Ayush Kumar Jha**
- Software Developer
- Turning ideas into powerful, elegant software

## License

This project is open source and available under the MIT License.