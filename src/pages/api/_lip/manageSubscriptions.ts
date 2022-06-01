import { query as q } from "faunadb";

import { fauna } from "../../../servicer/fauna";
import { stripe } from "../../../servicer/stripe";

export async function  saveSubscription(
    subscriptionid:string,
    customerid:string,
    createaction = false,
) {
    const userRaf = await fauna.query(
     q.Select(
         "ref",
         q.Get(
            q.Match(
                q.Index('user_by_stripe_customer_id'),
                customerid
            )
        )
    )
 )

 const subscription = await stripe.subscriptions.retrieve(subscriptionid)

const subscriptionData = {
    id:subscription.id,
    userid:userRaf,
    status:subscription.status,
    price_id: subscription.items.data[0].price.id,
}

 if (createaction) {
    await fauna.query(
        q.Create(
            q.Collection('subscriptions'),
            { data: subscriptionData }
        )
    )
 } else {
   await fauna.query(
       q.Replace(
           q.Select(
               "ref",
               q.Get(
                   q.Match(
                       q.Index('subcription_by_id'),
                       subscriptionid,
                   )
               )
           ),
        {data:subscriptionData}
       )
   )
 }
}