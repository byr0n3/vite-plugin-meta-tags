export type TagType = 'title' | 'description' | 'url' | 'img' | 'color';
export type TagValue = string | number | boolean | undefined | null;
export type MetaConfig = Partial<Record<TagType, TagValue>>;
