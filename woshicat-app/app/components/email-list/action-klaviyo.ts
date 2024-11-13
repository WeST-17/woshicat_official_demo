'use server';

const now = new Date();
const year = now.getFullYear();      // Gets the year (e.g., 2024)
const month = now.getMonth() + 1;    // Gets the month (0-11, so add 1 to make it 1-12)
const day = now.getDate();           // Gets the day of the month (1-31)
const date = `${year}-${month}-${day}`;

const KlaviyoAPIKey = process.env.KLAVIYO_PRIVATE_EMAIL_LIST_TOKEN;
const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/';
const profileUrl = 'https://a.klaviyo.com/api/profile-import/'

export default async function AddEmailSubscriber(email: string) {
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          revision: '2024-07-15',
          'content-type': 'application/json',
          Authorization: `Klaviyo-API-Key ${KlaviyoAPIKey!}`
        },
        body: JSON.stringify({
            data: {
              type: 'profile',
              attributes: {
                email: `${email!}`,
              },
            }
          }),
      };

      const subscribeOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          revision: '2024-07-15',
          'content-type': 'application/json',
          Authorization: `Klaviyo-API-Key ${KlaviyoAPIKey!}`
        },
          
        body: JSON.stringify({
            data: {
              type: 'profile-subscription-bulk-create-job',
              attributes: {
                custom_source: 'Homepage Footer Newsletter Subscription Form',
                profiles: {
                  data: [
                    {
                      type: 'profile',
                      attributes: {
                        email: `${email!}`,
                        subscriptions: {
                          email: {marketing: {consent: 'SUBSCRIBED', consented_at: `${date}`}}
                        },
                      }
                    }
                  ]
                },
                historical_import: true,
              },
              relationships: {list: {data: {type: 'list', id: 'YvUXMs'}}}
            }
          })
      };
      
    //   create profile on klaviyo
    fetch(profileUrl, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    //   add email consent
    fetch(url, subscribeOptions)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
};

//   create profile on klaviyo
    //   try {
    //     const response = await fetch(profileUrl, options);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (err) {
    //     console.error('error:', err);
    //   }
    // //   add email consent
    //   try {
    //     const response = await fetch(url, subscribeOptions);
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (err) {
    //     console.error('error:', err);
    //   }