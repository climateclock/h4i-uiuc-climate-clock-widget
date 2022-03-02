const LanguageCustomization = () => {
  /* TODO: fix type of 'e' */
  const formSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={formSubmit}>
        <label>Language:</label>
        <br />
        <select>
          <option>English</option>
          <option>Spanish</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default LanguageCustomization
