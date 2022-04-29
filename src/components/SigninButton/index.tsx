import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signin,signOut,useSession } from 'next-auth/client'

import styles from './styles.module.scss';

export function SigninButton (){
  const[sesseion] = useSession ()
  
    return sesseion ? (
        <button 
        type="button"
        className={styles.signinbutton}
        onClick={()=>signOut()}
        >
            <FaGithub color="#04d361"/>
              {sesseion.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (
        <button 
        type="button"
        className={styles.signinbutton}
        onClick={()=> signin('github')}
        >
            <FaGithub color="#eba417"/>
            Sign in with GitHub
        </button>
    );
}