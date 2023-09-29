type iconsType = {
    [key: string]: number
}


type universType = Array<{ id: string, name: string, image: string, selected: boolean }>


type UserDataType = {
    id: string
    login: string
    user_nicename: string
    nicename: string
    user_email: string
    display_name: string
    avatar: string
    roles: Array<string>
    has_universe: boolean
    code_parrainage: Array<{ id: string, user_id: string, referrer_id: string, code: string, daily_count: string, total_count: string, periode: string }>
    social_networks: {
        youtube: string
        instagram: string
        facebook: string
        pinterest: string
        vinted: string
        snapchat: string
    },
    numberSocialNetwork?: number
    follow?: number
    avatar_urls: string
    boutique_link: string
    rank_number: number
    star_rating: number
    rating_amount: number
    commission: {
        demande: string | { bonus_demande: number, cpa_demande: number, cpl_demande: number }
        can_demande: boolean
        cpa_sum: number
        current_cpl_sum: number
        cpl_declined: number
        paid_cpl: number
        current_bonus_sum: number
        bonus_paid: number
        cpa_paid: number
        total_cpc: number
        total_cpc_euro: number
        clicks_tmp: number
        clicks_tmpt_euro: number
        cpa_declined: number
        pending: number
        encaisser: number
        transfert_en_cours: number
        refuser: number
        valider: number
    },
    follower_count: number
    following_count: number
    user_total_views: number
    boutique_max: number
    bp_fields: {
        user_data: {
            Name: string
            Sexe: Array<string> | string
            Date_de_naissance: string
            Interest_Centers: Array<string>
            universe: boolean
            Nombre_de_Followers_Instagram: string
            Ville_de_Residence: string
        },
        field_list: {
            Name: { id: number, data: Array<any> }
            Sexe: { id: number, data: Array<{ id: string, name: string }> },
            Nombre_de_Followers_Instagram: { id: number, data: Array<{ id: string, name: string }> }
            Ville_de_Residence: { id: number, data: Array<any> }
            Date_de_naissance: { id: number, data: Array<any> }
            Interest_Center: { id: number, data: Array<{ id: string, name: string, image: string }> }
        }
    },
    bio: string
    first_name: string
    last_name: string
    address: string
    country: string
    phone: string
    lang: string
    is_pro: boolean
    live: { isLive: boolean }
    live_badge: { id: string, name: string, badge: string }
   
};

type UserCredType = { Password: string, Username: string };

type statsTypeInput = "video" | "product" | "page" | "user" | "search" | "add" | "init"

type statsType = {
    video: {},
    product: {},
    page: {},
    user: {
        privateMessageNumber: 0,
        openAppNumber: 0,
        numberSwipeHome: 0,
        numberSwipeFollowing: 0,
        numberSwipeExplorer: 0,
        numberSwipeUserBoutique: 0,
        numberSwipeUserFav: 0,
        numberSwipeTheme: 0,
        numberSwipeChallenge: 0,
    },
    search: {
        offre: Array<string>,
        ajoutPost: Array<string>,
        ajoutLive: Array<string>
    },
    addFrom: {
        "gallerie": 0,
        "insta": 0,
        "camera": 0
    }
}

export { iconsType, universType, UserDataType, UserCredType, statsType, statsTypeInput };
