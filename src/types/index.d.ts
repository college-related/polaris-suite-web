
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
    environments: Environment[];
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