import gql from 'graphql-tag';

export const OWNER_FRAGMENT = gql`
    fragment OwnerFragment on User {
        _id
        firstName
        lastName
        email
        avatarURL
        countryCode
        currency
    }
`;