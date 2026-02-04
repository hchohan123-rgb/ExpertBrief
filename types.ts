export interface FileItem {
  id: string;
  name: string;
}

export interface FolderContent {
  [key: string]: FileItem[];
}

export interface FolderMeta {
  id: string;
  name: string;
}

export interface AppData {
  folders: FolderContent;
}