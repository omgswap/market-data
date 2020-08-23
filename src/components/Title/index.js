import React from 'react'
import { Text, Flex } from 'rebass'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`

export default function Title() {
  const history = useHistory()

  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <Text fontSize="1.5rem" lineHeight="1">
          <img src={require('./logo.svg')} alt="Logo" />
        </Text>
      </Flex>
    </TitleWrapper>
  )
}
