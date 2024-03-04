import { prisma } from '$lib/util/prisma';
import type { Project } from '@prisma/client';

export const getProjectsById = (id: number): Promise<Project | null> => {
  return prisma.project.findUnique({ where: { id } });
};

export const getProjectsByUser = (createdBy: string): Promise<Project[]> => {
  return prisma.project.findMany({ where: { createdBy } });
};

export const createNewProject = (createdBy: string, name: string, locales: string[]): Promise<Project> => {
  return prisma.project.create({ data: { createdBy, name, locales } });
};
