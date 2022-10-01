import { Box, Heading, Text, Container } from '@chakra-ui/react'
import { Layout } from '@/components/Layout'

export const DisclaimerPage: React.FC = () => {
  return (
    <Layout>
      <Container>
        <Box my={10} mx={3}>
          <Heading as='h2' size='xl'>
            特定商取引法に基づく表記
          </Heading>
          <Heading as='h3' size='lg' mt='24px'>
            責任の有無
          </Heading>
          <Text fontSize='md' mt='24px'>
            当サイトは、アフィリエイトプログラムにより商品をご紹介致しております。
            <br />
            アフィリエイトプログラムとは、商品及びサービスの提供元と業務提携を結び商品やサービスを紹介するインターネット上のシステムです。
            <br />
            従いまして、当サイトの商品は当サイトが販売している訳ではありません。
            <br />
            <br />
            お客様ご要望の商品、お支払い等はリンク先の販売店と直接のお取引となりますので、特定商取引法に基づく表記につきましてはリンク先をご確認頂けますようお願い致します。
            <br />
            商品の価格、商品の詳細、消費税、送料、在庫数等の詳細は時として変わる場合も御座います。
            <br />
            また、返品・返金保証に関しましてもリンク先の販売元が保証するものです。当サイトだけではなくリンク先のサイトも良くご確認頂けますようお願い致します。
            <br />
            また、当サイトの掲載情報をご利用頂く場合には、お客様のご判断と責任におきましてご利用頂けますようお願い致します。当サイトでは、一切の責任を負いかねます事ご了承願います。
            <br />
            <br />
            尚、掲載商品に関するお問合せはリンク先に御座います企業宛までお願い致します。当サイト管理者側ではお答え致しかねます事、ご了承ください。
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}
