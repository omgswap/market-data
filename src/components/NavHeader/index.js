import React, { useEffect, useState } from 'react'
import { useHistory, Link as RouterLink } from 'react-router-dom'

import styled from 'styled-components'
import Title from '../Title'
import Select from '../Select'
import CurrencySelect from '../CurrencySelect'
import Panel from '../Panel'
import { isMobile } from 'react-device-detect'
import { useMedia } from 'react-use'
import Link from '../Link'

const Header = styled(Panel)`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 16px;

  @media (max-width: 40em) {
    padding: 16px;
  }
`

const TokenSelect = styled(Select)`
  width: 180px;

  @media screen and (max-width: 40em) {
    width: 180px;
  }
`

const NavRight = styled.div`
  display: grid;
  justify-items: end;
  align-items: center;
  grid-template-columns: auto 180px;
  grid-column-gap: 16px;

  @media screen and (max-width: 40em) {
    grid-template-columns: auto 160px;
    margin: 0.75rem;
    display: block;
  }
`

const LinkText = styled(RouterLink)`
  font-weight: 600;
  color: white;
  margin-left: 1em;
  opacity: ${props => (props.selected ? 0 : 0.6)};
  text-decoration: none;

  @media screen and (max-width: 40em) {
    display: none;
  }
`

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MigrateBanner = styled.div`
  width: 100%;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(245, 245, 245, 11);
  font-weight: 400;
  text-align: center;
  a {
    color: rgba(255, 255, 255, 1);
    text-decoration: none;
  }
`

const MigrateBannerSmall = styled(MigrateBanner)`
  @media (min-width: 960px) {
    display: none;
  }
`

const MigrateBannerLarge = styled(MigrateBanner)`
  @media (max-width: 960px) {
    display: none;
  }
`

export default function NavHeader({ exchanges, setCurrencyUnit, currencyUnit }) {
  // for now exclude broken tokens
  const [filteredDirectory, setDirectory] = useState([])

  const [capEth, setCapEth] = useState(true)

  // filter out exchange with low liquidity
  useEffect(() => {
    setDirectory([])
    if (exchanges) {
      let fd = []
      Object.keys(exchanges).map(key => {
        let item = exchanges[key]
        if (parseFloat(item.ethBalance) > (capEth ? 0.5 : 0)) {
          if (isMobile && item.label.label.length > 5) {
            item.label.label = item.label.label.slice(0, 5) + '...'
          }
          item.label.logo = item.logo
          item.label.ethBalance = item.ethBalance
          fd.push(item.label)
        }
        return true
      })
      setDirectory(fd)
    }
  }, [exchanges, capEth])

  const belowLarge = useMedia('(max-width: 40em)')
  const history = useHistory()

  return (
    <>
      <MigrateBannerSmall>
        <Link href="https://odex.link" external={true}>
          <b>Ǒmega Protocol Money (OPM) Trading Started</b>
        </Link>
      </MigrateBannerSmall>
      <MigrateBannerLarge>
          <Link href="https://odex.link" external={true}>
          <b>Ǒmega Protocol Money (OPM) Trading Started</b>
        </Link>
      </MigrateBannerLarge>
      <Header bg={['transparent', 'transparent']}>
        <NavLeft>
          <Title />
          <LinkText to="/" selected={window.location.pathname === '/home'}>
            Back to Home
          </LinkText>
        </NavLeft>
        <NavRight>
          <CurrencySelect setCurrencyUnit={setCurrencyUnit} currencyUnit={currencyUnit} />
          <TokenSelect
            options={filteredDirectory}
            setCapEth={setCapEth}
            capEth={capEth}
            tokenSelect={true}
            placeholder={belowLarge ? 'Tokens' : 'Find token'}
            onChange={select => {
              history.push('/token/' + select.tokenAddress)
            }}
          />
        </NavRight>
      </Header>
    </>
  )
}
