import { gql } from '@apollo/client';

const GET_CATEGORIES = gql`
  query categories($lang: String!) {
    categories(lang: $lang) {
      origin_name
      name  
      icon
    }
  }
`;


const GET_CATEGORIE = gql`
query getCategorie($name : String!) {
    getCategorie(name : $name) {  
        id
        ar_name
        fr_name
        en_name
    }

}
`

const GET_CAMPAIGN = gql`
query campaignsByCategory($categorie : String! , $lang : String!) {
  campaignsByCategory(categorie : $categorie, lang : $lang) {
    _id
    campaignName
    description
    tags
    raiser_id
   	categorie 
    goalAmount
    currentAmount
    createdAt
    deadline
    donorsCount
    image
  }

  
}

`
const GET_CAMPAIGNS = gql`
query campaigns{
  campaigns {
    campaignName
  }
}
`

export { GET_CATEGORIES , GET_CATEGORIE, GET_CAMPAIGNS , GET_CAMPAIGN};
