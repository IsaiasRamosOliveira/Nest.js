class listProductPerCharacterDTO {
    name: string;
    description: string;
}

class ListImageProductDTO {
    url: string;
    description: string;
}

export class listProductDTO {
    id: string;
    userId: string;
    name: string;
    value: number;
    amount: number;
    description: string;
    category: string;
    characters: listProductPerCharacterDTO[];
    images: ListImageProductDTO[];
}