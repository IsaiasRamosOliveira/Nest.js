class listProductPerCharacterDTO {
    name: string;
    description: string;
}

class ListImageProductDTO {
    url: string;
    description: string;
}

export class ListProductDTO {
    constructor(
        private id: string,
        private name: string
    ) { }
}