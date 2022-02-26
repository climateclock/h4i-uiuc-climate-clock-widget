import { NewsfeedPropsInterface } from '../interfaces'

const Headlines = (props: NewsfeedPropsInterface) => {
  let concatenatedHeadlines = ''
  for (let i = 0; i < props.headlines.length; i++) {
    let headline = props.headlines[i]
    console.log(headline)
    let lastCharIdx = headline.length - 1
    if (i < props.headlines.length - 1 && headline.charAt(lastCharIdx) != ' ') {
      headline += ' '
    }
    // concatenatedHeadlines += props.headlines[i]
    concatenatedHeadlines += '<p>' + props.headlines[i] + '</p>'
  }
  return <p>{concatenatedHeadlines}</p>
}
export default Headlines
