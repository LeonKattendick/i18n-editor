export type Project = {
  id: number;
  createdBy: string;
  name: string;
  locales: string[];
};

export type TranslationWithItems = {
  id: number;
  projectId: number;
  key: string;
  items: TranslationItem[];
};

export type TranslationItem = {
  id: number | undefined;
  translationId: number;
  locale: string;
  content: string;
};
