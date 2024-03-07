export const anilistInfoQuery = `query ($ids: [Int]) {
            Page(page: 1, perPage: 50) {
              media(id_in: $ids, type: ANIME) {
                id
                title {
                  native
                  romaji
                  english
                }
                type
                format
                status
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                season
                episodes
                duration
                source
                coverImage {
                  large
                  medium
                }
                bannerImage
                genres
                synonyms
                studios {
                  edges {
                    isMain
                    node {
                      id
                      name
                      siteUrl
                    }
                  }
                }
                isAdult
                externalLinks {
                  id
                  url
                  site
                }
                siteUrl
              }
            }
          }
`;
