'use server';

const KlaviyoAPIKey = process.env.KLAVIYO_PRIVATE_EMAIL_LIST_TOKEN;
const url = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/';

export default async function AddEmailSubscriber(email: string) {

  const subscribeOptions = {
    method: 'POST',
    headers: {
      'accept': 'application/vnd.api+json',
      'revision': '2026-04-15',
      'content-type': 'application/vnd.api+json',
      'Authorization': `Klaviyo-API-Key ${KlaviyoAPIKey!}`
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

    if (!res.ok) {
      console.error("Error:", res);
    }

  } catch (error) {
    console.error('Error adding to list:', error);
    throw error;
  }
};