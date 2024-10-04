/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import DataTable from "./dataTable";
import { resetCameraPosition } from "../util/resetCameraPosition";
import SideBarSVG from "./svg/sideBarSVG";
import ZoomSVG from "./svg/zoomSVG";
import ColourPalletSVG from "./svg/colourPalletSVG";
import VelocitySVG from "./svg/velocitySVG";
import LocationSVG from "./svg/lcoationSVG";
import QuestionMarkPopUp from "./questionMarkPop";

interface Props {
  fireballs: string[][];
  hideTab: boolean;
  setHideTab: React.Dispatch<React.SetStateAction<boolean>>;
  impactEnergyUpperValue: number;
  setImpactEnergyUpperValue: React.Dispatch<React.SetStateAction<number>>;
  colourUpperValue: number;
  setColourUpperValue: React.Dispatch<React.SetStateAction<number>>;
  energyFilterValue: number;
  setEnergyFilterValue: React.Dispatch<React.SetStateAction<number>>;
  velocity: number;
  setVelocityValue: React.Dispatch<React.SetStateAction<number>>;
  startingDistance: number;
  setStartingDistance: React.Dispatch<React.SetStateAction<number>>;
  zoomRef: any;
}

export default function SideTab({
  fireballs,
  hideTab,
  setHideTab,
  impactEnergyUpperValue,
  setImpactEnergyUpperValue,
  colourUpperValue,
  setColourUpperValue,
  energyFilterValue,
  setEnergyFilterValue,
  velocity,
  setVelocityValue,
  startingDistance,
  setStartingDistance,
  zoomRef,
}: Props) {
  const [dataTableHeight, setDataTableHeight] = React.useState(600);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setHideTab(true);
      } else {
        setHideTab(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${hideTab ? "w-[47px] px-1" : "w-full px-5 sm:w-[350px]"} h-full shrink-0 space-y-4 overflow-scroll bg-[#212121] py-2 transition-all duration-300 sm:max-w-[350px]`}
    >
      <div className="flex w-full items-center">
        <button
          onClick={() => setHideTab((prev) => !prev)}
          className="mr-2 h-10 rounded-lg px-2 hover:bg-[#363636]"
        >
          <SideBarSVG />
        </button>
        <h1 className="mx-auto whitespace-nowrap font-semibold text-gray-400">
          Fireballs 3D Visual
        </h1>
      </div>
      <div className={`${hideTab ? "hidden" : ""}`}>
        <div className="overflow-hidden rounded-md bg-[#2f2f2f]">
          <h2 className="clear-start whitespace-nowrap p-2 pl-4 text-sm text-gray-300">
            Impact Energy Normalised
          </h2>
          <div className="bg-black p-4 text-gray-200">
            <div className="flex justify-between pb-1">
              <p>1</p>
              <p>{impactEnergyUpperValue}</p>
            </div>
            <div className="h-10 rounded bg-red-400 bg-gradient-to-r from-yellow-400 to-red-600"></div>
          </div>
        </div>
        <div className="pt-6">
          <h2 className="whitespace-nowrap">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm font-medium text-gray-300">
              <p>
                Impact Energy Filter{" "}
                {energyFilterValue === 0
                  ? "- All"
                  : " > " + energyFilterValue + " kt"}
              </p>
              <QuestionMarkPopUp
                title="Impact Energy"
                infoText="The impact energy of a fireball, represents the total energy released when the fireball, which is typically a meteoroid or small asteroid, enters Earth's atmosphere and breaks apart or explodes. This energy is measured in terms of kilotons of TNT equivalent and gives an estimate of the destructive potential of the fireball. Higher impact energy means a more powerful event, similar to how explosions are rated in kilotons."
              />
            </div>
            <input
              type="range"
              min={0}
              max={10}
              value={energyFilterValue}
              onChange={(e) => setEnergyFilterValue(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
            ></input>
          </h2>
        </div>
        <div className="pt-6">
          <h2 className="whitespace-nowrap">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm font-medium text-gray-300">
              <p className="flex items-center gap-2">
                Normalised size <ZoomSVG />
              </p>
              <QuestionMarkPopUp
                title="Normalised Size"
                infoText="The normalized size of a fireball refers to a scaled or adjusted value representing the relative size of the fireball event, allowing comparison between different fireballs. It's typically calculated based on factors like the fireball’s brightness, energy, or velocity, and normalizes these aspects to provide a standardized measure of its size across various fireball events. This makes it easier to compare the magnitude of different fireballs irrespective of their unique characteristics."
              />
            </div>
            <input
              type="range"
              min={2}
              max={100}
              value={impactEnergyUpperValue}
              onChange={(e) =>
                setImpactEnergyUpperValue(Number(e.target.value))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
            ></input>
          </h2>
        </div>
        <div className="pt-6">
          <h2 className="whitespace-nowrap">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm font-medium text-gray-300">
              <p className="flex items-center gap-2">
                Colour Scale <ColourPalletSVG />
              </p>
              <QuestionMarkPopUp
                title="Colour Scale"
                infoText="An impact color scale that ranges from yellow to red represents the increasing intensity or severity of an event, like a fireball's impact. Yellow corresponds to lower intensity or smaller impacts, while orange marks a moderate level of intensity. As the scale progresses, red indicates the highest intensity or most significant impacts. The transition from yellow to red reflects growing energy or severity, allowing for a quick visual assessment of how powerful an event is, with red representing the most intense scenarios."
              />
            </div>
            <input
              type="range"
              min={2}
              max={100}
              value={colourUpperValue}
              onChange={(e) => setColourUpperValue(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
            ></input>
          </h2>
        </div>
        <div className="pt-6">
          <h2 className="whitespace-nowrap">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm font-medium text-gray-300">
              <p className="flex items-center gap-2">
                Velocity Factor <VelocitySVG />
              </p>
              <QuestionMarkPopUp
                title="Velocity Factor"
                infoText="The fireball velocity factor refers to the speed at which a fireball travels as it enters Earth's atmosphere. This velocity plays a key role in determining the fireball's energy and potential impact. Faster fireballs tend to release more energy upon atmospheric entry, contributing to a more powerful explosion. The velocity factor helps in assessing the severity of the event and influences calculations related to the fireball's size, brightness, and overall impact."
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={
                100 - (Math.log(velocity / 100) / Math.log(100000 / 100)) * 100
              }
              onChange={(e) => {
                const sliderValue = Number(e.target.value);
                // Logarithmic scaling formula (reversed)
                const scaledVelocity = Math.round(
                  100 * Math.pow(100000 / 100, (100 - sliderValue) / 100),
                );
                setVelocityValue(scaledVelocity);
              }}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
            ></input>
          </h2>
        </div>
        <div className="pt-6">
          <h2 className="whitespace-nowrap">
            <div className="mb-2 flex items-center justify-between gap-2 text-sm font-medium text-gray-300">
              <p className="flex items-center gap-2">
                Starting Distance <LocationSVG />
              </p>

              <QuestionMarkPopUp
                title="Starting Distance"
                infoText="The starting distance scale adjusts how far the fireball begins from Earth. This scale allows you to control the initial position of the fireball in relation to Earth's surface, impacting the duration and path of its descent. By modifying the starting distance, you can simulate fireballs that originate from varying heights, providing a more dynamic and customizable visualization of fireball events."
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={startingDistance}
              onChange={(e) => setStartingDistance(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
            ></input>
          </h2>
        </div>
        <DataTable
          fireballs={fireballs}
          tableHeight={dataTableHeight}
          zoomRef={zoomRef}
        />
        <button
          className={`${dataTableHeight === 600 ? "rotate-180" : ""} mb-3 mt-3 rounded-lg p-2 transition-all duration-300 hover:bg-[#363636]`}
          onClick={() => {
            if (dataTableHeight === 600) {
              setDataTableHeight(0);
            } else {
              setDataTableHeight(600);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className="fill-gray-300"
          >
            <path d="m480-500 160-160H320l160 160Zm280-340q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560ZM200-320v120h560v-120H200Zm560-80v-360H200v360h560Zm-560 80v120-120Z" />
          </svg>
        </button>
        <button
          className="mb-6 flex w-full items-center justify-center gap-4 rounded-lg bg-[#363636] p-4 text-gray-100 transition-colors duration-200 hover:bg-[#434343]"
          onClick={() => {
            resetCameraPosition(zoomRef);
          }}
        >
          <p>Reset Zoom Position</p>
          <ZoomSVG />
        </button>
      </div>
    </div>
  );
}
