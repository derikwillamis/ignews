import{GetStaticProps} from 'next';

import Head from 'next/head';
import { SubscribeButton } from '../components/subscribeButton';

import styles from './home.module.scss';
import { stripe } from '../servicer/stripe';

interface HomeProps{
  product:{
    priceid:string;
    amount:number;
  }
}

export default function Home({product}:HomeProps) {
  return (
    <>
     <Head>
      <title>Home │ ig.news</title>
     </Head>

   <main className={styles.contentContainer}>
     <section className={styles.hero}>
       <span>👏Hey, wulcome </span>
       <h1>News about the <span>React</span>world.</h1>
       <p>
         Get access to all the publications <br/>
         <span>for {product.amount} month</span>
       </p>
       <SubscribeButton priceid={product.priceid}/>
     </section>

     <img src="./images/avatar.svg" alt="girl coding"/>
   </main>
  </>
  ) 
}
export const getStaticProps:GetStaticProps = async () =>{
const price = await stripe.prices.retrieve ('price_1KsOo4KjJuNKeQPAZbeaGT5C')

const product = {
  priceid:price.id,
  amount:new Intl.NumberFormat('en-us',{
    style:'currency',
    currency:'USD',
  }).format(price.unit_amount /100),
};

return{
  props: {
    product,
  },
  revalidate:60*60*24,
}
}