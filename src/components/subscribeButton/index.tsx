import styles from './styles.module.scss'

interface SubcribeButtonProps{
    priceid:string;
}

export function SubscribeButton({priceid}:SubcribeButtonProps) {
    return(
     <button 
     type="button"
     className={styles.SubscribeButton}
     >
      Subscribe now
     </button>
    );
}