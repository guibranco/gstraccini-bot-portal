/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION?: string;
  readonly VITE_LOGSTREAM_SERVER?: string;
  readonly VITE_LOGSTREAM_API_KEY?: string;
  readonly VITE_LOGSTREAM_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
