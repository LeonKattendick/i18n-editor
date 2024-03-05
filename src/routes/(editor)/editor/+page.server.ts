import { getProjectsById } from '$lib/services/projectService';
import { getTranslationItemsByTranslationIds } from '$lib/services/translationItemService';
import { getTranslationsByProjectId } from '$lib/services/translationService';
import { getCurrentUserUuid } from '$lib/util/helper';
import type { Project, Translation, TranslationItem } from '@prisma/client';
import type { ServerLoad } from '@sveltejs/kit';

type PromiseReturn =
  | { project: Project; translationsWithItems: (Translation & { items: TranslationItem[] })[] }
  | { notFound: boolean };

export const load: ServerLoad = async ({ cookies, url }) => {
  const projectId = Number.parseInt(url.searchParams.get('id') || '');

  if (!projectId) {
    return { noParameter: true };
  }

  return {
    promise: new Promise<PromiseReturn>(async (res, rej) => {
      const project = await getProjectsById(projectId);
      if (!project || project.createdBy !== getCurrentUserUuid(cookies)) {
        return { notFound: true };
      }

      try {
        const translations = await getTranslationsByProjectId(project.id);
        const translationItems = await getTranslationItemsByTranslationIds(translations.map((v) => v.id));

        const translationsWithItems = translations.map((v) => ({
          ...v,
          items: translationItems.filter((w) => w.translationId === v.id),
        }));

        res({
          project,
          translationsWithItems,
        });
      } catch (e) {
        rej(e);
      }
    }),
  };
};
