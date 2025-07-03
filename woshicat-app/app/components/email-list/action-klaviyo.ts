'use server';

const KlaviyoAPIKey = process.env.KLAVIYO_PRIVATE_EMAIL_LIST_TOKEN;
const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/';

export default async function AddEmailSubscriber(email: string) {
  const now = new Date();
  const year = now.getFullYear();      // Gets the year (e.g., 2024)
  const month = now.getMonth() + 1;    // Gets the month (0-11, so add 1 to make it 1-12)
  const day = now.getDate();           // Gets the day of the month (1-31)
  const date = `${year}-${month}-${day}`;  

  const subscribeOptions = {
    method: 'POST',
    headers: {
      accept: 'application/vnd.api+json',
      revision: '2025-01-15',
      'content-type': 'application/vnd.api+json',
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
                      email: {marketing: {consent: 'SUBSCRIBED'}}
                    },
                  }
                }
              ]
            },
            historical_import: false,
          },
          relationships: {list: {data: {type: 'list', id: 'YvUXMs'}}}
        }})
  };
  
  try {
    const res = await fetch(url, subscribeOptions);
    console.log("Response: ", res);

    if (!res.ok) {
      console.error("Error:", res);
    }

  } catch (error) {
    console.error('Error adding to list:', error);
    throw error;
  }
};

