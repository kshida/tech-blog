/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { NextApiHandler } from 'next'

export const config = {
  runtime: 'experimental-edge',
}

const handler: NextApiHandler = async (req) => {
  try {
    if (!req.url) throw Error('リクエストが不正です。')
    const { searchParams } = new URL(req.url)
    const hasTitle = searchParams.has('title')
    if (!hasTitle) throw Error('パラメータが存在しません。')
    const title = searchParams.get('title')?.slice(0, 75)
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 128,
            background:
              'linear-gradient(120deg, rgba(157,211,168,1) 0%, rgba(102,213,173,1) 50%, rgba(25,200,212,1) 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            tw='flex flex-col m-auto p-8 w-[95%] h-[90%] rounded-3xl bg-white justify-between'
            style={{ boxShadow: '6px 6px 10px -5px #00000066;' }}
          >
            <div tw='flex text-6xl mx-auto px-[30px] max-w-full items-center min-w-[10%]'>
              {title}
            </div>
            <div tw='flex w-full px-[30px] justify-between'>
              <div tw='flex'>
                <img
                  src='https://avatars.githubusercontent.com/u/34312716?v=4'
                  tw='w-20 rounded-full'
                  alt=''
                />
                <div tw='flex text-3xl my-auto ml-5'>K.Shida</div>
              </div>
              <div tw='flex text-3xl my-auto'>https://kshida-blog.com</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`OGP画像の生成に失敗しました。`, {
      status: 500,
    })
  }
}

export default handler
