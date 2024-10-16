// decalre interfaces in index.d.ts : no need for export or import use in other moduels.
interface Product {
    id : string;
    name : string;
    imageUrl : string;
    originalPrice : number;
    discoundPrice : number;
    offerPercentage : number;
    rating : number;
    ratingCount : number;
    tags : string[]
}