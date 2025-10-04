
"use client";

import React, { useState } from "react";
import Terminal from "../components/Terminal";
import GuiPortfolio from "../components/GuiPortfolio";
import MatrixBackground from "../components/MatrixBackground";

export default function Home() {
  const [isGuiLoaded, setIsGuiLoaded] = useState(false);

  return (
    <div className="relative min-h-screen w-full">
      <MatrixBackground />
      {!isGuiLoaded ? (
        <Terminal onLaunchGui={() => setIsGuiLoaded(true)} />
      ) : (
        <GuiPortfolio />
      )}
    </div>
  );
}
