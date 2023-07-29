import {logo} from '../assets/index'

const Hero = () => {
  return (
    <header className='w-full flex justify-between items-center flex-col'>
      <nav className='flex justify-between w-full items-center mb-10 pt-3'>
        <img src={logo} alt='SUMZ_LOGO' className='object-content w-28 '/>
        <button onClick={() => window.open('https://github.com')} type='button' className='bg-black text-white hover:bg-slate-300 hover:text-black rounded-full p-2'>Git Hub</button>
      </nav>
        <h1 className='head_text'>Summarize Articles With <br className='max-md:hidden' />
        <span className='orange_gradient'>OpentAI GPT-4</span>
        </h1>
        <h2 className='desc'>Simplify your reading with Summize , an open-source article summarizer that transforms lengthy articles into clear and consise summaries</h2>
    </header>
  )
}

export default Hero