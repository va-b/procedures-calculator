export interface Parameter {
    imgUrl: string;
    title: string;
    step: number;
    choices: Choice[];
}

export interface Step {
    title: string;
    numer: number;
}

export interface Choice {
    title: string;

}