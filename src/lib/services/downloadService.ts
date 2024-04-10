import type { Project, TranslationWithItems } from '$lib/util/types';
import JSZip from 'jszip';

export const downloadTranslationFiles = async (project: Project, translationsWithItems: TranslationWithItems[]) => {
  const zip = new JSZip();
  for (const locale of project.locales) {
    const obj = createLanguageJson(
      translationsWithItems.map((v) => ({ ...v, items: v.items.filter((w) => w.locale === locale) })),
    );
    const json = JSON.stringify(obj, undefined, 2);
    const textFile = new Blob([json], { type: 'text/plain' });
    zip.file(`translation_${locale}.json`, textFile);
  }

  const zipData = await zip.generateAsync({
    type: 'blob',
    streamFiles: true,
  });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(zipData);
  link.download = `translations_${project.name}.zip`;
  link.click();
  link.remove();
};

const createLanguageJson = (translationsWithItems: TranslationWithItems[]) => {
  let obj = {};

  for (const translation of translationsWithItems) {
    const content = translation.items[0]?.content ?? '';
    const subCategories = translation.key.split('.');

    let nestedObject: any = obj;
    for (let i = 0; i < subCategories.length; i++) {
      const category = subCategories[i];
      const type = typeof nestedObject[category];

      if (type === 'undefined') {
        nestedObject[category] = {};
      } else if (type === 'string') {
        console.error(
          `Could not assign subcategory '${category}' (${i + 1}) in key '${translation.key}' as it is also defined as another key.`,
        );
        break;
      }
      if (i === subCategories.length - 1) nestedObject[category] = content;
      else nestedObject = nestedObject[category];
    }
  }
  return obj;
};
