"use client";

import { Canvas } from "@react-three/fiber";
import Earth from "./components/earth";
import Sun from "./components/sun";
import { OrbitControls } from "@react-three/drei";
import SpaceBackground from "./components/spaceBackground";
import { Physics } from "@react-three/cannon";
import Fireball from "./components/fireball";
import useQueryFireballs from "./hooks/useQueryFireballs";
import SideTab from "./components/sideTab";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/loadingSpinner";
import InfoPopUp, { PopUpInfo } from "./components/infoPopUp";

export default function Home() {
  const [energyFilterValue, setEnergyFilterValue] = React.useState(0);

  const fireballsData = useQueryFireballs();

  const fireballs = fireballsData.data?.data.filter(
    (fireball) => Number(fireball[2]) > energyFilterValue,
  );

  const [hideTab, setHideTab] = React.useState(false);

  const [impactEnergyUpperValue, setImpactEnergyUpperValue] = React.useState(3);

  const [colourUpperValue, setColourUpperValue] = React.useState(5);

  const [velocity, setVelocityValue] = React.useState(2000);

  const [startingDistance, setStartingDistance] = React.useState(2);

  const [showInfo, setShowInfo] = React.useState<PopUpInfo | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = React.useRef<any>();

  if (fireballsData.isLoading || !fireballsData.data) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-full w-full overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <div
        className={`${hideTab ? "w-[calc(100%-47px)]" : "w-0 sm:w-[calc(100%-350px)]"} h-full cursor-grab transition-all duration-300`}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 30 }}>
            <OrbitControls zoomSpeed={0.3} ref={controlsRef} />
            <SpaceBackground />
            <Sun />
            <Earth />

            {/* Asteroid Impact Simulation */}
            <Physics allowSleep={false}>
              {fireballs?.map((fireball, index) => (
                <Fireball
                  key={index}
                  lat={fireball[3]}
                  latPosition={fireball[4]}
                  lon={fireball[5]}
                  lonPosition={fireball[6]}
                  fireballVelocity={Number(fireball[8])}
                  impactEnergy={Number(fireball[2])}
                  impactEnergyUpperValue={impactEnergyUpperValue}
                  colourUpperValue={colourUpperValue}
                  velocityFactor={velocity}
                  startingDistance={startingDistance}
                  setShowInfo={setShowInfo}
                />
              ))}
            </Physics>
          </Canvas>
        </Suspense>
      </div>
      {fireballs ? (
        <SideTab
          fireballs={fireballs}
          hideTab={hideTab}
          setHideTab={setHideTab}
          impactEnergyUpperValue={impactEnergyUpperValue}
          setImpactEnergyUpperValue={setImpactEnergyUpperValue}
          colourUpperValue={colourUpperValue}
          setColourUpperValue={setColourUpperValue}
          energyFilterValue={energyFilterValue}
          setEnergyFilterValue={setEnergyFilterValue}
          velocity={velocity}
          setVelocityValue={setVelocityValue}
          startingDistance={startingDistance}
          setStartingDistance={setStartingDistance}
          zoomRef={controlsRef}
        />
      ) : (
        ""
      )}
      {showInfo ? <InfoPopUp showInfo={showInfo} /> : ""}
    </div>
  );
}
