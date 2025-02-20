export interface Survey {
    id: string;
    name: string;
    description: string;
    active: boolean;
    questions: {
        questionValue: string;
        type: string;
        required: boolean;
        additionalProperties?: string | number | string[] | number[] | null ;
        minSize?: number;
        maxSize?: number;
    }[];
}
