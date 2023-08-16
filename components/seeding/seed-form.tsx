"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  numSeeds: number;
  participants: Participant[];
  onSubmit: (seededParticipants: Participant[]) => void;
};

interface Participant {
  id: string;
  name: string;
}

export default function SeedForm({ numSeeds, participants, onSubmit }: Props) {
  const handleFormSubmit = (seededParticipants: Participant[]) => {
    const filteredParticipants = participants.filter((participant) => participant !== null) as Participant[];
    onSubmit(filteredParticipants);
  }; {
    const { handleSubmit } = useForm();
    const [seededParticipants, setSeededParticipants] = useState<(Participant | null)[]>(Array(numSeeds).fill(null));
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [currentSeedIndex, setCurrentSeedIndex] = useState<number | null>(null);
    const [selectedTeam, setSelectedTeam] = useState<Participant | null>(null);
    const [seededTeams, setSeededTeams] = useState<string[]>([]);
    const handleOpenModal = (index: number) => {
      setCurrentSeedIndex(index);
      setModalVisible(true);
    };

    const handleCloseModal = () => {
      setModalVisible(false);
      setSelectedTeam(null);
    };

    const handleSelectTeam = (team: Participant) => {
      setSelectedTeam(team);
    };
    const handleSeedTeam = (team: string) => {
      setSeededTeams((prevTeams) => [...prevTeams, team]);
    };
    const handleAdd = () => {
      if (currentSeedIndex !== null && selectedTeam) {
        setSeededParticipants((prevParticipants) => {
          const newSeededParticipants = [...prevParticipants];
          newSeededParticipants[currentSeedIndex] = selectedTeam;
          return newSeededParticipants;
        });
        handleCloseModal();
      }
    };

    const handleRemove = (index: number) => {
      setSeededParticipants((prevParticipants) => {
        const newSeededParticipants = [...prevParticipants];
        newSeededParticipants[index] = null;
        return newSeededParticipants;
      });
    };

    const handleFormSubmit = () => {
      const filteredParticipants = participants.filter((participant) => participant !== null) as Participant[];
      onSubmit(filteredParticipants);
    };

    return (
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-wrap flex-col m-0 text-sm">
          <div className="block min-w-[7rem]">
            <div className="flex items-center min-h-[1rem] p-1 cursor-pointer border-b">
              <div className="text-center w-8">#</div>
              <div className="ml-1 w-8"></div>
              <div className="flex-[10_1_0%] text-left w-0 ml-1 overflow-ellipsis whitespace-nowrap">
                Name
              </div>
              <div className="w-14"></div>
            </div>
          </div>

          {seededParticipants.map((seededParticipant, index) => (
            <div key={index} className="flex items-center min-h-[35px] p-1 border-b">
              <div className="box-content ml-0 w-8 text-center">{index + 1}</div>
              {seededParticipant ? (
                <>
                  <div className="block box-content ml-1">
                    <button
                      type="button"
                      className="py-0 text-center w-8"
                      onClick={() => handleOpenModal(index)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex-[10_1_0%] text-left w-0 ml-1 overflow-ellipsis whitespace-nowrap box-content">
                    {seededParticipant.name}
                  </div>
                  <div className="box-content ml-1">
                    <button type="button" onClick={() => handleRemove(index)}>
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-[10_1_0%] text-left w-0 ml-1 overflow-ellipsis whitespace-nowrap box-content">
                  -
                </div>
              )}
            </div>
          ))}

<button type="submit">Seed Teams</button>

{modalVisible && (
  <div className="bg-gray-100 border border-gray-300 p-4 rounded-md">
    <h2 className="text-lg font-medium mb-4">Select a team</h2>
    {participants.length === 0 ? (
      <p className="text-gray-500">No participants found</p>
    ) : (
      <div className="space-y-2">
        {participants.map((p) => (
          <label key={p.id} className="flex items-center">
            <input
              type="radio"
              value={p.id}
              checked={selectedTeam?.id === p.id}
              onChange={() => handleSelectTeam(p)}
              className="mr-2 form-radio text-blue-500"
            />
            <span>{p.name}</span>
          </label>
        ))}
      </div>
    )}
    <div className="flex justify-end mt-4">
      <button
        className="px-4 py-2 text-white bg-green-500 rounded-md mr-2"
        onClick={handleAdd}
      >
        Add
      </button>
      <button
        className="px-4 py-2 text-white bg-red-500 rounded-md"
        onClick={handleCloseModal}
      >
        Cancel
      </button>
    </div>
  </div>
)}
</div>
</form>
);
}}