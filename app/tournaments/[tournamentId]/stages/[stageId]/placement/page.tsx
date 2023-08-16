"use client";
import { createBracket, createLinks } from "../result/page";
import SeedForm from "@/components/seeding/seed-form";
import { useState } from "react";
import { getStage, getParticipants } from './prismaUtils';


interface Participant {
  id: string;
  name: string;
}

interface Params {
  params: {
    tournamentId: string;
    stageId: string;
  };
}

export default function StagePlacement({ params }: Params) {
  const [seededParticipants, setSeededParticipants] = useState<Participant[]>([]);

  const handleFormSubmit = (participants: Participant[]) => {
    setSeededParticipants(participants);
  };

  const fetchStageAndParticipants = async () => {
    const stageData = await getStage(params.stageId);
    const participantsData = await getParticipants(params.tournamentId);
    const [stage, participants] = await Promise.all([stageData, participantsData]);
    const stageSize: number = (stage?.settings as any)?.size;

    const teams = participants.map((participant) => participant.name);

    const bracket = createBracket(stage, teams, seededParticipants);
    const allMatches = bracket.reduce((matches, round) => [...matches, ...round], []);
    const links = createLinks(bracket);

    return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-medium">Placement</h1>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <div
            className="relative flex flex-col bg-white text-left overflow-hidden rounded m-0"
            id="card"
          >
            <div className="p-5 border-b" id="card-header">
              <h2 className="text-2xl font-medium">Seeding</h2>
            </div>
            <div
              className="flex-1 p-5 overflow-auto break-words"
              id="card-content"
            >
              {/* CARD */}
              <SeedForm numSeeds={stageSize} participants={participants} onSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div
            className="relative flex flex-col bg-white text-left overflow-hidden rounded m-0"
            id="card"
          >
            <div className="p-5 border-b" id="card-header">
              <h2 className="text-2xl font-medium">Single Elimination</h2>
            </div>
            <div
              className="flex-1 p-5 overflow-hidden break-words"
              id="card-content"
            >
              {/* CARD */}
              <div className="block overflow-hidden break-words">
                <div className="flex flex-wrap box-border min-w-max">
                  {bracket.map((round, i) => (
                    <div key={`round-${i}`} className="box-border min-w-0 mr-8">
                      <div className="min-w-[12rem] p-3 bg-neutral-100 rounded">
                        <h2 className="text-sm font-bold text-center">
                          Round {i + 1}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="relative block"
                  style={{
                    width: bracket.length * 14 + "rem",
                    height: bracket[0].length * 5 + "rem",
                  }}
                >
                  <div className="absolute z-[1] block" id="bracket-nodes">
                    {allMatches.map((match, i) => (
                      <div
                        key={`match-${i}`}
                        className="box-border min-w-0 mr-8 absolute"
                        style={{
                          left: match.left,
                          top: match.top,
                          width: "12rem",
                          height: "3.875rem",
                        }}
                      >
                        <div className="flex relative box-border min-w-[12rem] p-2 rounded border border-neutral-300">
                          <div
                            className="flex absolute -top-2 left-2 right-2 z-[1] text-xs"
                            id="header"
                          >
                            <div className="text-ellipsis overflow-hidden whitespace-nowrap bg-white px-1 mb-2 text-neutral-500">
                              {match.name}
                            </div>
                          </div>
                          <div
                            className="flex-[3_1_0%] block text-neutral-300 text-sm"
                            id="record"
                          >
                            <div className="flex items-center mb-[1px]">
                              <div className="">Team A</div>
                            </div>
                            <div className="flex items-center mb-0">
                              <div className="">Team B</div>
                            </div>
                          </div>
                          <div className="" id="state disabled"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <svg
                    className="absolute z-0 overflow-hidden w-full h-full"
                    x={0}
                    y={0}
                    viewBox={`0 0 ${bracket.length * 14000} ${
                      bracket[0].length * 5000
                    }`}
                    id="bracket-links"
                  >
                    {links.map((points, i) => (
                      <polyline
                        key={`link-${i}`}
                        className="fill-none stroke-[62.5] stroke-neutral-300"
                        points={points}
                        fill="none"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {fetchStageAndParticipants()}
    </div>
  );
                    }}
