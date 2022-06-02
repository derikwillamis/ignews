import { GetStaticProps } from 'next';
import Head from 'next/head';
import {getPrismicClient} from '../../servicer/prismic'
import  styles from './styles.module.scss'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom';
import { Year } from 'faunadb';

type post = {
    slug:string;
    title:string;
    excerpt:string;
    updatedAt:string;
};

interface postsprops {
    posts:post []
}

export default function Posts( {posts}: postsprops ) {
    return (
      <>
      <Head>
          <title>Post │ ignews </title>
      </Head>

      <main className={styles.container}>
          <div className={styles.posts}>
              { posts.map(post => (
                  <a key={post.slug} href="#">
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
              </a>
              ) )}
          </div>
      </main>
      </>
    );
}

export const  getStaticProps:GetStaticProps = async () => {
    const prismic = getPrismicClient()

     const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
     ], {
         fetch: ['publication.title', 'publication.content'],
         pageSize:100,
     })
     console.log(response)
    
     const posts =response.results.map(post => {
         return{
             slug:post.uid,
             title:RichText.asText(post.data.title),
             excerpt:post.data.content.fimd(content => content.type === 'paragraph')?.text ?? '',
             updatedAt:new Date(post.last_publication_date).toLocaleDateString('pt-br',{
                 day: '2-digit',
                 month:'long',
                 year: 'numeric',
             })
         }
     });
     console.log(posts)

    return {
        props:{posts}
    }

}