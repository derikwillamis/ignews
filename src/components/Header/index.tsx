import { SigninButton } from '../SigninButton';
import styles from './styles.module.scss'
import { Activelink } from '../ActiveLink';


export function Header() {

    return (
        <header className={styles.headercontainer}>
            <div className={styles.headercontent}>
                <img src="/images/logo.svg" alt="ig.news"/>
                <nav>
                    <Activelink activeClassName={styles.active} href="/">
                    <a>Home</a>
                    </Activelink>
                    <Activelink activeClassName={styles.active} href="/posts">
                    <a>Posts</a>
                    </Activelink>
                    
                </nav>
                <SigninButton/>
            </div>
        </header>
    );
}