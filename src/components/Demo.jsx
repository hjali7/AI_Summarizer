import { useState , useEffect } from "react"
import {linkIcon , loader , copy , tick} from '../assets/index'
import { useLazyGetSummraizerQuery } from "../services/SummraizerApi"

const Demo = () => {
  const [article , setArticle] = useState({
    url : '',
    summary :'',
  })
  const [AllArticles , setAllArticles] = useState([])
  const [copied , setCopied] = useState('')
  const [getsummary , {error , isFetching}] =  useLazyGetSummraizerQuery()
  useEffect(()=>{
    const articlefromLocalStorage = JSON.parse(localStorage.getItem('articles'))
    if(articlefromLocalStorage) setAllArticles(articlefromLocalStorage)
  },[])
  const handleSubmit = async e => {
    e.preventDefault()
    const {data} = await getsummary(article)
    if(data?.summary) {
      const newArticel = {
        ...article ,
        summary : data?.summary
      }
      const updateAllArticels = [newArticel , ...AllArticles]
      setArticle(newArticel)
      setAllArticles(updateAllArticels)
      localStorage.setItem('articles', JSON.stringify(updateAllArticels))
    }
  }

  const handleCopied = e => {
    setCopied(e)
    navigator.clipboard.writeText(e)
    setTimeout(() => {
      setCopied(false)
    }, 4000);
  }
  
  return (
    <section className="w-full max-w-xl mt-16 flex flex-col justify-between items-center gap-2">
      <form onSubmit={handleSubmit} className="relative flex justify-center items-center w-full">
        <img src={linkIcon} alt="LINK_Icon" className="absolute left-0 ml-3 w-5 my-2"  />
        <input type="url" value={article.url} onChange={e => setArticle({...article , url : e.target.value})} required className="url_input peer" placeholder="Enter your URL" />
        <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">↵</button>
      </form>
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {AllArticles.map((item , index) => (
          <div key={index} onClick={() => setArticle(item)} className="link_card">
            <div className="copy_btn" onClick={() => handleCopied(item.url)}>
              <img src={copied === item.url ? tick : copy} alt='copyIcon' className="w-[40%] h-[40%] object-contain" />
            </div>
            <p className="flex-1 font-satoshi truncate font-medium text-blue-700  text-sm">{item.url}</p>
          </div>
        ))}
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (<img src={loader} alt="loader" className="w-20 h-20 object-contain" />) : error ? (<p className="font-inter font-bold text-black text-center">
          Well , that wasn't supposed to happen ...
          <br />
          <span>{error?.data?.error}</span>
        </p>) : (article.summary && <div className="flex flex-col gap-3">
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">Article <span className="blue_gradient">Summary</span></h2>
          <div className="summary_box">
            <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
          </div>
        </div>)}
      </div>
    </section>
  )
}

export default Demo

