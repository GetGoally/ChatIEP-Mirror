export const DEFAULT_SYSTEM_PROMPT =
  process.env.DEFAULT_SYSTEM_PROMPT ||
  "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";

export const OPENAI_API_HOST =
  process.env.OPENAI_API_HOST || 'https://api.openai.com';

export const OPENAI_API_TYPE =
  process.env.OPENAI_API_TYPE || 'openai';

export const OPENAI_API_VERSION =
  process.env.OPENAI_API_VERSION || '2023-03-15-preview';

export const OPENAI_ORGANIZATION =
  process.env.OPENAI_ORGANIZATION || '';

export const AZURE_DEPLOYMENT_ID =
  process.env.AZURE_DEPLOYMENT_ID || '';

export const MAX_ALLOWED_SIZE_MB = 30;

export const ERROR_FORMAT = 'wrong_format';
export const ERROR_SIZE = 'max_size';
export const ERROR_AGREE = 'missed_agree';
export const ERROR_REQUIRED = 'missed_file';
export const ERROR_REQUEST = 'failed_request';


export const DEFAULT_PROMTS = [
  'How can I help my child start and finish homework?',
  'How can I help my kid make friends at school?',
  'What could I do to motivate my kid when they don’t want to do it?',
  'What behavior skills does my kid need to improve the most?',
  'What behavior skills does my kid need to improve the most?'
];

export const CHAT_RESPONSE_STATUS_DONE = 'done';
export const CHAT_RESPONSE_STATUS_PROCESSING = 'processing';