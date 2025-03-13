import {Box, Paper, Text} from '@mantine/core'
import {FC, PropsWithChildren} from 'react'

export const TitledBox: FC<PropsWithChildren<{title: string}>> = ({
  title,
  children,
}) => {
  return (
    <Paper p="0">
      <Box
        style={{
          borderBottom: '0.5px solid rgba(0,0,0,0.1)',
        }}
        p="md">
        <Text fw="bold" size="md">
          {title}
        </Text>
      </Box>
      <Box p="lg">{children}</Box>
    </Paper>
  )
}
