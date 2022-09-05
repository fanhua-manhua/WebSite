import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import { useImperativeHandle, useRef, useState } from 'react'

let lock = false

const SearchInput = ({ currentTag, currentSearch, cRef }) => {
  const { locale } = useGlobal()
  // const [searchKey, setSearchKey] = useState(currentSearch || '')
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  useImperativeHandle(cRef, () => {
    return {
      focus: () => {
        searchInputRef?.current?.focus()
      }
    }
  })
  const handleSearch = () => {
    const key = searchInputRef.current.value
    if (key && key !== '') {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(r => {
        setLoadingState(false)
      })
      // location.href = '/search/' + key
    } else {
      router.push({ pathname: '/' }).then(r => {
      })
    }
  }
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) { // 回车
      handleSearch(searchInputRef.current.value)
    } else if (e.keyCode === 27) { // ESC
      cleanSearch()
    }
  }
  const cleanSearch = () => {
    searchInputRef.current.value = ''
    setShowClean(false)
  }
  function lockSearchInput () {
    lock = true
  }

  function unLockSearchInput () {
    lock = false
  }
  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = (val) => {
    if (lock) {
      return
    }
    searchInputRef.current.value = val
    if (val) {
      setShowClean(true)
    } else {
      setShowClean(false)
    }
  }

  return <div className='flex w-full pb-2'>
  <input
    ref={searchInputRef}
    type='text'
    placeholder={currentTag ? `${locale.SEARCH.TAGS} #${currentTag}` : `${locale.SEARCH.ARTICLES}`}
    className={'rounded-md py-1.5 px-6 duration-300 text-sm justify-between hover:bg-gray-700 hover:text-white hover:shadow-lg cursor-pointer font-light flex flex-nowrap items-center bg-gray-200 text-black'}
    onKeyUp={handleKeyUp}
    onCompositionStart={lockSearchInput}
    onCompositionUpdate={lockSearchInput}
    onCompositionEnd={unLockSearchInput}
    onChange={e => updateSearchKey(e.target.value)}
    defaultValue={currentSearch || ''}
  />

  <div className='-ml-8 cursor-pointer float-right items-center justify-center py-2'
    onClick={handleSearch}>
      <i className={`hover:text-black transform duration-200  text-gray-500 cursor-pointer fas ${onLoading ? 'fa-spinner animate-spin' : 'fa-search'}`} />
  </div>

  {(showClean &&
    <div className='-ml-12 cursor-pointer dark:bg-transparent dark:hover:bg-neutral-400 float-right items-center justify-center py-2'>
      <i className='hover:text-black transform duration-200 text-gray-400 cursor-pointer fas fa-times' onClick={cleanSearch} />
    </div>
    )}
</div>
}

export default SearchInput
