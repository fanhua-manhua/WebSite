import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CategoryGroup from './CategoryGroup'
import Collapse from './Collapse'
import SearchDrawer from './SearchDrawer'
import TagGroups from './TagGroups'
import { useRouter } from 'next/router'
import MenuButtonGroup from './MenuButtonGroup'
let windowTop = 0


/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */
const TopNav = props => {
  const { tags, currentTag, categories, currentCategory } = props
  const { locale } = useGlobal()
  const searchDrawer = useRef()
  const { isDarkMode } = useGlobal()
  const router = useRouter()

  const scrollTrigger = throttle(() => {
    const scrollS = window.scrollY
    const nav = document.querySelector('#sticky-nav')
    const header = document.querySelector('#header')
    const showNav = scrollS <= windowTop || scrollS < 5 || (header && scrollS <= header.clientHeight)// 非首页无大图时影藏顶部 滚动条置顶时隐藏
    const navTransparent = (scrollS < document.documentElement.clientHeight - 12 && router.route === '/') || scrollS < 300 // 透明导航条的条件

    if (header && navTransparent) {
      nav && nav.classList.replace('bg-white', 'bg-none')
      nav && nav.classList.replace('text-black', 'text-white')
      nav && nav.classList.replace('border', 'border-transparent')
      nav && nav.classList.replace('shadow-md', 'shadow-none')
    } else {
      nav && nav.classList.replace('bg-none', 'bg-white')
      nav && nav.classList.replace('text-white', 'text-black')
      nav && nav.classList.replace('border-transparent', 'border')
      nav && nav.classList.replace('shadow-none', 'shadow-md')
    }

    if (!showNav) {
      nav && nav.classList.replace('top-0', '-top-20')
      windowTop = scrollS
    } else {
      nav && nav.classList.replace('-top-20', 'top-0')
      windowTop = scrollS
    }
    navDarkMode()
  }, 200)
    
  const navDarkMode = () => {
    const nav = document.getElementById('sticky-nav')
    const header = document.querySelector('#header')
    if (!isDarkMode && nav && header) {
      if (window.scrollY < header.clientHeight) {
        nav?.classList?.add('dark')
      } else {
        nav?.classList?.remove('dark')
      }
    }
  }

  // 监听滚动
  useEffect(() => {
    scrollTrigger()

    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [])

  const [isOpen, changeShow] = useState(false)

  const toggleMenuOpen = () => {
    changeShow(!isOpen)
  }

  const searchDrawerSlot = <>
    { categories && (
        <section className='mt-8'>
          <div className='text-sm flex flex-nowrap justify-between font-light px-2'>
            <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-th-list' />{locale.COMMON.CATEGORY}</div>
            <Link href={'/category'} passHref>
              <a className='mb-3 text-gray-400 hover:text-black dark:text-gray-400 dark:hover:text-white hover:underline cursor-pointer'>
                {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
              </a>
            </Link>
          </div>
          <CategoryGroup currentCategory={currentCategory} categories={categories} />
        </section>
    ) }

    { tags && (
        <section className='mt-4'>
          <div className='text-sm py-2 px-2 flex flex-nowrap justify-between font-light dark:text-gray-200'>
            <div className='text-gray-600 dark:text-gray-200'><i className='mr-2 fas fa-tag'/>{locale.COMMON.TAGS}</div>
            <Link href={'/tag'} passHref>
              <a className='text-gray-400 hover:text-black  dark:hover:text-white hover:underline cursor-pointer'>
                {locale.COMMON.MORE} <i className='fas fa-angle-double-right' />
              </a>
            </Link>
          </div>
          <div className='p-2'>
            <TagGroups tags={tags} currentTag={currentTag} />
          </div>
        </section>
    ) }
    </>

  return (<div id='top-nav' className='z-40'>
    <SearchDrawer cRef={searchDrawer} slot={searchDrawerSlot}/>

    {/* 导航栏 */}
    <div id='sticky-nav' className={'top-0 shadow-md fixed bg-none animate__animated animate__fadeIn dark:bg-hexo-black-gray dark:text-gray-200 text-black w-full z-20 transform duration-200 font-san border-transparent  dark:border-transparent'}>
      <div className='w-full flex justify-between items-center px-5 py-4'>
        <div className='flex flex-none flex-grow-0'>
          <div onClick={toggleMenuOpen} className='w-8 cursor-pointer'>
          { isOpen ? <i className='fas fa-times'/> : <i className='fas fa-bars'/> }
          </div>
        </div>
        Flower Forest
        {/* 右侧功能 */}
        <div className='mr-1 justify-end items-center font-serif'>
          <div onClick={() => { searchDrawer?.current?.show() }} className='mr-1 flex justify-end items-center text-sm space-x-4 font-serif dark:text-gray-200'>
            <i className="mr-2 fas fa-search" />{locale.NAV.SEARCH}
          </div>
        </div>
      </div>

      <Collapse type='vertical' isOpen={isOpen} className='shadow-xl'>
        <div className='bg-white py-1 px-5'>
          <MenuButtonGroup {...props} from='top'/>
        </div>
      </Collapse>
    </div>
  </div>)
}

export default TopNav
