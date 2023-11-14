import { Session } from "next-auth";

export interface ILayoutProps {
  children: React.ReactNode;
}

export interface ISessionProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export interface IProfile {
  id?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string;
  picture?: string;
}

export interface IUser {
  id: string;
  email: string;
  image: string;
  name: string;
}

export interface IPost {
  prompt: string;
  creator: ICreator;
  tag: string;
  _id?: string;
  __v?: number;
}

export interface INewPost {
  prompt: string;
  userId?: string;
  tag: string;
}

export interface ICreator {
  email: string;
  image: string;
  username?: string;
  __v?: number;
  _id?: string;
}

export interface IPromptCardProps {
  post: IPost;
  handleEdit?: () => void;
  handleDelete?: () => void;
  handleTagClick?: (tag: string) => void;
}

export interface IParams {
  id: string;
}

export enum FormTypes {
  Create = "Create",
  Edit = "Edit",
}
