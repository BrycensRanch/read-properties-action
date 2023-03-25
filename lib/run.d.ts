type Inputs = {
    file: string;
    property?: string;
    all?: boolean;
    default?: string;
};
export declare const run: (inputs: Inputs) => Promise<void>;
export {};
