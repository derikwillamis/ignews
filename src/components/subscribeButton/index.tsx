import { useSession, signIn } from 'next-auth/client';
import { api } from '../../servicer/api';
import { getStripejs } from '../../servicer/stripejs';
import styles from './styles.module.scss'

interface SubcribeButtonProps{
    priceid:string;
}

export function SubscribeButton({priceid}:SubcribeButtonProps) {
    const [session] = useSession();

     async function handlaSubscribe(){
      if (!session){
          signIn('github')
          return;
      }
      try{
          const response = await api.post ('subcribe')

          const {sessionId} = response.data;

          const stripe = await getStripejs()

          await stripe.redirectToCheckout({sessionId})
      } catch(err) {
          alert (err.message);
      }
    }

    return(
     <button 
     type="button"
     className={styles.SubscribeButton}
     onClick={handlaSubscribe}
     >
      Subscribe now
     </button>
    );
}