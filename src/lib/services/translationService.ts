import { prisma } from '$lib/util/prisma';
import type { Project } from '@prisma/client';

export type SlimProject = { id: number; name: string; locales: string[] };

const mapProjectToSlimProject = (project: Project): SlimProject => {
  return { id: project.id, name: project.name, locales: project.locales };
};

export const getProjectsByUser = (createdBy: string): Promise<SlimProject[]> => {
  return new Promise((res, rej) => {
    prisma.project
      .findMany({ where: { createdBy } })
      .then((r) => res(r.map(mapProjectToSlimProject)))
      .catch(rej);
  });
};

export const createNewProject = (createdBy: string, name: string, locales: string[]): Promise<SlimProject> => {
  return new Promise((res, rej) => {
    prisma.project
      .create({ data: { createdBy, name, locales } })
      .then((r) => res(mapProjectToSlimProject(r)))
      .catch(rej);
  });
};
