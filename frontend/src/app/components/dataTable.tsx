/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { convertLatLonToCartesian } from "../util/convertLatLonToCartesian";
import { handleZoomToVector } from "../util/handleZoomToVector";

interface Props {
  fireballs: string[][];
  tableHeight: number;
  zoomRef: any;
}

export default function DataTable({ fireballs, tableHeight, zoomRef }: Props) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const rowVirtualizer = useVirtualizer({
    count: fireballs.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 9.4,
  });

  return (
    <div className="mt-8">
      <div className="sticky -top-3 rounded-t-md bg-[#2f2f2f] pb-1">
        <h2 className="whitespace-nowrap p-2 pl-4 text-center text-sm text-gray-300">
          Data Table
        </h2>
        <div className="grid grid-cols-4 divide-x-2 divide-[#3f3f3f] text-center text-sm text-gray-300">
          <p>Energy</p>
          <p>Velocity</p>
          <p>Lat</p>
          <p>Lon</p>
        </div>
      </div>
      <div
        ref={scrollRef}
        className={`${tableHeight < 600 ? "" : "p-4"} space-y-2 overflow-auto rounded-b-md bg-[#161616] text-gray-200 transition-all duration-700`}
        style={{
          height: `${tableHeight}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <>
            {fireballs ? (
              <div
                key={virtualItem.key}
                className="grid select-none grid-cols-4 rounded-md py-2 text-center text-sm text-gray-300 transition-colors hover:cursor-pointer hover:bg-[#2f2f2f]"
                onClick={() => {
                  // Convert longitude and latitude to Cartesian coordinates
                  const impactVector = convertLatLonToCartesian(
                    fireballs[virtualItem.index][3],
                    fireballs[virtualItem.index][4],
                    fireballs[virtualItem.index][5],
                    fireballs[virtualItem.index][6],
                  );
                  const impactX = impactVector.x;
                  const impactY = impactVector.y;
                  const impactZ = impactVector.z;

                  handleZoomToVector(impactX, impactY, impactZ, 3, zoomRef);
                }}
              >
                <p>{Number(fireballs[virtualItem.index][2])}</p>
                <p>{Number(fireballs[virtualItem.index][8])}</p>
                <p>
                  {fireballs[virtualItem.index][3]}{" "}
                  {fireballs[virtualItem.index][4]}
                </p>
                <p>
                  {fireballs[virtualItem.index][5]}{" "}
                  {fireballs[virtualItem.index][6]}
                </p>
              </div>
            ) : (
              ""
            )}
          </>
        ))}
      </div>
    </div>
  );
}
