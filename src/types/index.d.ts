
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
  status: 'in progress' | 'hold' | 'archieved' | 'draft' | 'done';
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

type TestCase = {
  _id: string;
  linkedProject: string;
  environment: string;
  name: string;
  description: string;
  recentRun: null | "pass" | "fail";
  status: "in progress" | "in review" | "done";
  testRuns: TestRun[];
  scheme: null | TestScheme;
  type: "unit" | "integration" | "component" | "api" | "e2e";
  createdAt: string;
  updatedAt: string;
}

type TestRun = {
  _id: string;
  result: TestResult;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

type TestScheme = {
  name: string;
  description: string;
  params?: {
    name: string;
    value: string;
  }[];
  children?: TestScheme;
}

type TestResult = {
  result: string;
  status: "pass" | "fail";
  logs: string[];
  createdAt: string;
}