const pageInit: {
    shop: boolean,
    commission: boolean,
    followers: boolean,
    following: boolean,
    reviews: boolean,
    transfers: boolean,
    product: boolean,
    menuBoutique: -1 | 0 | 1 | 2,
} = {
  shop: false,
  commission: false,
  followers: false,
  following: false,
  reviews: false,
  transfers: false,
  product: false,
  menuBoutique: -1
};

const apiPageInit = {
  followers: 1,
  following: 1,
  reviews: 1,
};

const modalInit = {
  user: false,
  social: false,
  codePromo: false,
  rate: false,
  report: false,
  theme: false,
};

export { pageInit, modalInit, apiPageInit };