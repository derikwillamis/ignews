import { NextApiRequest, NextApiResponse } from "next";
import {query as q } from 'faunadb'
import { getSession } from "next-auth/client";
import { fauna } from "../../servicer/fauna";
import { stripe } from "../../servicer/stripe";



type user = {
    ref:{
        id:string
    }
}

export default async (req:NextApiRequest,res:NextApiResponse) => {
    if(req.method === 'POST'){
       const session = await getSession({ req });
       console.log();
       const users = await fauna.query<user>(
           q.Get(
               q.Match(
                   q.Index('users_by_email'),
                   q.Casefold(session.user.email)
               )
           )
       )
      
       
       const stripeCustomer= await stripe.customers.create({
         email: session.user.email,
       })

       await fauna.query(
           q.Update(
               q.Ref(q.Collection('users'), users.ref.id),
               {
                   data:{
                       stripe_Customer_id:stripeCustomer.id,
                   }
               }
           )
       )

       const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer:stripeCustomer.id,
            payment_method_types:['card'],
            billing_address_collection: 'required',
            line_items:[
                {price:'price_1KsOo4KjJuNKeQPAZbeaGT5C',quantity:1}
            ],
            mode:'subscription',
            allow_promotion_codes:true,
            success_url:process.env.STRIPE_SUCCESS_URL,
            cancel_url:process.env.STRIPE_CANCEL_URL
       })

       return res.status(200).json({sessionId:stripeCheckoutSession.id})
    } else {
        res.setHeader('Allow','POST')
        res.status(405).end('method not allowed')
    }
}