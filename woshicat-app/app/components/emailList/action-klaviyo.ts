'use server';
import {
  ApiKeySession,
  ProfileCreateQuery,
  ProfileEnum,
  ProfilesApi,
  SubscriptionCreateJobCreateQuery,
} from 'klaviyo-api'

const now = new Date();
// const year = now.getFullYear();      // Gets the year (e.g., 2024)
// const month = now.getMonth() + 1;    // Gets the month (0-11, so add 1 to make it 1-12)
// const day = now.getDate();           // Gets the day of the month (1-31)
console.log(now);

const KlaviyoAPIKey = process.env.KLAVIYO_PRIVATE_EMAIL_LIST_TOKEN!;
// const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/';
// const profileUrl = 'https://a.klaviyo.com/api/profile-import/'


const session = new ApiKeySession(KlaviyoAPIKey);
const profilesApi = new ProfilesApi(session);

export default async function AddEmailSubscriber(email: string) {
  let profile: ProfileCreateQuery = {
    data: {
    type: ProfileEnum.Profile,
    attributes: {
      email: `${email!}`
      }
    }
  }

  let subscribe: SubscriptionCreateJobCreateQuery = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        customSource: 'Homepage Footer Newsletter Subscription Form',
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email: `${email!}`,
                subscriptions: {
                  email: {marketing: {consent: 'SUBSCRIBED', consentedAt: now}}
                },
              }
            }
          ]
        },
      },
      relationships: {list: {data: {type: 'list', id: 'YvUXMs'}}}
    }
  }
  
  
  profilesApi.createOrUpdateProfile(profile).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  });
  
  profilesApi.subscribeProfiles(subscribe).then(result => {
    console.log(result)
  }).catch(error => {
    console.log(error)
  });

};
//     const options = {
//         method: 'POST',
//         headers: {
//           accept: 'application/json',
//           revision: '2024-07-15',
//           'content-type': 'application/json',
//           Authorization: `Klaviyo-API-Key ${KlaviyoAPIKey!}`
//         },
//         body: JSON.stringify({
//             data: {
//               type: 'profile',
//               attributes: {
//                 email: `${email!}`,
//               },
//             }
//           }),
//       };

//       const subscribeOptions = {
//         method: 'POST',
//         headers: {
//           accept: 'application/json',
//           revision: '2024-07-15',
//           'content-type': 'application/json',
//           Authorization: `Klaviyo-API-Key ${KlaviyoAPIKey!}`
//         },
          
//         body: JSON.stringify({
//             data: {
//               type: 'profile-subscription-bulk-create-job',
//               attributes: {
//                 custom_source: 'Homepage Footer Newsletter Subscription Form',
//                 profiles: {
//                   data: [
//                     {
//                       type: 'profile',
//                       attributes: {
//                         email: `${email!}`,
//                         subscriptions: {
//                           email: {marketing: {consent: 'SUBSCRIBED', consented_at: `${date}`}}
//                         },
//                       }
//                     }
//                   ]
//                 },
//                 historical_import: true,
//               },
//               relationships: {list: {data: {type: 'list', id: 'YvUXMs'}}}
//             }
//           })
//       };
      
//     //   create profile on klaviyo
//     fetch(profileUrl, options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
//     //   add email consent
//     fetch(url, subscribeOptions)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
