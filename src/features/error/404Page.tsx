import { Box } from '@chakra-ui/react'
import { Layout } from '@/components/Layout'
export const _404Page: React.FC = () => {
  return (
    <Layout>
      <Box textAlign={'center'} pt={40}>
        お探しのページは存在しません。
      </Box>
    </Layout>
  )
}
