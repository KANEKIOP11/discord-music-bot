export interface Command {
    name: string;
    description: string;
    execute: (message: any, args: string[]) => Promise<void>;
}

export interface PlayerOptions {
    volume?: number;
    loop?: boolean;
    autoplay?: boolean;
}