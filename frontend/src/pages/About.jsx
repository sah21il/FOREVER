import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Consequuntur tenetur cumque perferendis vel quia! Nemo odio alias maiores nobis rem ratione, quos, eligendi neque autem, excepturi omnis quidem. Reprehenderit obcaecati libero sint eligendi quia accusantium ad quas rem a ratione? Dicta aut perspiciatis dolore labore architecto explicabo praesentium velit similique voluptatibus eaque, nam delectus reprehenderit commodi possimus dolores eveniet! Ipsam.</p>
          <p>Recusandae, aperiam quibusdam dolorum similique voluptatem quisquam error! Tempore iure rerum suscipit laudantium impedit consequuntur corrupti, temporibus nobis ratione pariatur placeat ex quia doloribus deserunt in totam obcaecati maiores fuga doloremque accusamus omnis nihil odio magni voluptas? Corrupti ut ipsam corporis maiores?</p>
          <b className='text-gray-600'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat velit, vitae vero labore nam aperiam voluptate accusamus magnam alias rem neque, recusandae veniam numquam consequatur ullam praesentium enim exercitationem sapiente ducimus corporis nobis impedit eius! </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className='border px-10 md:px-16 py-8 sm:px-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perferendis officiis labore non, necessitatibus sint asperiores excepturi, sed eum aliquam modi ducimus dignissimos quos impedit vero voluptates reiciendis, soluta eius.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:px-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perferendis officiis labore non, necessitatibus sint asperiores excepturi, sed eum aliquam modi ducimus dignissimos quos impedit vero voluptates reiciendis, soluta eius.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:px-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti perferendis officiis labore non, necessitatibus sint asperiores excepturi, sed eum aliquam modi ducimus dignissimos quos impedit vero voluptates reiciendis, soluta eius.</p>
        </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
