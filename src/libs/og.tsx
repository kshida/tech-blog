/* eslint-disable @next/next/no-img-element */
import fs from 'fs'
import path from 'path'
import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'

const getOgImage = async (title: string, slug: string) => {
  try {
    const fontPath = path.join(process.cwd(), 'src', 'assets', 'NotoSansJP-Bold.otf')
    const fontData = fs.readFileSync(fontPath)
    const svg = await satori(
      <div
        style={{
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
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            padding: '2rem',
            width: '95%',
            height: '90%',
            borderRadius: '1.5rem',
            backgroundColor: 'white',
            justifyContent: 'space-between',
            boxShadow: '6px 6px 10px -5px #00000066;',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              lineHeight: 1,
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '30px',
              paddingRight: '30px',
              maxWidth: '100%',
              alignItems: 'center',
              minWidth: '10%',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              paddingLeft: '30px',
              paddingRight: '30px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex' }}>
              <img
                src='https://avatars.githubusercontent.com/u/34312716?v=4'
                className='w-20 rounded-full'
                alt=''
                style={{ width: '5rem', borderRadius: '9999px' }}
              />
              <div
                style={{
                  display: 'flex',
                  fontSize: 30,
                  lineHeight: '2.25rem',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  marginLeft: '1.25rem',
                }}
              >
                K.Shida
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 30,
                lineHeight: '2.25rem',
                marginTop: 'auto',
                marginBottom: 'auto',
              }}
            >
              https://kshida-blog.com
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'NotoSansJP',
            data: fontData,
            weight: 400,
            style: 'normal',
          },
        ],
      },
    )
    const resvg = new Resvg(svg)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()
    const ogPath = `/public/og/${slug}.png`
    // OGP画像を public/og 配下に保存する
    fs.mkdirSync('./public/og', { recursive: true })
    fs.writeFileSync(`.${ogPath}`, pngBuffer)
    return ogPath
  } catch (e: any) {
    console.log(e.message)
    return ''
  }
}

export default getOgImage
