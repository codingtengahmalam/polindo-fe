export interface Tag {
  id: number;
  tag: string;
  tag_slug: string;
}

export interface TagListResponse {
  data: Tag[];
}
