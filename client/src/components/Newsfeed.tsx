import { ArticleInterface, NewsfeedPropsInterface } from '../interfaces'

const Newsfeed = ({ articles }: NewsfeedPropsInterface) => {
  return (
    <>
      {articles.map((article: ArticleInterface) => (
        <p>{article.headline}</p>
      ))}
    </>
  )
}

export default Newsfeed
