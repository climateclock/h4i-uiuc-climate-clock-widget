import { ArticleInterface, NewsfeedPropsInterface } from '../interfaces'

const Newsfeed = ({ articles }: NewsfeedPropsInterface) => {
  return (
    <>
      {articles.map((article: ArticleInterface, i: number) => (
        <p key={article.headline}>{article.headline}</p>
      ))}
    </>
  )
}

export default Newsfeed
