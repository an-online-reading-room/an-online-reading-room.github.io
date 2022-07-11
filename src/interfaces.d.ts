export interface Link {
  slug: string,
  blockID: string,
  startOffset: number,
  endOffset: number,
  target: Link
}



export interface StoryListView {
  id: number,
  slug: string,
  title: string,
  username: string,
  location: string,
  description: string,
}

export interface StoryPageView {
  id: number,
  title: string,
  location: string,
  publishedAt: string,
  submission: JSON,

  links: Link[]
}

export interface StoryMapView {
  slug: string,
  title: string,
  location: string,
  username: string
}

