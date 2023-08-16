import prisma from '@/lib/prisma';

export async function getStage(stageId: string) {
  return await prisma.stage.findFirst({
    where: {
      id: stageId,
    },
  });
}

export async function getParticipants(tournamentId: string) {
  return await prisma.participant.findMany({
    where: {
      tournamentId: tournamentId,
    },
    select: {
      id: true,
      name: true,
    },
  });
}