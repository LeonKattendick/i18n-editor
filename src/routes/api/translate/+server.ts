import { DEEPL_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const jsonData = (await request.json()) as { locale: string; content: string };
  console.log(jsonData);

  const result = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'post',
    headers: {
      Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [jsonData.content],
      target_lang: jsonData.locale.split('_')[0],
    }),
  });
  const deeplData = await result.json();

  return json(deeplData.translations[0].text);
};
