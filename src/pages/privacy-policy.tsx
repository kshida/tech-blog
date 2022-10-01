import { Box, Heading, Text, Container } from '@chakra-ui/react'
import { Layout } from '@/components/Layout'
import { NavLink } from '@/components/NavLink'

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Container>
        <Box my={10} mx={3}>
          <Heading as='h2' size='xl'>
            プライバシーポリシー
          </Heading>
          <Heading as='h3' size='lg' mt='24px'>
            当サイトに掲載されている広告について
          </Heading>
          <Text fontSize='md' mt='24px'>
            当サイトでは、第三者配信の広告サービス（Googleアドセンス、A8.net）を利用しています。
            <br />
            このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報
            『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません)
            を使用することがあります。
            <br />
            またGoogleアドセンスに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、
            <NavLink
              link='https://policies.google.com/technologies/ads?gl=jp'
              isRichStyle={false}
              isTargetBlank={true}
            >
              こちら
            </NavLink>
            をご覧ください。
          </Text>
          <Heading as='h3' size='lg' mt='24px'>
            当サイトが使用しているアクセス解析ツールについて
          </Heading>
          <Text fontSize='md' mt='24px'>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
            <br />
            このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
            <br />
            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
            <br />
            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            <br />
            この規約に関して、詳しくは
            <NavLink
              link='https://www.google.com/analytics/terms/jp.html'
              isRichStyle={false}
              isTargetBlank={true}
            >
              こちら
            </NavLink>
            をご覧ください。
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}

export default PrivacyPolicy
