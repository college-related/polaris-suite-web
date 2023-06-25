
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
    name: string; 
    role: string;
    email: string;
    status: "pending" | "accepted" | "declined";
};