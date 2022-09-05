import { useGlobal } from '@/lib/global'
import LayoutBase from './LayoutBase'
import TagItem from './components/TagItem'

export const LayoutTagIndex = (props) => {
  const { tags } = props
  const { locale } = useGlobal()
  return <LayoutBase {...props}>
    <div className='hadow hover:shadow dark:text-gray-300 border dark:border-black rounded-xl px-2 py-2 bg-white dark:bg-hexo-black-gray lg:duration-100 px-10 py-10 shadow h-full'>
      <div className='dark:text-gray-200 mb-5'><i className='fas fa-tags mr-4'/>{locale.COMMON.TAGS}:</div>
      <div id='tags-list' className='duration-200 flex flex-wrap'>
        { tags.map(tag => {
          return <div key={tag.name} className='p-2'><TagItem key={tag.name} tag={tag} /></div>
        }) }
      </div>
    </div>
  </LayoutBase>
}
