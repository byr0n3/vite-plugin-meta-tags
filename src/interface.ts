export type TagType = 'title' | 'description' | 'url' | 'img' | 'color' | 'google';
export type TagValue = string | number | boolean | undefined | null;
export type MetaConfig = Partial<Record<TagType, TagValue>>;
export type InjectTo = 'head' | 'body' | 'head-prepend' | 'body-prepend';
