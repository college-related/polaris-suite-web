
type dynamicObject = {
  [key: string]: any;
}

type dynamicObjectString = {
  [key: string]: string;
}

type Project = {
  _id: string;
  name: string;
  description: string;
  members: Collaborator[];
  environments: Partial<Environment>[];
  status: 'in progress' | 'hold' | 'archived' | 'draft' | 'done';
  createdAt: string;
  updatedAt: string;
}

type Environment = {
  _id: string;
  name: string;
  description: string;
  variables: {
    name: string;
    value: string;
  }[];
}

type Collaborator = {
  _id?: string;
  role: string;
  email: string;
  status: "pending" | "accepted" | "declined";
};

type Activity = {
  _id: string;
  name: string;
  type: "project" | "test-case";
  description: string;
  status: "project-create" | "project-delete" | "comment" | "test-pass" | "test-fail" | "mentioned" | "collaborator-add" | "collaborator-remove";
  createdAt: string;
  link: string;
}