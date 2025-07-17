import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query Categorie($lang: String!) {
    categories(lang: $lang) {
      origin_name
      name  
      icon
    }
  }
`;


const GET_CATEGORIE = gql`
query GetCategorie($name : String!) {
    getCategorie(name : $name) {
        name
        id
        ar_name
        fr_name
        en_name
    }

}
`

const GET_CAMPAIGN = gql`
query getCampaign($categorie : String!) {
  getCampaign(categorie : $categorie) {
  campaignName
  }
}

`
const GET_CAMPAIGNS = gql`
query {
  campaigns {
    campaignName
  }
}
`

export { GET_CATEGORIES , GET_CATEGORIE, GET_CAMPAIGNS , GET_CAMPAIGN};
