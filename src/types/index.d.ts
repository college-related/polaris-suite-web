
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
  repo: string;
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
  creatorId: string;
  linkedProject: string | Project;
  environment: string | Environment;
  name: string;
  description: string;
  recentRun?: "pass" | "fail";
  status: "in progress" | "in review" | "done";
  testRuns: TestRun[];
  testSchema: TestSchema[];
  type: "unit" | "integration" | "component" | "api" | "e2e";
  comments: Partial<CommentData>[];
  createdAt: string;
  updatedAt: string;
}

type TestRun = {
  _id: string;
  result: string;
  status: "pass" | "fail";
  logs: string[];
  initiatedBy: string;
  createdAt: string;
  updatedAt: string;
}

type TestSchema = {
  name: string;
  params: TestSchemaParam[];
  functionType: "inbuilt" | "custom" | "not-function";
  path: string | null;
  inbuiltFunction: "suite" | "expect" | "test" | "api" | "call" | "component" | "page" | "polaris-none";
  customSchema: string | null;
  returns: string | null;
  siblingTest: string | number | null;
  anonymousTestChildren: string | number | null;
}

type TestSchemaParam =  string | number | boolean | Object | Array | "polaris-anom-function" | Function;

type CommentData = {
  _id: string;
  userId: string | User;
  comment: string;
  replies: Partial<CommentData>[];
  likes: string[] | User[];
}

type User = {
  _id: string;
  name: string;
  email: string;
  googleToken?: string;
  githubToken?: string;
  isEmailVerified: boolean;
}

type Settings = {
  _id: string;
  userId: string;
  theme: "light" | "dark" | "system";
  github: {
    enabled: boolean;
    installationId: string;
  };
}
interface Dashboard {
  projects: Project[],
  totalReports: number,
  totalTestCases: number,
  shortcuts: Shortcut,
}

type Shortcut = {
  _id?: string;
  userId: string;
  shortcuts: ShortcutSchema[];
}

type ShortcutSchema = {
  title: string;
  project: string;
}