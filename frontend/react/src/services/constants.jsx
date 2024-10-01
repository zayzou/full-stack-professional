import {FaFacebookF, FaYoutube, FaInstagram} from "react-icons/fa6";
import axios from "axios";


export const socials = (style) => {
    return [{
        id: 1, url: "https://www.twitter.com", icon: <FaFacebookF className={style}/>,
    }, {
        id: 2, url: "https://www.twitter.com", icon: <FaYoutube className={style}/>,
    }, {
        id: 3, url: "https://www.twitter.com", icon: <FaInstagram className={style}/>,
    },];
};

export const links = [
    // {id: 1, url: "/", text: "accueil"},
    // {id: 1, url: "productsBrands", text: "Produits" , sub_menus: [{url:"/products", str:"Tout les produits"},{url:"/productsBrands", str:"Découvrir"}]},
    {id: 1, url: "/production?brand=STILINA", text: "Production" ,
        sub_menus: [
            {url:"/products?search=&category=ÉCRITURE&brand=STILINA&sort=a-z", str:"Articles d'écriture"},
            {url:"/products?search=&category=TRAÇAGE&brand=STILINA&sort=a-z", str:"Articles de traçage",
                sub_menus: [
                    {url:"/products?search=&category=TRAÇAGE&brand=STILINA&sort=z-a", str:"Écolier"},
                    {url:"/products?search=tableau&category=TRAÇAGE&brand=STILINA&sort=a-z", str:"Tableau"},
                ]
            },
            {url:"/products?search=ARDOISE&category=TABLEAUX+ET+ARDOISES&brand=STILINA&sort=a-z", str:"Ardoise et brosse"},
            {url:"/products?search=TABLEAU&category=TABLEAUX+ET+ARDOISES&brand=STILINA&sort=a-z", str:"Tableaux blancs",
                sub_menus: [
                    {url:"/products?search=TABLEAU&category=TABLEAUX+ET+ARDOISES&brand=STILINA&sort=a-z", str:"Cadre aluminium"},
                    {url:"/products?search=TABLEAU&category=TABLEAUX+ET+ARDOISES&brand=STILINA&sort=a-z", str:"Cadre plastique"},
                ]
            },
            {url:"/products?search=&category=PÂTE+À+MODELER&brand=STILINA&sort=a-z", str:"Pâte à modeler",
                sub_menus: [
                    {url:"/products?search=&category=PÂTE+À+MODELER&brand=STILINA&sort=a-z", str:"En barrettes"},
                    {url:"/products?search=MODELER+POT&category=PÂTE+À+MODELER&brand=STILINA&sort=a-z", str:"En pots"},
                ]
            }
        ]
    },
    {id: 2, url: "/distribution?brand=KANGARO", text: "Distribution" ,
        sub_menus: [
            {url:"/categories?brand=KANGARO", str:"Kangaro Kanin India",
                sub_menus: [
                    {url:"/products?search=&category=tout&brand=KANGARO&sort=a-z", str:"Agrafeuses de bureau et perforatrices"},
                    {url:"/products?search=&category=AGRAFEUSE+ET+PERFORATRICE+GEANTES&brand=KANGARO&sort=a-z", str:"Agrafeuses professionnelles et perforatrices"},
                    {url:"/products?search=&category=AGRAFES&brand=KANGARO&sort=a-z", str:"Agrafes de bureau et professionnelles"},
                    {url:"/products?search=&category=tout&brand=KANGARO&sort=z-a", str:"Autres articles"},
                ]
            }
        ]
    },
    // {id: 2, url: "about", text: "Nous Connaître "},
    {id: 3, url: "contact", text: "Contact", sub_menus: [{url:"/contact", str:"Bureau"},{url:"/contact-commercials", str:"Commerciaux"}]},
    // {id: 3, url: "brands", text: "Marques"},
    // {id: 4, url: "media", text: "Media"}
    {id: 4, url: "/knowusAndmedia", text: "Nous Connaître"}
];

// , sub_menus: ["stilina", "kangaro"]
export const product_url = "https://stilina-api-env.eba-5bv9wity.ca-central-1.elasticbeanstalk.com/api/v1";
// export const product_url = "http://localhost:8080/api/v1";

export const customAxiosInstance = axios.create({
    baseURL: product_url,
});


const sortMap = new Map();
sortMap.set("a-z", "name,asc");
sortMap.set("z-a", "name,desc");
sortMap.set("Ajouté récemment", "createdAt,desc");
export const sortOptions = sortMap;

